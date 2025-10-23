<template lang="pug">
.products-layout
    .products-outer
        .products-card-list(v-if="ptCurrentData.length > 0")
            .products-card(
                v-for="(items, index) in ptCurrentData"
                :key="index"
                @mouseenter="postCardPos(index)"
                @mouseleave="postCardPos(-1)"
            )
                .img(:style="{ backgroundImage: `url(${items.PDImgUrlI})` }")
                .go-product(
                    :class="{ 'go-product-show': index === cardCurrentNum }"
                    @click="goProductSingle(items.PDID)"
                ) 查看商品內容
                .items-title(:class="{ 'items-title-show': index === cardCurrentNum }") {{ items.PDName }}
        .no-data(v-else) 
            .no-data-info 暫無販售品項
            .back-btn(@click="goBack") 返回
        Pagination(
            v-if="ptCurrentData.length != 0"
            :pageItem="pagination"
            @prev="paginationPart"
            @current="paginationPart"
            @next="paginationPart"
        )
        .back-btn(v-if="ptCurrentData.length != 0",@click="goBack") 返回
.modal-product(:class="{ 'modal-product-toggle': toggleProductModalStatus }")
  .modal-product-body
    .modal-content-group(v-if="ptCurrentTarget")
      .modal-product-content
        .top
            .product-header
                span {{ ptCurrentTarget.orderProductName }}
                i.fas.fa-times.close-icon(@click="closeModal(false)")
        .bottom
            .item-img-group-outer
                .item-img-group(
                    ref="itemImgGroupRef"
                    :style="{ gridTemplateColumns: `${Array.from({ length: hasImgArray.length },() => '100%').join(' ')}` }"
                )
                    i.far.fa-chevron-left.fa-2x.arrow-left(
                        :class=`{ 
                            hidden: hasImgArray.length === 1 ? 
                                !(hasImgArray.length > 1 && currentTargetImgCount === 0) :
                                hasImgArray.length > 1 && currentTargetImgCount === 0 }`
                        @click="changeProductImgPrev"
                    )
                    i.far.fa-chevron-right.fa-2x.arrow-right(
                        :class="{ hidden: !(hasImgArray.length - 1 > currentTargetImgCount) }"
                        @click="changeProductImgNext"
                    )
                    .item-img1.imgs(v-if="hasImgArray.length >= 1")
                        img(:src="ptCurrentTarget.orderProductImgIUrl")
                        .img-descrip(:class="{ 'img-descrip-show': currentTargetImgCount === 0 }") {{ ptCurrentTarget.orderProductImgIDesc }}
                    .item-img2.imgs(v-if="hasImgArray.length >= 2")
                        img(:src="ptCurrentTarget.orderProductImgIIUrl")
                        .img-descrip(:class="{ 'img-descrip-show': currentTargetImgCount === 1 }") {{ ptCurrentTarget.orderProductImgIIDesc }}
                    .item-img3.imgs(v-if="hasImgArray.length >= 3")
                        img(:src="ptCurrentTarget.orderProductImgIIIUrl")
                        .img-descrip(:class="{ 'img-descrip-show': currentTargetImgCount === 2 }") {{ ptCurrentTarget.orderProductImgIIIDesc }}
            .row.no-gutters.align-items-center
                .col-6
                    .choose-count-group
                        CustomInput(
                            label="選擇購買數"
                            :selectedRowTemp="orderCount"
                            :options="Array.from({ length: parseInt(ptCurrentTarget.orderProductPice) },(_, num) => num + 1)"
                            usingType="list"
                            useStyle="white"
                            labelAlign="center"
                            align="center"
                            type="text"
                            @getOptionVal="val => orderCount = val"
                        )
                .col-6
                    .size-outer
                        .row.row.no-gutters.justify-content-center
                            .col
                                .row.no-gutters
                                    .col-6(v-for="(row, index) in ['XL','L','M','S']",:key="index")
                                        span.size-btn(:class="{ 'size-btn-active': sizeValue === row }",@click="sizeValue = row") {{ row }}
            .count-price
                .count 剩餘數量 {{ parseInt(ptCurrentTarget.orderProductPice) - parseInt(orderCount || 0) }} 個
                .price NT ${{ ptCurrentTarget.orderCash }}
            .confirm(@click="closeModal(true, ptCurrentTarget.orderProductID)") 加入購物車
