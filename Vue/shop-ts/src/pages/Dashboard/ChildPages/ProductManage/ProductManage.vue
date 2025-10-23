<template lang="pug">
.add-item-outer
  .add-item-show
    .items-table-outer
      .header
        .list-item-row
          .list-item-col(
            v-for="(item,index) in ['商品名稱','商品分類','商品原價','商品售價','商品庫存量','上架狀態','是否為新品','調整']"
            :key="index"
          ) {{ item }}
      .body
        .list(v-if="ptLocation.length > 0")
          .list-item-row(v-for="(item, index) in ptLocation",:key="index")
            .list-item-col {{ item.PDName }}
            .list-item-col {{ renderProductName(item.PDTypeName) }}
            .list-item-col $ {{ item.PDOriginPrice }} NT
            .list-item-col $ {{ item.PDOnSalePrice }} NT
            .list-item-col {{ item.PDPice }}
            .list-item-col 
              span(v-if="item.PDState === 3") 未上架
              span(v-else-if="Boolean(item.PDState)") 上架中
              span(v-else) 已下架
            .list-item-col
              span(v-if="Boolean(item.PDIsNew)") 是
              span(v-else) 否
            .list-item-col
              .choose-group
                span.modify(@click="showModal(item.PDID, true)")
                  i.fas.fa-pencil-alt
                span.deleted(@click="showDeleteModal(item.PDID)")
                  i.fas.fa-trash-alt
        .no-data(v-else) {{ stateText }}
    Pagination(
      v-if="ptLocation.length != 0"
      :pageItem="pagination"
      @prev="getProduct"
      @current="getProduct"
      @next="getProduct"
    )
.add-btn(@click="showModal('', false)")
  i.fas.fa-plus
