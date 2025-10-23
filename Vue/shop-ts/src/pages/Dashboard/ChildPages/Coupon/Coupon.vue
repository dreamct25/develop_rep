<template lang="pug">
.container-fluid
  .items-table-outer
    .header
      .list-item-row
        .list-item-col(
          v-for="(item,index) in ['優惠券名稱','優惠券代碼','折扣百分比','啟用狀態','新增日期','啟用日期','停用日期','調整']"
          :key="index"
        ) {{ item }}
    .body
      .list(v-if="cpLocation.length > 0")
        .list-item-row(v-for="(item, index) in cpLocation",:key="index")
          .list-item-col {{ item.CPName }}
          .list-item-col {{ item.CPCode }}
          .list-item-col {{ item.CPPercent }} %
          .list-item-col {{ item.CPState ? '已啟用' : '已停用' }}
          .list-item-col {{ convertTime(item.CPCreateDate) }}
          .list-item-col {{ item.CPEnableDate === null ? '停用中' : convertTime(item.CPEnableDate) }}
          .list-item-col {{ item.CPDisableDate === null ? '使用中' : convertTime(item.CPDisableDate) }}
          .list-item-col
            .choose-group
              span.modify(@click="showModal(item.CPID, (modify = true))")
                i.fas.fa-pencil-alt
              span.deleted(@click="showDeleteModal(item.CPID)")
                i.fas.fa-trash-alt
      .no-data(v-else) {{ stateText }}
  Pagination(
    v-if="cpLocation.length != 0"
    :pageItem="pagination"
    @prev="getCoupon"
    @current="getCoupon"
    @next="getCoupon"
  )
  .add-coupon-btn(@click="showModal")
    i.fas.fa-plus
  .modal-add(:class="{ 'modal-add-toggle': toggleModalStatus }")
    .modal-add-body
      .modal-add-header
        span.modal-add-title {{ modalTitle }}
      .modal-add-content
        .coupon-name-group.mb-3
          CustomInput(
            size="md"
            label="優惠券名稱"
            usingType="input"
            useStyle="white"
            type="text"
            :inputValTemp="couponName"
            @changeEvent="val => couponName = val"
          )
        .create-coupon-code-group
          .row
            .col-md-12
              CustomInput(
                size="md"
                label="優惠券代碼"
                usingType="input"
                useStyle="white"
                type="text"
                :readOnly="true"
                :inputValTemp="couponCode"
                @changeEvent="val => couponCode = val"
              )
              .create-coupon-code(@click="createCouponCode") 生成代碼
        .row
          .col-6
            CustomInput(
              size="md"
              label="折扣百分比 ( % )"
              usingType="input"
              useStyle="white"
              type="text"
              :inputValTemp="couponPercent"
              @changeEvent="val => couponPercent = val"
            )
          .col-6
            CustomInput(
              size="md"
              label="啟用狀態"
              usingType="list"
              useStyle="white"
              type="text"
              :selectedRowTemp="couponStatus"
              :options=`[
                { key: '未啟用', value: false }, 
                { key: '啟用', value: true }
              ]
              `
              @getOptionVal="val => couponStatus = val"
            )
      .modal-add-footer
        .cancel(@click="closeModal") 取消
        .confirm(@click="submitCode") {{ modalConfirmName }}
  DeleteModal(
    :obj="modalDeletedObj"
    @cancle="closeDeleteModal"
    @confirm="deleteCoupon"
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

      @media screen and (max-width: 1220px) {
        width: 1068px;
      }

      .list-item-row {
        position: relative;
        display: grid;
        grid-template-columns: 
          minmax(105px, 1fr) 
          minmax(215px, 2fr) 
          minmax(105px, 1fr) 
          minmax(105px, 1fr) 
          minmax(125px, 1fr) 
          minmax(125px, 1fr) 
          minmax(125px, 1fr) 
          minmax(105px, 1fr);
        align-items: center;
        padding: 12px;

        @media screen and (max-width: 1213px) {
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
            minmax(215px, 2fr) 
            minmax(105px, 1fr) 
            minmax(105px, 1fr) 
            minmax(125px, 1fr) 
            minmax(125px, 1fr) 
            minmax(125px, 1fr) 
            minmax(105px, 1fr);
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

  .add-coupon-btn {
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
      width: 95%;
      max-width: 500px;
      opacity: 0;
      transform: translate(-50%, -54%) scale(0.1);
      transition: 0.5s ease;

      .modal-add-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
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
        padding: 20px 15px 0 15px;

        .row {
          margin: 0 -8px;

          .col-6,
          .col-md-12 {
            padding: 0 8px;
          }
        }

        .delete-text {
          display: block;
          padding: 60px 50px 60px 50px;
          font-size: 20px;
        }

        label {
          display: block;
        }

        .create-coupon-code-group {
          position: relative;

          .create-coupon-code {
            position: absolute;
            top: 10%;
            right: 0;
            margin-right: 15px;
            padding: 5px 10px;
            border-radius: 5px;
            box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
            cursor: pointer;
            user-select: none;
            z-index: 3;
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
import { defineComponent, Ref, ref, watch, onMounted, inject } from 'vue'
import { Pagination, DeleteModal, CustomInput } from "@/component";
import { ProviderObjType } from '@/App';

interface PageStateType {
  cpLocation: Ref<{
    CPCode: string
    CPCreateDate: string
    CPDisableDate: string | null
    CPEnableDate: string | null
    CPID: string
    CPName: string
    CPPercent: number
    CPState: number
  }[]>,
  cpLocationTemp: PageStateType['cpLocation'],
  couponName: Ref<string>,
  couponCode: Ref<string>,
  couponPercent: Ref<string>,
  couponStatus: Ref<boolean>,
  couponCodeHash: Ref<string[]>,
  couponNameEmpty: Ref<boolean>,
  couponCodeEmpty: Ref<boolean>,
  couponPercentEmpty: Ref<boolean>,
  couponFinalCheck: Ref<any[]>,
  submitPass: Ref<boolean>,
  modifyCurrentIndex: Ref<string>,
  modalConfirmName: Ref<string>,
  modalTitle: Ref<string>,
  modalName: Ref<string>,
  modalBody: Ref<string>,
  modalCancle: Ref<string>,
  deleteName: Ref<string>,
  modalDeletedObj: Ref<{
    modalTitle: string,
    modalContent: string,
    toggleModalStatus: boolean
  }>,
  toggleModalStatus: Ref<boolean>,
  stateText: Ref<string>,
  pagination: Ref<{
    totalLength: number,
    partPage: number,
    pageTotal: number
    currentPage: number,
    hasPage: boolean,
    hasNext: boolean
  }>,
}

interface MethodType {
  renderHashCouponCode(): void;
  paginationPart(pages?: number): void;
  getCoupon(pages?: number): Promise<void>;
  modifyOn(index: string): void;
  modifyOff(): void;
  showModal(index: string, modify: boolean): void;
  closeModal(): Promise<void>
  showDeleteModal(id: string): void
  closeDeleteModal(): Promise<void>
  createCouponCode(): void
  submitCodeCheck(): boolean
  addCode(dateStr: string): Promise<void>
  modifyCode(dateStr: string): Promise<void>
  deleteCoupon(): Promise<void>
  submitCode(): void;
  convertTime(time: string): string
}

export default defineComponent({
  components: {
    DeleteModal,
    Pagination,
    CustomInput
  },
  setup(){

    const { Fetch, getReducer, useSleep, $, toast, rwdMod } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)

    const pageState: PageStateType = {
      cpLocation: ref([]),
      cpLocationTemp: ref([]),
      couponName: ref(""),
      couponCode: ref(""),
      couponPercent: ref(""),
      couponStatus: ref(false),
      couponCodeHash: ref([]),
      couponNameEmpty: ref(true),
      couponCodeEmpty: ref(true),
      couponPercentEmpty: ref(true),
      couponFinalCheck: ref([]),
      submitPass: ref(false),
      modifyCurrentIndex: ref(""),
      modalConfirmName: ref(""),
      modalTitle: ref(""),
      modalName: ref(""),
      modalBody: ref(""),
      modalCancle: ref(""),
      deleteName: ref(""),
      modalDeletedObj: ref({
        modalTitle: "",
        modalContent: "",
        toggleModalStatus: false
      }),
      toggleModalStatus: ref(false),
      stateText: ref(""),
      pagination: ref({
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 0,
        hasPage: false,
        hasNext: false
      }),
    }

    const method: MethodType = {
      convertTime: time => $.formatDateTime({ formatDate: time, formatType: 'yyyy / MM / dd' }),
      renderHashCouponCode() {
        for (let x = 0; x <= 9; x++) {
          pageState.couponCodeHash.value.push(x.toString());
        }
        for (let y = 0; y <= 25; y++) {
          pageState.couponCodeHash.value.push(String.fromCharCode(65 + y));
        }
      },
      paginationPart(pages) {
        pageState.pagination.value.totalLength = pageState.cpLocation.value.length;

        pageState.pagination.value.partPage = rwdMod ? 11 : 10;
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
          pageState.pagination.value.currentPage * pageState.pagination.value.partPage -
          pageState.pagination.value.partPage + 1;

        const maxPage = pageState.pagination.value.currentPage * pageState.pagination.value.partPage;

        pageState.cpLocationTemp.value = pageState.cpLocation.value;
        pageState.cpLocation.value = [];

        pageState.cpLocation.value = $.maps(pageState.cpLocationTemp.value, (row, index) => {
          const num = index + 1;
          return num >= minPage && num <= maxPage ? row : undefined
        }).filter(row => row !== undefined)
      },
      getCoupon: async pages => {
        pageState.cpLocation.value = [];
        pageState.stateText.value = "讀取中...";

        const res = await Fetch.get<{ data: PageStateType['cpLocation']['value'] }>("/coupon/get", { token: token.value })

        if (res.status == 200) {
          pageState.cpLocation.value = res.data.data;

          if (pageState.cpLocation.value.length == 0) {

            pageState.stateText.value =
              "目前無任何的優惠券，您可以點擊右上角新增按鈕新增";
            return;
          }

          method.paginationPart(pages || 1);
        }
      },
      modifyOn(index) {

        const [filterItem] = $.filter(pageState.cpLocation.value,row => row.CPID === index) 
        
        if(filterItem){
          pageState.modifyCurrentIndex.value = index;
          pageState.couponName.value = filterItem.CPName;
          pageState.couponCode.value = filterItem.CPCode;
          pageState.couponPercent.value = filterItem.CPPercent.toString();
          pageState.couponStatus.value = Boolean(filterItem.CPState);
        }
      },
      modifyOff() {
        pageState.couponName.value = "";
        pageState.couponCode.value = "";
        pageState.couponPercent.value = "";
        pageState.couponStatus.value = false
      },
      showModal(index, modify) {

        pageState.toggleModalStatus.value = true

        if (modify) {
          
          pageState.modalConfirmName.value = "修改";
          pageState.modalTitle.value = "修改優惠券";
          method.modifyOn(index);

          return
        }

        pageState.modalConfirmName.value = "新增";
        pageState.modalTitle.value = "新增優惠券";
        method.modifyOff();
      },
      closeModal: async () => {
        pageState.toggleModalStatus.value = false

        await useSleep(750)

        pageState.modalConfirmName.value = "";
        pageState.modalTitle.value = "";
      },
      showDeleteModal(id) {

        const [filterItem] = $.filter(pageState.cpLocation.value,row => row.CPID === id) 

        if(filterItem){
          pageState.modifyCurrentIndex.value = id;
          pageState.modalDeletedObj.value = {
            toggleModalStatus: true,
            modalTitle: "刪除商品",
            modalContent: `確定要刪除 ${filterItem.CPName} 嗎？`
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
      createCouponCode() {
        const CodeHash = pageState.couponCodeHash.value;
        let CodeHashArry = [];
        let CodeHashChoos = null;
        for (let z = 0; z < 20; z++) {
          CodeHashChoos = Math.floor(Math.random() * CodeHash.length);
          CodeHashArry.push(CodeHash[CodeHashChoos]);
        }
        pageState.couponCode.value = CodeHashArry.join("");
      },
      submitCodeCheck() {

        if(!pageState.couponName.value){
          toast.error('名稱欄位錯誤')
          return false
        }

        if(!pageState.couponCode.value){
          toast.error('優惠碼欄位錯誤')
          return false
        }

        if(!pageState.couponPercent.value){
          toast.error('百分比欄位錯誤')
          return false
        }

        return true
      },
      addCode: async dateStr => {
        const data = {
          couponName: pageState.couponName.value,
          couponCode: pageState.couponCode.value,
          couponPercent: pageState.couponPercent.value,
          couponStatus: Number(pageState.couponStatus.value),
          couponEnableDate: pageState.couponStatus.value ? dateStr : null,
          couponDisableDate: !pageState.couponStatus.value ? dateStr : null,
          couponAddDate: dateStr,
        }

        const res = await Fetch.post("/coupon/create", { data, token: token.value })

        if (res.status == 200) {
          method.closeModal();
          pageState.couponName.value = "";
          pageState.couponCode.value = "";
          pageState.couponPercent.value = "";
          pageState.couponFinalCheck.value = [];

          toast.success('新增成功')

          method.getCoupon();

          return
        }

        toast.error('新增失敗')
      },
      modifyCode: async dateStr => {
        const data = {
          uuid: pageState.modifyCurrentIndex.value,
          couponName: pageState.couponName.value,
          couponCode: pageState.couponCode.value,
          couponPercent: pageState.couponPercent.value,
          couponEnableDate: pageState.couponStatus.value ? dateStr : null,
          couponDisableDate: !pageState.couponStatus.value ? dateStr : null,
          couponStatus: Number(pageState.couponStatus.value),
        }
        
        const res = await Fetch.post("/coupon/patch", { data, token: token.value })
        
        if (res.status == 200) {
          method.closeModal();
          pageState.couponName.value = "";
          pageState.couponCode.value = "";
          pageState.couponPercent.value = "";
          pageState.couponFinalCheck.value = [];

          toast.success('修改成功')

          method.getCoupon();

          return
        }

        toast.error('修改失敗')
      },
      deleteCoupon: async () => {
        const res = await Fetch.delete(`/coupon/delete/${pageState.modifyCurrentIndex.value}`, { token: token.value })
        
        if (res.status == 200) {
          method.closeDeleteModal();
          pageState.modifyCurrentIndex.value = ''

          toast.success('刪除成功')

          method.getCoupon();

          return
        }

        toast.error('刪除失敗')
      },
      submitCode() {
        const checked = this.submitCodeCheck();
        
        if(checked){
          const dateDescrip = $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' });
          
          pageState.modalConfirmName.value === "新增"
            ? method.addCode(dateDescrip)
            : method.modifyCode(dateDescrip);
            
          return
        }

        toast.error('填入資訊不完整')
      }
    }

    watch(pageState.couponPercent,(cur) => {
      if (parseInt(cur) >= 100) pageState.couponPercent.value = `${100}`;
    })

    onMounted(() => {
      method.renderHashCouponCode();
      method.getCoupon();
    })

    return { ...pageState, ...method }
  }
})
</script>