<template lang="pug">
.container-fluid
  .items-table-outer
    .header
      .list-item-row
        .list-item-col(
          v-for="(item,index) in ['商品名稱','商品分類','商品原價','商品售價','商品庫存量','是否為新品','上架日期']"
          :key="index"
        ) {{ item }}
    .body
      .list(v-if="ptLocation.length > 0")
        .list-item-row(v-for="(item, index) in ptLocation",:key="index")
          .list-item-col {{ item.PDName }}
          .list-item-col {{ item.PDTypeName || '無產品名稱' }}
          .list-item-col $ {{ item.PDOriginPrice }} NT
          .list-item-col $ {{ item.PDOnSalePrice }} NT
          .list-item-col {{ item.PDPice }} 個
          .list-item-col {{ Boolean(item.PDIsNew) ? '是' : '否' }}
          .list-item-col {{ convertTime(item.PDOffDate) }}
      .no-data(v-else) {{ stateText }}
  Pagination(
    v-if="ptLocation.length != 0"
    :pageItem="pagination"
    @prev="getProduct"
    @current="getProduct"
    @next="getProduct"
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

    @media screen and (max-width: 1034px) {
      width: 1068px;
    }

    .list-item-row {
      display: grid;
      grid-template-columns: repeat(7, minmax(105px, 1fr));
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

    @media screen and (max-width: 1034px) {
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
        grid-template-columns: repeat(7, minmax(105px, 1fr));
        align-items: center;
        padding: 12px;

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
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject } from 'vue'
import { ProviderObjType } from '@/App'
import { Pagination } from "@/component";
import $ from '@/lib/Library.ts'

export default defineComponent({
  components: {
    Pagination
  },
  setup(){
    const { Fetch, getReducer, rwdMod } = inject<ProviderObjType>('NewProvider')!

    const { token } = getReducer(state => state.Login)
    
    const pageState: {
      ptLocation: Ref<{
        PDID: string
        PDIsNew: number
        PDName: string
        PDOnSalePrice: number
        PDOriginPrice: number
        PDPice: number
        PDState: number | null
        PDTypeName: number
        PDOffDate: string
      }[]>,
      ptLocationTemp: Ref<{
        PDID: string
        PDIsNew: number
        PDName: string
        PDOnSalePrice: number
        PDOriginPrice: number
        PDPice: number
        PDState: number | null
        PDTypeName: number
        PDOffDate: string
      }[]>,
      stateText: Ref<string>,
      pagination: Ref<{
        totalLength: number,
        partPage: number,
        pageTotal: number
        currentPage: number,
        hasPage: boolean,
        hasNext: boolean
      }>,
      productTypeData: Ref<{
        typeNum: number,
        typeName: string,
      }[]>,
    } = {
      ptLocation: ref([]),
      ptLocationTemp: ref([]),
      stateText: ref(""),
      pagination: ref({
        totalLength: 0,
        partPage: 0,
        pageTotal: 0,
        currentPage: 0,
        hasPage: false,
        hasNext: false
      }),
      productTypeData: ref([
        "套裝","褲子","裙裝","內搭衣",
        "高跟鞋","平底鞋","皮鞋","靴子",
        "項鍊","戒指","時尚錶","包包"
      ].map((row,index) => ({ typeNum: index + 1,typeName: row })))
    }

    const method: {
      convertTime(time: string): string,
      paginationPart(pages?: number): void,
      getProduct(pages?: number): Promise<void>
    } = {
      convertTime: time => $.formatDateTime({ formatDate: time, formatType: 'yyyy / MM / dd' }),
      paginationPart(pages) {
        pageState.pagination.value.totalLength = pageState.ptLocation.value.length;

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

        pageState.ptLocationTemp.value = pageState.ptLocation.value;
        pageState.ptLocation.value = [];

        pageState.ptLocation.value = $.maps(pageState.ptLocationTemp.value, (row, index) => {
          const num = index + 1;
          return num >= minPage && num <= maxPage ? row : undefined
        }).filter(row => row !== undefined)
      },
      getProduct: async pages => {
        pageState.ptLocation.value = [];
        pageState.stateText.value = "讀取中...";

        const res = await Fetch.get<{ data: typeof pageState.ptLocation.value }>("/product/get?o=0",{ token: token.value })
        
        if (res.status == 200) {
          
          if (res.data.data.length == 0) {
            pageState.stateText.value = "目前暫無下架商品";
            return;
          }

          pageState.ptLocation.value = res.data.data

          method.paginationPart(pages);
        }
      }
    }

    onMounted(async () => {
      await method.getProduct();
    })

    return { ...pageState, ...method }
  }
})
</script>