.modal-add(:class="{ 'modal-add-toggle': toggleModalStatus }")
  .modal-add-body
    .modal-add-header
      span.modal-add-title {{ modalTitle }}
    .modal-add-content
      .upload-items
        .row
          .col-md-12
            .img-upload-frame
              span(v-if="!uploadStartChange") 僅出現第一個連結圖片檢視
              .uploading-outer(v-else)
                .now-uploading.notice(v-if="uploadStatus && uploadStartChange")
                  .uploading
                  span 讀取中
                img.show-img(
                  :src="imgLinkMainTemp"
                  :class="{ 'show-img-active': !uploadStatus }"
                  @load="() => uploadStatus = false"
                )
            .url-group
              .row.no-gutters.mb-3
                .col-11
                  CustomInput(
                    size="sm"
                    label="主商品圖片網址"
                    usingType="input"
                    type="text"
                    useStyle="white"
                    :inputValTemp="imgLinkMainTemp"
                    @changeEvent="val => imgLinkMainTemp = val"
                    @blurEvent="uploadLinkProductImg"
                  )
                .col-1(@click="addUrlColumn(true, 0)")
                  .add-url-btn
                    i.fal.fa-plus.icon
              .row.no-gutters.mb-3(:class="{ hidden: !(imgUrlRenderCount >= 1) }")
                .col-11
                  CustomInput(
                    size="sm"
                    label="次商品圖片 1 網址"
                    usingType="input"
                    type="text"
                    useStyle="white"
                    :inputValTemp="imgLinkOtherTempI"
                    @changeEvent="val => imgLinkOtherTempI = val"
                  )
                .col-1(@click="addUrlColumn(false, 1)")
                  .add-url-btn
                    i.fal.fa-minus.icon
              .row.no-gutters.mb-3(:class="{ hidden: !(imgUrlRenderCount > 1 && imgUrlRenderCount <= 2) }")
                .col-11
                  CustomInput(
                    size="sm"
                    label="次商品圖片 2 網址"
                    usingType="input"
                    type="text"
                    useStyle="white"
                    :inputValTemp="imgLinkOtherTempII"
                    @changeEvent="val => imgLinkOtherTempII = val"
                  )
                .col-1(@click="addUrlColumn(false, 2)")
                  .add-url-btn
                    i.fal.fa-minus.icon
            .product-info
              .row
                .col-md-4
                  .product-name-group
                    CustomInput(
                      size="sm"
                      label="商品名稱"
                      usingType="input"
                      type="text"
                      useStyle="white"
                      :inputValTemp="productName"
                      @changeEvent="val => productName = val"
                    )
                .col-md-4
                  .product-type-group
                    CustomInput(
                      size="sm"
                      label="商品種類"
                      usingType="list"
                      type="text"
                      useStyle="white"
                      :selectedRowTemp="productType"
                      :options="productTypeData"
                      @getOptionVal="val => productType = val"
                    )
                .col-md-4
                  .product-new-group
                    CustomInput(
                      size="sm"
                      label="本期新品"
                      usingType="list"
                      type="text"
                      useStyle="white"
                      :selectedRowTemp="productNew"
                      :options=`[
                        { key: '否', value: false }, 
                        { key: '是', value: true }
                      ]
                      `
                      @getOptionVal="val => productNew = val"
                    )
              .row
                .col-md-3
                  .product-origin-price-group
                    CustomInput(
                      size="sm"
                      label="輸入原價"
                      usingType="input"
                      :type="rwdMod ? 'tel' : 'number'"
                      useStyle="white"
                      :inputValTemp="productOriginPrice"
                      @changeEvent="val => productOriginPrice = val"
                    )
                .col-md-3
                  .product-onsale-price-group
                    CustomInput(
                      size="sm"
                      label="輸入售價"
                      usingType="input"
                      :type="rwdMod ? 'tel' : 'number'"
                      useStyle="white"
                      :inputValTemp="productOnSalePrice"
                      @changeEvent="val => productOnSalePrice = val"
                    )
                .col-md-3
                  .product-pice-group
                    CustomInput(
                      size="sm"
                      label="輸入庫存量"
                      usingType="input"
                      :type="rwdMod ? 'tel' : 'number'"
                      useStyle="white"
                      :inputValTemp="productPice"
                      @changeEvent="val => productPice = val"
                    )
                .col-md-3
                  .product-status-group
                    CustomInput(
                      size="sm"
                      label="商品狀態"
                      usingType="list"
                      type="text"
                      useStyle="white"
                      :selectedRowTemp="productStatus"
                      :options=`[
                        { key: '未上架', value: null }, 
                        { key: '下架', value: false }, 
                        { key: '上架', value: true }
                      ]
                      `
                      @getOptionVal="val => productStatus = val"
                    )
              .product-descrip-group
                CustomInput(
                  size="sm"
                  label="請輸入商品說明"
                  usingType="input"
                  type="text"
                  useStyle="white"
                  :inputValTemp="productDescrip"
                  @changeEvent="val => productDescrip = val"
                )
              .product-img-descrip-group
                .row.no-gutters.mb-3
                  .col-11
                    CustomInput(
                      size="sm"
                      label="輸入商品主要圖片說明"
                      usingType="input"
                      type="text"
                      useStyle="white"
                      :inputValTemp="imgDescMainTemp"
                      @changeEvent="val => imgDescMainTemp = val"
                    )
                  .col-1(@click="addImgDescColumn(true, 0)")
                    .add-desc-btn
                      i.fal.fa-plus.icon
                .row.no-gutters.mb-3(:class="{ hidden: !(imgDescRenderCount >= 1) }")
                  .col-11
                    CustomInput(
                      size="sm"
                      label="輸入商品次要圖片 1 說明"
                      usingType="input"
                      type="text"
                      useStyle="white"
                      :inputValTemp="imgDescOtherTempI"
                      @changeEvent="val => imgDescOtherTempI = val"
                    )
                  .col-1(@click="addImgDescColumn(false, 1)")
                    .add-desc-btn
                      i.fal.fa-minus.icon
                .row.no-gutters.mb-3(:class="{ hidden: !(imgDescRenderCount > 1 && imgDescRenderCount <= 2) }")
                  .col-11
                    CustomInput(
                      size="sm"
                      label="輸入商品次要圖片 2 說明"
                      usingType="input"
                      type="text"
                      useStyle="white"
                      :inputValTemp="imgDescOtherTempII"
                      @changeEvent="val => imgDescOtherTempII = val"
                    )
                  .col-1(@click="addImgDescColumn(false, 2)")
                    .add-desc-btn
                      i.fal.fa-minus.icon
    .modal-add-footer
      .cancel(@click="closeModal") 取消
      .confirm(@click="addProduct") {{ modalConfirmText }}
