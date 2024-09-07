<template lang="pug">
.container-fluid
  .items-table-outer
    .header
      .list-item-row
        .list-item-col(
          v-for="(item,index) in ['訂單編號','買家名稱','買家電話','買家地址','付款金額','付款方式','付款狀態','建單日期']"
          :key="index"
        ) {{ item }}
    .body
      .list(v-if="pdLocation.length > 0")
        .list-item-row(v-for="(item, index) in pdLocation",:key="index")
          .list-item-col {{ item.PMNum }}
          .list-item-col {{ item.PMName }}
          .list-item-col {{ item.PMTel }}
          .list-item-col {{ item.PMAddress }}
          .list-item-col NT ${{ item.PMTotal }}
          .list-item-col {{ item.PMMethod }}
          .list-item-col(:class=`{ 
            success: item.PMState, 
            notice: !item.PMState
          }`) {{ item.PMState ? '已付款' : '未付款' }}
          .list-item-col {{ convertTime(item.PMCreateDate) }}
      .no-data(v-else) {{ stateText }}
  .footer(v-if="pdLocation.length != 0")
    .top
      div
        span(class="notice") 未付款
        span ：{{ unPayCount }} 筆
      div
        span(class="success") 已付款
        span ：{{ hasPayCount }} 筆
      div
        span 共 {{ totalPayCount }} 筆
    Pagination(
      :pageItem="pagination"
      @prev="getPayDownList"
      @current="getPayDownList"
      @next="getPayDownList"
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
  bottom: 98px;

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

    @media screen and (max-width: 1540px) {
      width: 1286px;
    }

    .list-item-row {
      display: grid;
      grid-template-columns:
        minmax(105px, 1fr) 
        minmax(105px, 1fr) 
        minmax(105px, 1fr) 
        minmax(359px, 2.5fr) 
        minmax(125px, 1fr) 
        minmax(125px, 1fr) 
        minmax(105px, 1fr) 
        minmax(125px, 1fr);
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

    @media screen and (max-width: 1540px) {
      width: 1286px;
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
          minmax(359px, 2.5fr) 
          minmax(125px, 1fr) 
          minmax(125px, 1fr) 
          minmax(105px, 1fr) 
          minmax(125px, 1fr);
        align-items: center;
        padding: 12px 24px;

        .list-item-col {
          color: white;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          &.notice {
            color: red;
          }

          &.success {
            color: rgb(0, 255, 0);
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

.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  .top {
    color: white;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    justify-content: flex-end;
    font-weight: bold;
    width: 425px;
    margin: 0 5px 0 auto;
    padding: 5px 0;
    box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
    border-radius: 5px;

    @media screen and (max-width: 414px) {
      width: 95%;
      margin: 0 auto;
      font-size: 14px;
    }
  
    div {
      position: relative;
      text-align: center;

      .notice {
        color: red;
      }

      .success {
        color: rgb(0, 255, 0);
      }

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: .5px;
        background-color: rgba(255, 255, 255, 0.5);
      }

      &:last-of-type {

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject } from 'vue'
import { ProviderObjType } from '@/App'
import $ from '@/lib/Library.ts'
import { Pagination } from "@/component";

interface PageStateType {
  pdLocation: Ref<{
    CPID: number
    PMAddress: string
    PMCouponIsUse: number
    PMCreateDate: string
    PMEmail: string
    PMID: string
    PMMethod: string
    PMName: string
    PMNum: string
    PMState: boolean
    PMTel: string,
    PMTotal: number
  }[]>,
  pdLocationTemp: PageStateType['pdLocation'],
  stateText: Ref<string>,
  hasPayCount: Ref<number>,
  unPayCount: Ref<number>,
  totalPayCount: Ref<number>
  pagination: Ref<{
    totalLength: number,
    partPage: number,
    pageTotal: number
    currentPage: number,
    hasPage: boolean,
    hasNext: boolean
  }>,
}

export default defineComponent({
  components: {
    Pagination,
  },
  setup(){

    const { Fetch, getReducer, rwdMod } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)

    const pageState: PageStateType = {
      pdLocation: ref([]),
      pdLocationTemp: ref([]),
      stateText: ref(""),
      hasPayCount: ref(0),
      unPayCount: ref(0),
      totalPayCount: ref(0),
      pagination: ref({
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 0,
        hasPage: false,
        hasNext: false
      }),
    }

    const method: {
      convertTime(time: string): string,
      paginationPart(pages?: number): void;
      getPayDownList(pages?: number): Promise<void>;
    } = {
      convertTime: time => $.formatDateTime({ formatDate: time, formatType: 'yyyy / MM / dd' }),
      paginationPart(pages) {
        pageState.pagination.value.totalLength = pageState.pdLocation.value.length;

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
          pageState.pagination.value.partPage +
          1;
        const maxPage = pageState.pagination.value.currentPage * pageState.pagination.value.partPage;

        pageState.pdLocationTemp.value = pageState.pdLocation.value;
        pageState.pdLocation.value = [];

        pageState.pdLocation.value = $.maps(pageState.pdLocationTemp.value, (row, index) => {
          const num = index + 1;
          return num >= minPage && num <= maxPage ? row : undefined
        }).filter(row => row !== undefined)
      },
      getPayDownList: async pages => {
        pageState.pdLocation.value = [];
        pageState.stateText.value = "讀取中...";

        const res = await Fetch.get<{ data: PageStateType['pdLocation']['value'] }>("/payment/get",{ token: token.value })
        
        if (res.status == 200) {
          pageState.pdLocation.value = res.data.data;

          const hasPayCountArray = $.filter(pageState.pdLocation.value,
            row => row.PMState === true
          );

          const unPayCountArray = $.filter(pageState.pdLocation.value,
            row => row.PMState === false
          );

          pageState.hasPayCount.value = hasPayCountArray.length;
          pageState.unPayCount.value = unPayCountArray.length;
          pageState.totalPayCount.value = res.data.data.length
          
          if (pageState.pdLocation.value.length == 0) {
            pageState.stateText.value = "目前無任何訂單";
            return;
          }

          method.paginationPart(pages);
        }
      }
    }

    onMounted(() => {
      method.getPayDownList();
    })

    return { ...pageState, ...method }
  }
})
</script>