Loading(:toggleLoadingStatus="toggleLoadingStatus")
</template>
<style lang="scss" scoped>
.products-layout {

    margin: 5px auto 12px auto;
    width: 1096px;

    @media screen and (max-width: 1230px) {
        width: 872px;
    }

    @media screen and (max-width: 980px) {
        width: 648px;
    }

    @media screen and (max-width: 768px) {
        width: 424px;
    }

    @media screen and (max-width: 540px) {
        width: 200px;
    }

    .products-outer {
        margin-bottom: 12px;

        .products-card-list{
            
            display: grid;
            grid-template-columns: repeat(5,200px);
            gap: 24px;
            justify-content: center;

            @media screen and (max-width: 1230px) {
                grid-template-columns: repeat(4,200px);
            }

            @media screen and (max-width: 980px) {
                grid-template-columns: repeat(3,200px);
            }

            @media screen and (max-width: 768px) {
                grid-template-columns: repeat(2,200px);
            }

            @media screen and (max-width: 540px) {
                grid-template-columns: repeat(1,200px);
            }

            .products-card {
                height: 300px;
                position: relative;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.7);
                text-align: center;

                .img {
                    background-repeat: no-repeat;
                    background-position: center center;
                    background-size: cover;
                    height: 100%;
                }

                .go-product {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    opacity: 0;
                    margin: 0 12px;
                    padding: 5px 10px;
                    transform: translate(0, -30%) scale(0.7);
                    color: rgba(255, 255, 255, 0.7);
                    background-color: rgba(0, 162, 255, 0.7);
                    border-radius: 5px;
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                    0 0 2px 0 rgba(255, 255, 255, 0.7);
                    transition: .5s ease;
                    cursor: pointer;
                    user-select: none;

                    &.go-product-show {
                        opacity: 1;
                        transform: translate(0, -70%) scale(1);
                    }
                }

                .items-title {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    color: rgb(255, 255, 255);
                    padding: 12px 0;
                    background: linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0));
                }
            }
        }

        .no-data {
            text-align: center;
            margin: 35px 0 12px 0;

            .no-data-info {
                letter-spacing: 3px;
            }

            .back-btn {
                margin: 35px auto 0 auto;
                width: 200px;
                padding: 5px 10px;
                color: white;
                background-color: rgba(0, 162, 255, 1);
                border-radius: 5px;
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 2px 0 rgba(255, 255, 255, 0.7);
                cursor: pointer;
                user-select: none;
            }
        }

        .back-btn {
            margin: 25px auto 0 auto;
            width: 200px;
            padding: 5px 10px;
            color: white;
            background-color: rgba(0, 162, 255, 1);
            border-radius: 5px;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 2px 0 rgba(255, 255, 255, 0.7);
            cursor: pointer;
            user-select: none;
            text-align: center;
        }
    }
}