DeleteModal(
  :obj="modalDeletedObj"
  @cancle="closeDeleteModal"
  @confirm="deleteProduct"
)
</template>
<style lang="scss" scoped>
.add-item-outer {

  .add-item-show {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 7px;

    .items-table-outer {
      overflow-x: auto;
      overflow-y: hidden;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 63px;

      &::-webkit-scrollbar {
        width: 15px;
        height: 7px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: white;
        border: unset;
      }

      .header {

        @media screen and (max-width: 1280px) {
          width: 1068px;
        }

        .list-item-row {
          display: grid;
          grid-template-columns: repeat(8, minmax(105px, 1fr));
          position: relative;
          align-items: center;
          padding: 12px;

          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.5);
            margin: 0 auto;
            height: 1px;
            width: 96%;
          }

          .list-item-col {
            color: white;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }

      .body {
        position: absolute;
        top: 48px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;

        @media screen and (max-width: 1280px) {
          width: 1068px;
        }

        &::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          background-color: white;
          border: unset;
        }

        .list {

          .list-item-row {
            display: grid;
            grid-template-columns: repeat(8, minmax(105px, 1fr));
            align-items: center;
            padding: 12px;

            .list-item-col {
              color: white;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;

              &:last-of-type {
                display: flex;
                justify-content: center;
              }

              .choose-group {
                display: grid;
                grid-template-columns: 30px 30px;
                gap: 12px;

                .modify {
                  display: block;
                  background-color: rgba(140, 0, 255, 0.7);
                  box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                    0 0 4px 1px rgba(0, 0, 0, 0.3);
                  padding: 3px 7px;
                  border-radius: 5px;
                  color: white;
                  cursor: pointer;
                  user-select: none;
                }

                .deleted {
                  display: block;
                  background-color: rgba(255, 0, 0, 0.7);
                  box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                    0 0 4px 1px rgba(0, 0, 0, 0.3);
                  padding: 3px 7px;
                  border-radius: 5px;
                  color: white;
                  cursor: pointer;
                  user-select: none;
                }
              }
            }
          }
        }

        .no-data {
          font-size: 20px;
          text-align: center;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          top: 48px;
          left: 0;
          right: 0;
          bottom: 0;
        } 
      }
    }

    .pagination-outer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}

