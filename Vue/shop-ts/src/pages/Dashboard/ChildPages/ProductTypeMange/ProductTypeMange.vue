<template lang="pug">
.container-fluid
  .items-table-outer
    .header
      .list-item-row
        .list-item-col(
          v-for="(item,index) in ['商品類型名稱','商品類型名稱(EN)','啟用狀態','新增日期','修改日期','調整']"
          :key="index"
        ) {{ item }}
    .body
      .list(v-if="tpLocation.length > 0")
        .list-item-row(v-for="(item, index) in tpLocation",:key="index")
          .list-item-col {{ item.typeName }}
          .list-item-col {{ item.typeNameEn }}
          .list-item-col(:class="{ 'disabled': !item.isEnable }") {{ item.isEnable ? '已啟用' : '已停用' }}
          .list-item-col {{ item.createDate }}
          .list-item-col {{ item.updateDate }}
          .list-item-col
            .choose-group
              span.modify(@click="showModal(item.TPID, (modify = true))")
                i.fas.fa-pencil-alt
              span.deleted(@click="showDeleteModal(item.TPID)")
                i.fas.fa-trash-alt
      .no-data(v-else) {{ stateText }}
  Pagination(
    v-if="tpLocation.length != 0"
    :pageItem="pagination"
    @prev="getTypeListData"
    @current="getTypeListData"
    @next="getTypeListData"
  )
  .add-type-btn(@click="showModal")
    i.fas.fa-plus
  .modal-add(:class="{ 'modal-add-toggle': toggleModalStatus }")
    .modal-add-body
      .modal-add-header
        span.modal-add-title {{ modalTitle }}
      .modal-add-content
        .row
            .col-md-4
              CustomInput(
                size="md"
                label="分類名稱"
                usingType="input"
                useStyle="white"
                type="text"
                :inputValTemp="typeName"
                @changeEvent="val => typeName = val"
              )
            .col-md-4
              CustomInput(
                size="md"
                label="分類英文名稱"
                usingType="input"
                useStyle="white"
                type="text"
                :inputValTemp="typeNameEn"
                @changeEvent="val => typeNameEn = val"
              )
            .col-md-4
              CustomInput(
                size="md"
                label="啟用狀態"
                usingType="list"
                useStyle="white"
                type="text"
                :selectedRowTemp="isEnable"
                :options=`[
                  { key: '未啟用', value: false }, 
                  { key: '啟用', value: true }
                ]
                `
                @getOptionVal="val => isEnable = val"
              )
      .modal-add-footer
        .cancel(@click="closeModal") 取消
        .confirm(@click="submitData") {{ modalConfirmName }}
  DeleteModal(
    :obj="modalDeletedObj"
    @cancle="closeDeleteModal"
    @confirm="deleteProductSingleType"
  )