.modal-product {
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: .5s ease;

  .modal-product-body {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    width: 95%;
    max-width: 400px;
    opacity: 0;
    transform: translate(-50%, -55%);
    transition: .5s ease;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    .modal-product-content {
        position: relative;
        text-align: center;
      
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
            border-radius: 10px;
            z-index: 5;
            pointer-events: none;
        }

        .top {
            position: relative;

            .product-header {
                
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                z-index: 2;
                padding: 12px 14px;

                span {
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 125px;
                background: linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.7));
                z-index: 1;
                border-radius: 10px 10px 0 0;
            }
        }

        .bottom {

            .item-img-group-outer {
                position: relative;
                overflow: hidden;

                .item-img-group {
                    overflow-y: hidden;
                    overflow-x: hidden;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
                    display: grid;
                    border-radius: 10px 10px 0 0;

                    .arrow-left {
                        position: absolute;
                        top: 47%;
                        left: 0;
                        transform: translateX(20px);
                        z-index: 1;
                        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
                        cursor: pointer;
                        user-select: none;
                        opacity: 1;
                        transition: .3s ease;

                        &.hidden {
                            opacity: 0;
                            transform: translateX(-55px);
                            pointer-events: none;
                        }
                    }
                    
                    .arrow-right {
                        position: absolute;
                        top: 47%;
                        right: 0;
                        transform: translateX(-20px);
                        z-index: 1;
                        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
                        cursor: pointer;
                        user-select: none;
                        opacity: 1;
                        transition: .3s ease;

                        &.hidden {
                            opacity: 0;
                            transform: translateX(55px);
                            pointer-events: none;
                        }
                    }

                    .imgs {
                        position: relative;
                        transition: .5s ease;

                        img {
                            width: 100%;
                            height: 350px;
                        }

                        .img-descrip {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            opacity: 0;
                            transform: translateY(85%) scale(0.1);
                            transition: .5s ease;
                            color: white;
                            background-color: rgba(0, 0, 0, 0.5);
                            padding: 5px 10px 5px 10px;
                            border-radius: 5px;
                            margin-right: 5px;

                            &.img-descrip-show {
                                transition-delay: .5s;
                                transform: translateY(-10%) scale(1);
                                opacity: 1;
                            }
                        }
                    }

                    &::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                        background-color: rgb(0, 0, 0);
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 8px;
                        background-color: white;
                        border: 5px solid rgb(0, 0, 0);
                    }
                }
            }

            .choose-count-group {
                padding: 12px;

                .input-outer {
                    margin-bottom: 0;
                }
            }

            .size-outer {
                padding: 12px 12px 12px 0;

                .size-btn {
                    display: block;
                    color: white;
                    border-radius: 5px;
                    background-color: rgba(0, 0, 0, 0.7);
                    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.5),
                    0 0 2px 0 rgba(255, 255, 255, 0.7);
                    margin: 5px;
                    padding: 3px 0 2px 0;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.5s ease;

                    @media screen and (max-width: 414px) {
                        margin: 5px 10px 5px 10px;
                    }

                    &.size-btn-active {
                        background-color: rgb(0, 162, 255);
                        box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.5),
                            0 0 4px 0 rgba(255, 255, 255, 0.7);
                    }
                }
            }


            .count-price {

                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 24px;
                margin-bottom: 12px;
                
                .price {
                    display: block;
                    color: red;
                    font-size: 25px;
                    font-weight: bold;
                    font-style: italic;
                }
            }
        }

        .close-icon {
            color: white;
            display: block;
            cursor: pointer;
            font-size: 20px;
            line-height: 1.5em;
            margin: 0 5px 0 5px;
        }

        .confirm {
            border-top: 1px solid rgba(255, 255, 255, 0.7);
            padding: 10px 0px 10px 5px;
            color: white;
            cursor: pointer;
            border-radius: 0 0 10px 10px;
            transition: 0.5s ease;
            text-align: center;

            &:hover {
                background-color: rgb(0, 162, 255);
                box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
            }
        }
    }
  }

  &.modal-product-toggle {
    opacity: 1;
    z-index: 33;
    
    .modal-product-body {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, onMounted, inject, Ref, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProviderObjType } from '@/App'
import { Pagination, Loading, CustomInput } from '@/component'
import $ from '@/lib/Library.ts'

interface PageStateType {
    productListData: Ref<{
        PDDesc: string
        PDID: string
        PDImgDescI: string
        PDImgDescII: string | null
        PDImgDescIII: string | null
        PDImgUrlI: string
        PDImgUrlII: string | null
        PDImgUrlIII: string | null
        PDIsNew: number
        PDName: string
        PDOffDate: string
        PDOnDate: string | null
        PDOnSalePrice: number
        PDOriginPrice: number
        PDPice: number
        PDState: number
        PDTypeNum: number
    }[]>,
    ptCurrentData: PageStateType['productListData'],
    ptCurrentTarget: Ref<{
        orderProductID: PageStateType['productListData']['value'][0]['PDID'],
        orderProductName: PageStateType['productListData']['value'][0]['PDName'],
        orderProductImgIUrl: PageStateType['productListData']['value'][0]['PDImgUrlI'],
        orderProductImgIIUrl: PageStateType['productListData']['value'][0]['PDImgUrlII'],
        orderProductImgIIIUrl: PageStateType['productListData']['value'][0]['PDImgUrlIII'],
        orderProductImgIDesc: PageStateType['productListData']['value'][0]['PDImgDescI'],
        orderProductImgIIDesc: PageStateType['productListData']['value'][0]['PDImgDescII'],
        orderProductImgIIIDesc: PageStateType['productListData']['value'][0]['PDImgDescIII'],
        orderProductPice: PageStateType['productListData']['value'][0]['PDPice'],
        orderCash: PageStateType['productListData']['value'][0]['PDOnSalePrice']
    } | undefined>,
    sizeValue: Ref<string | null>,
    hasImgArray: Ref<(string | null)[]>,
    itemImgGroupRef: Ref<HTMLDivElement | undefined>
    currentTargetImgCount: Ref<number>,
    orderCount: Ref<any>,
    cardCurrentNum: Ref<number>,
    pagination: Ref<Record<string,any>>,
    toggleProductModalStatus: Ref<boolean>,
    toggleLoadingStatus: Ref<boolean>
}

interface MethodType {
    goProductSingle(index: string): void
    getProductListData(): Promise<void>,
    paginationPart(pages?: number): Promise<void>;
    showModal(index: string): void
    closeModal(status: boolean, index?: string): Promise<void>
    orderListCheck(): boolean
    patchProductTotalPice(index: string): Promise<void>
    checkOrder(index: string): Promise<void>,
    postCardPos(index: number): void;
    changeProductImgPrev(): void
    changeProductImgNext(): void
    goBack(): void
}

export default defineComponent({
    components: {
        Pagination,
        Loading,
        CustomInput
    },
    setup(){

        const router = useRouter()

        const route = useRoute()

        const { Fetch, getReducer, setReducer, toast, useSleep } = inject<ProviderObjType>('NewProvider')!

        const { getResultWhenPageInProduct, token } = getReducer(state => ({
            getResultWhenPageInProduct: state.Main.getResultWhenPageInProduct,
            token: state.Login.token
        }))

        const pageState: PageStateType = {
            productListData: ref([]),
            hasImgArray: ref([]),
            sizeValue: ref(null),
            currentTargetImgCount: ref(0),
            itemImgGroupRef: ref(undefined),
            orderCount: ref(null),
            cardCurrentNum: ref(-1),
            toggleProductModalStatus: ref(false),
            pagination: ref({}),
            ptCurrentData: ref([]),
            ptCurrentTarget: ref(undefined),
            toggleLoadingStatus: ref(false)
        }

        const method: MethodType = {
            paginationPart: async pages => {
                pageState.ptCurrentData.value = [];
                pageState.pagination.value.totalLength = pageState.productListData.value.length;

                pageState.pagination.value.partPage = 8;

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

                const ptLocationTemp = pageState.productListData.value;

                pageState.ptCurrentData.value = $.maps(ptLocationTemp, (row, index) => {
                    const num = index + 1;
                    return num >= minPage && num <= maxPage ? row : undefined
                }).filter(row => row !== undefined)
            },
            goBack: () => {
                router.push({ name: 'producttype' })
            },
            goProductSingle: PDID => {
                router.replace({ query: { p: PDID } })
            },
            postCardPos(index) {
                pageState.cardCurrentNum.value = index;
            },
            changeProductImgPrev() {
                pageState.currentTargetImgCount.value -= 1
                $(pageState.itemImgGroupRef.value).scrollToTop({ scrollLeft: pageState.itemImgGroupRef.value!.offsetWidth * pageState.currentTargetImgCount.value,duration: 500 })
            },
            changeProductImgNext() {
                pageState.currentTargetImgCount.value += 1
                $(pageState.itemImgGroupRef.value).scrollToTop({ scrollLeft: pageState.itemImgGroupRef.value!.offsetWidth * pageState.currentTargetImgCount.value,duration: 500 })
            },
            showModal(index) {

                pageState.toggleProductModalStatus.value = true

                const [filterItem] = pageState.productListData.value.filter((key) => key.PDID == index);
                
                if(filterItem){

                    pageState.ptCurrentTarget.value = {
                        orderProductID: filterItem.PDID,
                        orderProductName: filterItem.PDName,
                        orderProductImgIUrl: filterItem.PDImgUrlI,
                        orderProductImgIIUrl: filterItem.PDImgUrlII,
                        orderProductImgIIIUrl: filterItem.PDImgUrlIII,
                        orderProductImgIDesc: filterItem.PDImgDescI,
                        orderProductImgIIDesc: filterItem.PDImgDescII,
                        orderProductImgIIIDesc: filterItem.PDImgDescIII,
                        orderProductPice: filterItem.PDPice,
                        orderCash: filterItem.PDOnSalePrice
                    }

                    pageState.hasImgArray.value = [
                        filterItem.PDImgUrlI,
                        filterItem.PDImgUrlII,
                        filterItem.PDImgUrlIII,
                    ].filter((key) => key != null)

                    return
                }

                toast.error('已無此產品',{ closeButton: false })
                method.closeModal(false)
            },
            closeModal: async (status, index) => {
                if (!status) {
                    pageState.orderCount.value = null;
                    pageState.sizeValue.value = null;

                    pageState.toggleProductModalStatus.value = false

                    router.replace({ query: {} })

                    await useSleep(850)

                    pageState.currentTargetImgCount.value = 0;
                    pageState.hasImgArray.value = [];

                    return
                }

                method.checkOrder(index!);
            },
            orderListCheck() {

                if (!pageState.orderCount.value) {
                    toast.error("請選擇數量");
                    return false
                }

                if (!pageState.sizeValue.value) {
                    toast.error("請選擇尺寸");
                    return false
                }

                return true
            },
            patchProductTotalPice: async index => {

                const [filterItem] = pageState.productListData.value.filter(row => row.PDID === index)

                if(!filterItem){
                    console.error('no product id')
                    return
                }

                const res = await Fetch.post('/product/patch_total_pice/', {
                    data: {
                    PDID: filterItem.PDID,
                    minusCount: pageState.orderCount.value,
                    }
                })

                if(res.status === 200){
                    pageState.orderCount.value = null;
                    pageState.toggleProductModalStatus.value = false
                    method.getProductListData();
                    setReducer('Main/getResultWhenOrderNewProduct',true)
                }
            },
            async checkOrder(index) {
                const allPass = this.orderListCheck();

                if (!allPass) {
                    return;
                }

                if (!token.value) {
                  toast.error("請先登入");
                  router.push("/main/login");
                  return;
                }

                router.replace({ query: {} })

                pageState.toggleLoadingStatus.value = true

                const res = await Fetch.post("/order_list/create", {
                    data : {
                    orderProductID: index,
                    orderCount: pageState.orderCount.value,
                    orderProductSize: pageState.sizeValue.value,
                    orderSingleItemID: btoa((+new Date()).toString())
                    },
                    token: token.value
                })

                if(res.status === 200){
                    await method.patchProductTotalPice(index);
                }

                pageState.toggleLoadingStatus.value = false
            },
            getProductListData: async () => {
                pageState.toggleLoadingStatus.value = true

                const res = await Fetch.get<{ data: PageStateType['productListData']['value'] }>(`/product/get?q=${route.params.typeName}`)

                if(res.status === 200){
                    pageState.productListData.value = res.data.data
                    method.paginationPart()
                }

                pageState.toggleLoadingStatus.value = false
            },
        }

        watch(getResultWhenPageInProduct,async cur => {
      
            if(cur){
                await method.getProductListData()
                setReducer('Main/getResultWhenPageInProduct',false)
                setReducer('Main/getResultWhenOrderNewProduct',true)
            } 
        })

        watch(route,cur => {

            if(cur.query.hasOwnProperty('p')){
                method.showModal(cur.query.p as string)
            }
        },{ deep: true })

        onMounted(async () => {
            await method.getProductListData()

            if(route.query.hasOwnProperty('p')){
                method.showModal(route.query.p as string)
            }
        })

        return { ...pageState, ...method }

    }
})

</script>