.add-btn {
  position: fixed;
  bottom: 115px;
  right: 0;
  z-index: 2;
  margin: 0 10px 12px 0;
  color: white;
  background-color: rgb(4, 142, 255);
  box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
  padding: 5px 10px 4px 10px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.modal-add {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: 0.5s ease;

  .modal-add-body {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid black;
    box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
      0 0 3px 1px rgba(0, 0, 0, 0.7);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    max-width: 600px;
    width: 95%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1);
    transition: 0.5s ease;

    .modal-add-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 10px 15px;
      border-bottom: 0.1px solid rgba(255, 255, 255, 0.7);

      .modal-add-title {
        display: block;
        margin-top: 0px;
        margin-bottom: 0px;
        font-size: 25px;
        font-weight: bold;
      }
    }

    .modal-add-content {
      padding: 15px 0 0 15px;
      overflow-y: auto;
      overflow-x: hidden;
      margin-right: 3px;
      height: 500px;

      @media screen and (max-width: 414px) {
        padding: 15px 6px 0 8px;
      }

      .delete-text {
        display: block;
        padding: 60px 50px 60px 50px;
        font-size: 20px;
      }
      
      .upload-items {

        .input-outer {
          margin-bottom: 16px;
        }

        .row {
          margin: 0 -8px;

          .col-md-3,
          .col-md-4 {
            padding: 0 8px;
          }
        }

        .img-upload-frame {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 250px;
          margin-bottom: 0;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
          border-radius: 5px;
          overflow: hidden;

          span {
            display: block;
            font-style: italic;
          }

          .uploading-outer {

            .now-uploading {
              padding-top: 35px;
              animation: nowUpload 1s ease forwards;
              transition: 1s ease;

              @keyframes nowUpload {
                0% {
                  opacity: 0;
                  transform: scale(0.7);
                }

                100% {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              .uploading {
                border-radius: 50%;
                width: 47px;
                height: 47px;
                border-top: 4px solid transparent;
                border-right: 4px solid rgb(255, 0, 0);
                border-bottom: 4px solid rgb(255, 0, 0);
                border-left: 4px solid rgb(255, 0, 0);
                box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.5),
                  0 0 3px 1px rgba(0, 0, 0, 0.5);
                animation: uploadActive 1s linear infinite;

                @keyframes uploadActive {
                  100% {
                    transform: rotate(360deg);
                  }
                }
              }

              span {
                margin-top: 10px;
              }
            }
          }

          .show-img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: 1s ease;

            &.show-img-active {
              opacity: 1;
              z-index: 1;
            }
          }
        }

        .url-group {
          margin-top: 15px;
          padding: 0 8px;

          .input-outer {
            margin-bottom: 0;
          }

          .hidden {
            display: none;
          }

          .add-url-btn {
            cursor: pointer;
            user-select: none;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-left: 6px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
            border-radius: 5px;
          }
        }

        .product-info {

          .product-img-descrip-group {
            padding: 0 8px;

            .hidden {
              display: none;
            }

            .add-desc-btn {
              cursor: pointer;
              user-select: none;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-left: 6px;
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
              border-radius: 5px;
            }

            .input-outer {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .modal-add-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 0.1px solid rgba(255, 255, 255, 0.7);
    padding: 10px 0px 10px 5px;

    .cancel,
    .confirm {
      margin-right: 10px;
      padding: 3px 15px 3px 15px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.5s ease;
      user-select: none;
      box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }

    .cancel:hover {
      background-color: rgba(255, 0, 0, 7);
      transform: scale(1.05);
      box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }

    .confirm:hover {
      background-color: rgba(0, 162, 255, 0.7);
      transform: scale(1.05);
      box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }
  }

  &.modal-add-toggle {
    z-index: 5;
    opacity: 1;

    .modal-add-body {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media screen and (min-width: 769px) {
    &::-webkit-scrollbar {
      overflow-y: hidden;
    }
  }
}

.success {
  color: rgb(0, 200, 0);
}
.notice {
  color: rgb(255, 0, 0);
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject } from 'vue'
import $ from '@/lib/Library.ts'
import { ProviderObjType } from '@/App'
import { Pagination, DeleteModal, CustomInput } from "@/component";

interface PageStateType {
  ptLocation: Ref<{
    PDID: string
    PDIsNew: number
    PDName: string
    PDOnSalePrice: number
    PDOriginPrice: number
    PDPice: number
    PDState: number | null
    PDTypeName: string
  }[]>,
  stateText: Ref<string>,
  imgUrlTemp: Ref<string>,
  imgLinkMainTemp: Ref<string>,
  imgLinkOtherTempI: Ref<string | null>,
  imgLinkOtherTempII: Ref<string | null>,
  imgUrlRenderCount: Ref<number>,
  imgDescRenderCount: Ref<number>,
  imgDescMainTemp: Ref<string>,
  imgDescOtherTempI: Ref<string | null>,
  imgDescOtherTempII: Ref<string | null>,
  uploadStatus: Ref<boolean>,
  uploadStartChange: Ref<boolean>,
  productName: Ref<string>,
  productType: Ref<string>,
  productNew: Ref<boolean>,
  productOriginPrice: Ref<string>,
  productOnSalePrice: Ref<string>,
  productPice: Ref<string>,
  productStatus: Ref<boolean | null>,
  productDescrip: Ref<string>,
  currentSelectIndex: Ref<string>,
  modalTitle: Ref<string>,
  modalConfirmText: Ref<string>,
  modalDeletedObj: Ref<{
    toggleModalStatus: boolean,
    modalTitle: string,
    modalContent: string
  }>,
  pagination: Ref<{
    totalLength: number,
    partPage: number,
    pageTotal: number
    currentPage: number,
    hasPage: boolean,
    hasNext: boolean
  }>,
  productTypeData: Ref<{
    key: string,
    value: string,
  }[]>,
  linkStatus: Ref<boolean>
  toggleModalStatus: Ref<boolean>
  rwdMod: Ref<boolean>
}

interface MethodType {
  paginationPart(pages?: number): void;
  getProduct(pages?: number): Promise<void>;
  getProductTypeList(): Promise<void>
  showDeleteModal(id: string): void;
  closeDeleteModal(): void;
  showModal(index: string, modify: boolean): void;
  closeModal(): void;
  addUrlColumn(plusState: boolean, order: number): void
  addImgDescColumn(plusState: boolean, order: number): void
  uploadLinkProductImg(): void
  submitCheck(): boolean
  addProduct(): void
  modifyOn(index: string): Promise<void>
  modifyOff(): void
  postProduct(dateDescrip: string): Promise<void>
  patchProduct(dateDescrip: string): Promise<void>
  deleteProduct(index: string): Promise<void>
  renderProductName(productType: string): string
}

export default defineComponent({
  name: "ProductManage",
  components: {
    Pagination,
    DeleteModal,
    CustomInput
  },
  setup(){
    const { useSleep, getReducer, Fetch, toast, rwdMod } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)

    const pageState: PageStateType = {
      ptLocation: ref([]),
      stateText: ref(""),
      imgUrlTemp: ref(""),
      imgLinkMainTemp: ref(""),
      imgLinkOtherTempI: ref(""),
      imgLinkOtherTempII: ref(""),
      imgUrlRenderCount: ref(0),
      imgDescRenderCount: ref(0),
      imgDescMainTemp: ref(""),
      imgDescOtherTempI: ref(""),
      imgDescOtherTempII: ref(""),
      uploadStatus: ref(false),
      uploadStartChange: ref(false),
      productName: ref(""),
      productType: ref(""),
      productNew: ref(false),
      productOriginPrice: ref(""),
      productOnSalePrice: ref(""),
      productPice: ref(""),
      productStatus: ref(false),
      productDescrip: ref(""),
      currentSelectIndex: ref(""),
      modalTitle: ref(""),
      modalConfirmText: ref(""),
      modalDeletedObj: ref({
        toggleModalStatus: false,
        modalTitle: "",
        modalContent: "",
      }),
      pagination: ref({
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 0,
        hasPage: false,
        hasNext: false
      }),
      productTypeData: ref([]),
      linkStatus: ref(false),
      toggleModalStatus: ref(false),
      rwdMod
    }

    const method:MethodType = {
      paginationPart(pages) {
        pageState.pagination.value.totalLength = pageState.ptLocation.value.length;

        pageState.pagination.value.partPage = rwdMod ? 11 : 10;;
        pageState.pagination.value.pageTotal = Math.ceil(
          pageState.pagination.value.totalLength / pageState.pagination.value.partPage
        );
        pages == undefined ? (pages = 1) : pages;
        pageState.pagination.value.currentPage = pages;
        pageState.pagination.value.hasPage = pageState.pagination.value.currentPage > 1;
        pageState.pagination.value.hasNext =
          pageState.pagination.value.currentPage < pageState.pagination.value.totalLength;
        
        if (pageState.pagination.value.currentPage == pageState.pagination.value.pageTotal)
          pageState.pagination.value.hasNext = false;
      
        if (pageState.pagination.value.currentPage > pageState.pagination.value.pageTotal)
          pageState.pagination.value.currentPage = pageState.pagination.value.pageTotal;

        const minPage =
          pageState.pagination.value.currentPage * (pageState.pagination.value.partPage - pageState.pagination.value.partPage + 1);
        
        const maxPage = pageState.pagination.value.currentPage * pageState.pagination.value.partPage;

        const ptLocationTemp = pageState.ptLocation.value;
        pageState.ptLocation.value = [];

        pageState.ptLocation.value = $.maps(ptLocationTemp, (row, index) => {
          const num = index + 1;
          return num >= minPage && num <= maxPage ? row : undefined
        }).filter(row => row !== undefined)
      },
      getProduct: async pages => {
        pageState.ptLocation.value = [];
        pageState.stateText.value = "讀取中...";

        const res = await Fetch.get<{ data: PageStateType['ptLocation']['value'] }>("/product/get?p=m",{ token: token.value })
        
        if (res.status == 200) {
          pageState.ptLocation.value = res.data.data;

          if (pageState.ptLocation.value.length === 0) {
            pageState.stateText.value = "目前無任何產品，請點擊右下角按鈕新增商品";
            return;
          }
          
          method.paginationPart(pages);
        }
      },
      getProductTypeList: async () => {
        pageState.productTypeData.value = [];

        const res = await Fetch.get<{ data: {
          createDate: string,
          isEnable: boolean,
          typeName: string,
          typeNameEn: string,
          updateDate: string,
          TPID: string
        }[] }>("/product/types?t=1",{ token: token.value })
        
        if (res.status == 200) {
          pageState.productTypeData.value = $.maps(res.data.data,row => ({ key: row.typeName, value: row.typeNameEn }));

          if (pageState.ptLocation.value.length === 0) {
            pageState.stateText.value = "目前無任何產品，請點擊右下角按鈕新增商品";
          }
        }
      },
      showDeleteModal: id => {
        const [filterItem] = $.filter(pageState.ptLocation.value, row => row.PDID === id)
        
        if(filterItem){
          pageState.currentSelectIndex.value = id
          pageState.modalDeletedObj.value.toggleModalStatus = true
          pageState.modalDeletedObj.value.modalTitle = "刪除商品";
          pageState.modalDeletedObj.value.modalContent = `確定要刪除 ${filterItem.PDName} 嗎？`;
        }
      },
      closeDeleteModal() {
        pageState.modalDeletedObj.value.toggleModalStatus = false
        pageState.modalDeletedObj.value.modalTitle = "";
        pageState.modalDeletedObj.value.modalContent = "";
      },
      showModal(index, modify) {
        pageState.toggleModalStatus.value = true

        if (modify) {
          pageState.currentSelectIndex.value = index
          pageState.modalConfirmText.value = "修改";
          pageState.modalTitle.value = "修改商品";
          this.modifyOn(index);

          return
        }

        pageState.modalConfirmText.value = "新增";
        pageState.modalTitle.value = "新增商品";
        this.modifyOff();
      },
      closeModal() {
        pageState.toggleModalStatus.value = false
        method.modifyOff()
      },
      addUrlColumn(plusState, order) {
        if (!plusState) {
          
          if (pageState.imgUrlRenderCount.value == 2 && order == 1) {
            toast.error("請按新增順序刪除！");
            return;
          }

          pageState.imgUrlRenderCount.value--;

          return
        } 
        
        if (pageState.imgUrlRenderCount.value >= 2) {
          
          pageState.imgUrlRenderCount.value = 2;
          return
        } 
        
        if (plusState) {
          pageState.imgUrlRenderCount.value++;
        }
      },
      addImgDescColumn(plusState, order) {
        if (!plusState) {
          
          if (pageState.imgDescRenderCount.value == 2 && order == 1) {
            toast.error("請按新增順序刪除！");
            return;
          }

          pageState.imgDescRenderCount.value--;
          return
        } 
        
        if (pageState.imgDescRenderCount.value >= 2) {
          
          pageState.imgDescRenderCount.value = 2;
          return
        }
        
        if (plusState) {
          pageState.imgDescRenderCount.value++;
        }
      },
      uploadLinkProductImg() {

        if(!pageState.imgLinkMainTemp.value){
          pageState.uploadStatus.value = false
          pageState.uploadStartChange.value = false
          return
        }

        pageState.uploadStatus.value = true
        pageState.uploadStartChange.value = true
      },
      submitCheck() {
        let pass = true

        if(!pageState.imgLinkMainTemp.value) pass = false
        if(!pageState.productName.value) pass = false
        if(!pageState.productType.value) pass = false
        if(!pageState.productOriginPrice.value) pass = false
        if(!pageState.productOnSalePrice.value) pass = false
        if(!pageState.productPice.value) pass = false
        if(!pageState.productDescrip.value) pass = false

        return pass
      },
      addProduct() {
        const checked = this.submitCheck();
        
        if(checked){
          const dateDescrip = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' });
          
          pageState.modalConfirmText.value == "新增"
          ? this.postProduct(dateDescrip)
          : this.patchProduct(dateDescrip);

          return
        }

        toast.error('填入資訊不完整')
      },
      modifyOn: async index => {

        const res = await Fetch.get<{ data: {
          PDDesc: string,
          PDImgDescI: string,
          PDImgDescII: string | null,
          PDImgDescIII: string | null,
          PDImgUrlI: string,
          PDImgUrlII: string | null,
          PDImgUrlIII: string | null,
          PDIsNew: number,
          PDName: string,
          PDOffDate: string,
          PDOnDate: string | null,
          PDOnSalePrice: number,
          PDOriginPrice: number,
          PDPice: number,
          PDState: number,
          PDTypeName: string,
          PDID: string
        }[] }>(`/product/get/${index}`)
        
        if (res.status == 200) {
          const [row] = res.data.data
          pageState.imgLinkMainTemp.value = row.PDImgUrlI;
          pageState.imgLinkOtherTempI.value = row.PDImgUrlII;
          pageState.imgLinkOtherTempII.value = row.PDImgUrlIII;
          pageState.imgDescMainTemp.value = row.PDImgDescI;
          pageState.imgDescOtherTempI.value = row.PDImgDescII;
          pageState.imgDescOtherTempII.value = row.PDImgDescIII;
          pageState.productName.value = row.PDName;
          pageState.productType.value = row.PDTypeName;
          pageState.productNew.value = Boolean(row.PDState);
          pageState.productOriginPrice.value = row.PDOriginPrice.toString();
          pageState.productOnSalePrice.value = row.PDOnSalePrice.toString();
          pageState.productDescrip.value = row.PDDesc;
          pageState.productPice.value = row.PDPice.toString();
          pageState.productStatus.value = row.PDState === 3 ? null : Boolean(row.PDState);

          if(row.PDImgUrlII) pageState.imgUrlRenderCount.value++
          if(row.PDImgUrlIII) pageState.imgUrlRenderCount.value++
          if(row.PDImgDescII) pageState.imgDescRenderCount.value++
          if(row.PDImgDescIII) pageState.imgDescRenderCount.value++
          
          await useSleep(500)

          pageState.uploadStatus.value = true
          pageState.uploadStartChange.value = true
        }
      },
      modifyOff() {
        pageState.imgLinkMainTemp.value = "";
        pageState.imgLinkOtherTempI.value = "";
        pageState.imgLinkOtherTempII.value = "";
        pageState.imgDescMainTemp.value = "";
        pageState.imgDescOtherTempI.value = "";
        pageState.imgDescOtherTempII.value = "";
        pageState.productName.value = "";
        pageState.productType.value = "";
        pageState.productNew.value = false;
        pageState.productOriginPrice.value = "";
        pageState.productOnSalePrice.value = "";
        pageState.productDescrip.value = "";
        pageState.productPice.value = "";
        pageState.productStatus.value = null;
        pageState.uploadStatus.value = false
        pageState.uploadStartChange.value = false
        pageState.imgUrlRenderCount.value = 0
        pageState.imgDescRenderCount.value = 0
      },
      postProduct: async dateDescrip => {

        const data =  {
          productMainImg:
            pageState.imgUrlTemp.value || pageState.imgLinkMainTemp.value,
          productOtherImgI:
            !pageState.imgLinkOtherTempI.value ? null : pageState.imgLinkOtherTempI.value,
          productOtherImgII:
            !pageState.imgLinkOtherTempII.value ? null : pageState.imgLinkOtherTempII.value,
          productMainImgDesc: pageState.imgDescMainTemp.value,
          productOtherImgDescI:
            !pageState.imgDescOtherTempI.value ? null : pageState.imgDescOtherTempI.value,
          productOtherImgDescII:
            !pageState.imgDescOtherTempII.value ? null : pageState.imgDescOtherTempII.value,
          productName: pageState.productName.value,
          productTypeName: pageState.productType.value,
          productNew: Number(pageState.productNew.value),
          productOriginPrice: pageState.productOriginPrice.value,
          productOnSalePrice: pageState.productOnSalePrice.value,
          productDescript: pageState.productDescrip.value,
          productPice: parseInt(pageState.productPice.value),
          productStatus:
            pageState.productStatus.value === null ? 3 : Number(pageState.productStatus.value),
          productAddDate: dateDescrip,
          productOnDate: pageState.productStatus.value ? dateDescrip : null,
          productOffDate: null,
        }

        const res = await Fetch.post("/product/create", { data, token: token.value })

        if (res.status == 200) {
          pageState.imgUrlRenderCount.value = 0;
          method.getProduct();
          method.closeModal();

          await useSleep(850)
          toast.success("新增成功！")
        }
      },
      patchProduct: async dateDescrip => {
        
        const data = {
          uuid: pageState.currentSelectIndex.value,
          productMainImg:
            pageState.imgUrlTemp.value || pageState.imgLinkMainTemp.value,
          productOtherImgI:
            !pageState.imgLinkOtherTempI.value ? null : pageState.imgLinkOtherTempI.value,
          productOtherImgII:
            !pageState.imgLinkOtherTempII.value ? null : pageState.imgLinkOtherTempII.value,
          productMainImgDesc: pageState.imgDescMainTemp.value,
          productOtherImgDescI:
            !pageState.imgDescOtherTempI.value ? null : pageState.imgDescOtherTempI.value,
          productOtherImgDescII:
            !pageState.imgDescOtherTempII.value ? null : pageState.imgDescOtherTempII.value,
          productName: pageState.productName.value,
          productTypeName: pageState.productType.value,
          productNew: Number(pageState.productNew.value),
          productOriginPrice: pageState.productOriginPrice.value,
          productOnSalePrice: pageState.productOnSalePrice.value,
          productDescript: pageState.productDescrip.value,
          productPice: parseInt(pageState.productPice.value),
          productStatus:
            pageState.productStatus.value === null ? 3 : Number(pageState.productStatus.value),
          productOnDate: pageState.productStatus.value ? dateDescrip : null,
          productOffDate: !pageState.productStatus.value ? dateDescrip : null,
        }

        const res = await Fetch.post(`/product/patch`, { data, token: token.value })

        if (res.status == 200) {
          pageState.imgUrlRenderCount.value = 0;
          method.getProduct();
          method.closeModal();

          await useSleep(859)

          toast.success("修改成功！")
        }
      },
      deleteProduct: async () => {
        const res = await Fetch.delete(`/product/delete/${pageState.currentSelectIndex.value}`,{ token: token.value })
        
        if (res.status == 200) {
          method.closeDeleteModal();
          method.getProduct();

          await useSleep(850)

          toast.success("刪除成功！")
        }
      },
      renderProductName: productType => {
        const [filterItem] = $.filter(pageState.productTypeData.value, row => row.value  === productType);
        return filterItem ? filterItem.key : '無產品名稱'
      }
    }

    onMounted(async () => {
      await method.getProduct()
      await method.getProductTypeList()
    })

    return { ...pageState,...method }
  }
})
</script>