</template>
<style lang="scss" scoped>
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

      @media screen and (max-width: 1183px) {
        width: 1068px;
      }

      .list-item-row {
        position: relative;
        display: grid;
        grid-template-columns: 
          minmax(105px, 1fr) 
          minmax(105px, 1fr) 
          minmax(105px, 1fr) 
          minmax(125px, 1.2fr) 
          minmax(125px, 1.2fr) 
          minmax(125px, 1fr);
        align-items: center;
        padding: 12px;

        @media screen and (max-width: 1183px) {
          width: 1068px;
        }

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

      @media screen and (max-width: 1220px) {
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
          grid-template-columns: 
            minmax(105px, 1fr) 
            minmax(105px, 1fr) 
            minmax(105px, 1fr) 
            minmax(125px, 1.2fr) 
            minmax(125px, 1.2fr) 
            minmax(125px, 1fr);
          align-items: center;
          padding: 12px;

          @media screen and (max-width: 1213px) {
            width: 1068px;
          }

          .list-item-col {
            color: white;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;

            &.disabled {
                color: rgb(255, 51, 51);
                font-weight: bold;
            }

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

  .add-type-btn {
    position: fixed;
    bottom: 115px;
    right: 0;
    z-index: 2;
    margin: 12px;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.7);
    transition: .5s ease;

    &.modal-add-toggle {
      z-index: 3;
      opacity: 1;

      .modal-add-body {
        opacity: 1;
        transform: translate(-50%, -54%) scale(1);
      }
    }

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
      margin: 2% auto;
      width: 95%;
      max-width: 500px;
      opacity: 0;
      transform: translate(-50%, -54%) scale(0.1);
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
        padding: 20px 15px 2px 15px;

        .input-outer {
          margin-bottom: 16px;
        }

        .row {
          margin: 0 -8px;

          .col-md-4 {
            padding: 0 8px;
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
    }
}
</style>
<script lang="ts">
import { defineComponent, inject, Ref, ref, onMounted } from 'vue'
import { Pagination, DeleteModal, CustomInput } from "@/component";
import { ProviderObjType } from '@/App'

interface PageStateType {
  tpLocation: Ref<{
      TPID: string,
      typeName: string, 
      typeNameEn: string, 
      isEnable: boolean, 
      createDate: string,
      updateDate: string
  }[]>,
  pagination: Ref<{
      totalLength: number,
      partPage: number,
      pageTotal: number
      currentPage: number,
      hasPage: boolean,
      hasNext: boolean
  }>,
  modalConfirmName: Ref<string>,
  modalTitle: Ref<string>,
  modalDeletedObj: Ref<{
      modalTitle: string,
      modalContent: string,
      toggleModalStatus: boolean
  }>,
  stateText: Ref<string>,
  modifyCurrentIndex: Ref<string>
  toggleModalStatus: Ref<boolean>,
  typeName: Ref<string>, 
  typeNameEn: Ref<string>, 
  isEnable: Ref<boolean>, 
}

interface MethodType {
  paginationPart(pages?: number): void;
  getTypeListData(pages?: number): Promise<void>;
  modifyOn(index: string): void;
  modifyOff(): void;
  showModal(index: string, modify: boolean): void;
  closeModal(): Promise<void>
  showDeleteModal(id: string): void
  closeDeleteModal(): Promise<void>
  submitData(): void
  checkData(): boolean
  addProductType(dateStr: string): Promise<void>
  modifyProductSingleType(dateStr: string): Promise<void>
  deleteProductSingleType(): Promise<void>
}

export default defineComponent({
  components: {
    Pagination,
    DeleteModal,
    CustomInput
  },
  setup(){

    const { Fetch, getReducer, $, useSleep, toast, rwdMod } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)

    const pageState:PageStateType = {
      tpLocation: ref([]),
      pagination: ref({
          totalLength: 0,
          partPage: 0,
          pageTotal: 0,
          currentPage: 0,
          hasPage: false,
          hasNext: false
      }),
      stateText: ref(""),
      modifyCurrentIndex: ref(""),
      toggleModalStatus: ref(false),
      modalConfirmName: ref(""),
      modalTitle: ref(""),
      modalDeletedObj: ref({
          modalTitle: "",
          modalContent: "",
          toggleModalStatus: false
      }),
      typeName: ref(''), 
      typeNameEn: ref(''), 
      isEnable: ref(false), 
    }

    const method: MethodType = {
      paginationPart(pages) {
        pageState.pagination.value.totalLength = pageState.tpLocation.value.length;

        pageState.pagination.value.partPage = rwdMod ? 11 : 10;
        pageState.pagination.value.pageTotal = Math.ceil(
          pageState.pagination.value.totalLength / pageState.pagination.value.partPage
        );

        pages == undefined ? (pages = 1) : pages;
        pageState.pagination.value.currentPage = pages;
        pageState.pagination.value.hasPage = pageState.pagination.value.currentPage > 1;
        pageState.pagination.value.hasNext =
        pageState.pagination.value.currentPage < pageState.pagination.value.totalLength;
        
        if (pageState.pagination.value.currentPage === pageState.pagination.value.pageTotal)
          pageState.pagination.value.hasNext = false;
        
        if (pageState.pagination.value.currentPage > pageState.pagination.value.pageTotal)
          pageState.pagination.value.currentPage = pageState.pagination.value.pageTotal;

        const minPage =
          pageState.pagination.value.currentPage * 
          pageState.pagination.value.partPage - pageState.pagination.value.partPage + 1;
        
        const maxPage = pageState.pagination.value.currentPage * pageState.pagination.value.partPage;

        const tpLocationTemp = pageState.tpLocation.value;
        pageState.tpLocation.value = [];

        pageState.tpLocation.value = $.maps(tpLocationTemp, (row, index) => {
          const num = index + 1;
          return num >= minPage && num <= maxPage ? row : undefined
        }).filter(row => row !== undefined)
      },
      modifyOn(index) {

        const [filterItem] = $.filter(pageState.tpLocation.value,row => row.TPID === index) 

        if(filterItem){
          pageState.modifyCurrentIndex.value = index;
          pageState.typeName.value = filterItem.typeName;
          pageState.typeNameEn.value = filterItem.typeNameEn;
          pageState.isEnable.value = filterItem.isEnable;
        }
      },
      modifyOff() {
        pageState.typeName.value = "";
        pageState.typeNameEn.value = "";
        pageState.isEnable.value = false;
      },
      showModal(index, modify) {

        pageState.toggleModalStatus.value = true

        if (modify) {
        
          pageState.modalConfirmName.value = "修改";
          pageState.modalTitle.value = "修改商品類別";
          method.modifyOn(index);

          return
        }

        pageState.modalConfirmName.value = "新增";
        pageState.modalTitle.value = "新增商品類別";
        method.modifyOff();
      },
      closeModal: async () => {
        pageState.toggleModalStatus.value = false

        await useSleep(750)

        pageState.modalConfirmName.value = "";
        pageState.modalTitle.value = "";
      },
      showDeleteModal(id) {

        const [filterItem] = $.filter(pageState.tpLocation.value,row => row.TPID === id) 

        if(filterItem){
          pageState.modifyCurrentIndex.value = id;

          pageState.modalDeletedObj.value = {
            toggleModalStatus: true,
            modalTitle: "刪除商品類型",
            modalContent: `確定要刪除 ${filterItem.typeName} 嗎？`
          }
        }
      },
      closeDeleteModal: async () => {
        pageState.modalDeletedObj.value.toggleModalStatus = false

        await useSleep(750)

        pageState.modifyCurrentIndex.value = ''
        pageState.modalDeletedObj.value.modalTitle = "";
        pageState.modalDeletedObj.value.modalContent = "";
      },
      submitData: () => {
        const checked = method.checkData();
        
        if(checked){
          const dateDescrip = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' });
          
          pageState.modalConfirmName.value === "新增"
            ? method.addProductType(dateDescrip)
            : method.modifyProductSingleType(dateDescrip);
              
          return
        }

        toast.error('填入資訊不完整')
      },
      checkData() {

        if(!pageState.typeName.value){

          return false
        }

        if(!pageState.typeNameEn.value) {

          return false
        }

        return true
      },
      addProductType: async dateStr => {
        const data = {
          typeName: pageState.typeName.value,
          typeNameEn: pageState.typeNameEn.value,
          isEnable: pageState.isEnable.value,
          createDate: dateStr,
        }

        const res = await Fetch.post("/product/types/create", { data, token: token.value })

        if (res.status === 200) {
          method.closeModal();
          pageState.typeName.value = "";
          pageState.typeNameEn.value = "";
          pageState.isEnable.value = false;

          toast.success('新增成功')

          method.getTypeListData();

          return
        }

        toast.error('新增失敗')
      },
      modifyProductSingleType: async dateStr => {
        const data = {
          uuid: pageState.modifyCurrentIndex.value,
          typeName: pageState.typeName.value,
          typeNameEn: pageState.typeNameEn.value,
          isEnable: pageState.isEnable.value,
          updateDate: dateStr,
        }
        
        const res = await Fetch.post<{ message: string }>("/product/types/patch", { data, token: token.value })
        
        if (res.status === 200) {
          method.closeModal();
          pageState.typeName.value = "";
          pageState.typeNameEn.value = "";
          pageState.isEnable.value = false;
          toast.success('修改成功')

          method.getTypeListData();
        }

        if (res.status === 500) {
          toast.error(`目前有 ${res.data.message.split('|')[1]} 個商品使用此類型，可先將商品調整為佔位類型`,{ timeout: 10000 })
        }
      },
      deleteProductSingleType: async () => {
        const res = await Fetch.delete<{ message: string }>(`/product/types/delete/${pageState.modifyCurrentIndex.value}`, { token: token.value })
        
        if (res.status === 200) {
          method.closeDeleteModal();
          pageState.modifyCurrentIndex.value = ''
          toast.success('刪除成功')
          method.getTypeListData();
        }

        if (res.status === 500) {
          toast.error(`目前有 ${res.data.message.split('|')[1]} 個商品使用此類型，可先將商品調整為佔位類型`,{ timeout: 10000 })
        }
      },
      getTypeListData: async pages => {
        pageState.tpLocation.value = []
        pageState.stateText.value = "讀取中...";

        const res = await Fetch.get<{ data: PageStateType['tpLocation']['value'] }>('/product/types',{ token: token.value })

        if(res.status === 200){

          pageState.tpLocation.value = res.data.data

          if (pageState.tpLocation.value.length == 0) {

            pageState.stateText.value = "目前無任何的商品類別，您可以點擊右上角新增按鈕新增";
            return;
          }

          method.paginationPart(pages || 1)
        }
      }
    }

    onMounted(() => {
      method.getTypeListData()
    })

    return { ...pageState, ...method }
  }
})

</script>