<template lang="pug">
.page-layout 
  .page-outer(:class="{ 'rwd-toggle': rwdMod && showRwdList }")
    .header
      .row.no-gutters.align-items-center
        .col-md-9
          template(v-if="!rwdMod")
            router-link(to="/")
              h1.title Fashion
          template(v-else)
            h1.title Fashion
        .col-md-3(v-if="!rwdMod")
          .login-part
            .row.no-gutters.justify-content-end.align-items-center
              .col-md-4(v-if="!token")
                .link(v-if="route.name === 'login'",@click="goPage('/')") 首頁
                .link(v-else,@click="goPage('/main/login')") 登入
              .col-md-4(v-if="!token")
                .link(v-if="route.name === 'register'",@click="goPage('/')") 首頁
                .link(v-else,@click="goPage('/main/register')") 註冊
              .col-md-4(v-if="token")
                .link(@click="loginOff") 登出
    .navs(v-if="!rwdMod",:class="{ hidden: isHiddenNav }")
      ul
        li
          router-link(to="/main/mainpage") 首頁
        li
          router-link(to="/main/product") 商品
        li 
          router-link(to="/main/about") 關於我們
    .main
      router-view(name="mainpage")
      router-view(name="product")
      router-view(name="login")
      router-view(name="register")
      router-view(name="about")
    .footer
      .top
        .bottom-navI
          span 瀏覽
          ul
            li 首頁
            li 各類產品
            li 關於我們
        .bottom-navII
          span 購物問題
          ul
            li 如何購買？
            li 付款方式？
            li 如何退貨？
            li 取貨方式？
        template(v-if="!rwdMod")
          .pay-info
            span.pay-icon-title 支援付款方式
            .pay-icon
              i.fab.fa-cc-visa.fa-3x
              i.fab.fa-cc-paypal.fa-3x
              i.fab.fa-cc-mastercard.fa-3x
              i.fab.fa-cc-jcb.fa-3x
      template(v-if="rwdMod")
        .pay-info
          span.pay-icon-title 支援付款方式
          .pay-icon
            i.fab.fa-cc-visa.fa-3x
            i.fab.fa-cc-paypal.fa-3x
            i.fab.fa-cc-mastercard.fa-3x
            i.fab.fa-cc-jcb.fa-3x
      .bottom
        h6 CopyRight &copy; 2021-01 Alex Chen
.nav-rwd-icon(v-if="rwdMod",@click="showRwdList = !showRwdList")
  span.line(:class="{ 'line-trans-first': showRwdList }")
  span.line(:class="{ 'line-trans-middle': showRwdList }")
  span.line(:class="{ 'line-trans-end': showRwdList }")
.nav-rwd-list(v-if="rwdMod",:class="{ 'nav-rwd-list-active': showRwdList }")
  ul
    li(@click="showRwdList = false")
      router-link(to="/main/mainpage") 首頁
    li(@click="showRwdList = false")
      router-link(to="/main/product") 商品
    li(@click="showRwdList = false")
      router-link(to="/main/about") 關於我們
  .login-part
    ul
      li(@click="showRwdList = false")
        router-link(to="/main/login",v-if="!token") 登入
      li(@click="showRwdList = false")
        router-link(to="/main/register",v-if="!token") 註冊
      li(@click="showRwdList = false")
        a(href="#",v-if="token",@click.prevent="loginOff") 登出
.cart-outer(v-if="token && otLocation && route.name !== 'about'",:class="{ active: toggleCartListStatus }")
  .cart-icon(@click="switchCart")
    i.fas.fa-cart-plus
    .bages {{ otLocation.orderLists.length }}
  .cart-list
    .cart-title
      |已選購的商品
    .cart-layout
      template(v-if="otLocation.orderLists.length > 0")
        .with-list
          .top
            table.table
              thead
                tr
                  th(scope="col",width="1%")
                  th(scope="col") 商品名稱
                  th(scope="col",width="20%") 尺寸
                  th(scope="col",width="20%") 數量
                  th(scope="col",width="20%") 價格
              tbody
                tr(
                  v-for="(orderItems, index) in otLocation.orderLists"
                  :key="index"
                )
                  td
                    i.fal.fa-trash-alt.delete-items(@click="showDeleteModal(orderItems.orderSingleItemID)")
                  td {{ orderItems.orderProductName }}
                  td {{ orderItems.orderProductSize }}
                  td {{ orderItems.orderCount }}
                  td {{ orderItems.orderAllCash }}
          .bottom
            .go-checkout(@click="goPage('/checkout')") 結帳
      .cart-message(v-else) - - 您目前無任何選購的商品 - -
DeleteModal(
  :obj="modalObj"
  @cancle="closeDeleteModal"
  @confirm="deleteOrderList"
)
Loading(:toggleLoadingStatus="toggleLoadingStatus")
</template>
<style lang="scss" scoped>
  .page-layout {
    position: relative;
    overflow: hidden;

    .page-outer {
      
      transition: .5s ease;

      &.rwd-toggle {
        transform: translate(185px);
      }

      .header {
        position: fixed;
        top: 2%;
        left: 0;
        right: 0;
        z-index: 30;
        padding: 0 35px 0 20px;
        
        .title {
          color: white;
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.7);
        }

        @media screen and (max-width: 414px) {
          padding: unset;

          .title {
            text-align: center;
            margin-top: 16px;
          }
        }

        .login-part {

          span {
            display: block;
          }
        }
      }

      .navs {
        position: fixed;
        top: 10%;
        left: 0;
        right: 0;
        z-index: 6;
        color: white;
        text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;

        ul {
          list-style: none;
          display: flex;
          justify-content: space-between;
          padding-left: 0px;
          width: 33%;
          margin-bottom: 0;

          li {
            text-align: center;
          }
        }

        &.hidden {
          top: -100%;
        }
      }
      
      .footer {
        position: relative;
        padding: 20px 12px 0 12px;
        color: white;
        background-color: rgb(30, 30, 30);

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgba(255, 255, 255, .3);
          width: 92%;
          margin: auto;
        }

        .top {
          display: grid;
          grid-template-columns: 100px 150px 125px;
          justify-content: center;
          gap: 25px;

          @media screen and (max-width: 470px) {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .bottom-navI,
          .bottom-navII {
            text-align: center;

            span {
              display: block;
              margin-bottom: 12px;
              position: relative;
              text-align: center;

              &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: -7px;
                background-color: rgba(255, 255, 255, 0.3);
                height: 1px;

                @media screen and (max-width: 414px) {
                  width: 97%;
                  margin: 0 auto;
                }
              }
            }

            ul {
              list-style: none;
              padding-left: 0;

              li {
                margin: 3px 0 10px 0;
              }
            }
          }

          .pay-icon-title {
            display: block;
            margin-bottom: 12px;
            position: relative;
            text-align: center;

            &::after {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: -7px;
              background-color: rgba(255, 255, 255, 0.3);
              height: 1px;
            }
          }

          .pay-icon {
            display: grid;
            grid-template-columns: 1fr 1fr;
            margin-top: 12px;
            text-align: center;
          }
        }

        @media screen and (max-width: 414px) {
          
          .pay-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .pay-icon {
              padding: 12px 0;
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
            }
          }
        }
        
        h6 {
          position: relative;
          padding: 12px 0;
          text-align: center;
          color: white;
          margin-bottom: 0;

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.7);
            width: 95%;
            margin: auto;
          }
        }
      }
    }
  }

  .nav-rwd-icon {
    position: fixed;
    top: 3%;
    left: 0;
    right: 88%;
    bottom: 93%;
    transform: translate(20%, 0%);
    z-index: 32;

    .line {
      display: block;
      height: 4px;
      width: 25px;
      background-color: white;
      margin: 4px 0;
      transition: 0.7s ease;
      border-radius: 20px;

      &:nth-of-type(1) {
        transform: translate(10px, 4px);
      }

      &:nth-of-type(2) {
        transform: translate(10px, 5px);
      }

      &:nth-of-type(3) {
        transform: translate(10px, 6px);
      }
      
      &.line-trans-first {
        transform: translate(10px, 10px) rotate(135deg) !important;
      }

      &.line-trans-middle {
        opacity: 0;
      }

      &.line-trans-end {
        transform: translate(10px, -6px) rotate(-135deg) !important;
      }
    }
  }

  .nav-rwd-list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 185px;
    z-index: 31;
    background: rgb(30,30,30);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0);
    color: white;
    padding-top: 80px;
    transform: translateX(-185px);
    transition: .5s ease;

    ul {
      list-style: none;
      padding-left: 0;

      li {
        margin-bottom: 20px;
        text-align: center;
      }
    }

    .login-part {

      ul {
        list-style: none;

        li {
          text-align: center;
        }
      }
    }

    &.nav-rwd-list-active {
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, .7);
      transform: translateX(0px);
    }
  }

  .cart-outer {
    position: fixed;
    right: 0;
    bottom: 20px;
    z-index: 32;
    margin-right: 25px;

    .cart-icon {
      cursor: pointer;
      user-select: none;
      position: relative;
      background-color: rgba(30,30,30,.7);
      border-radius: 50%;
      width: 48px;
      height: 48px;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, .5);
      
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 20px;
      }

      .bages {
        color: white;
        position: absolute;
        top: -7px;
        right: 0;
        background-color: red;
        border-radius: 50%;
        width: 22px;
        text-align: center;
        font-size: 13px;
        height: 22px;
        padding-top: 1px;
        transform: translateX(5px)
      }
    }

    &.active {

      .cart-list {
        opacity: 1;
        z-index: 3;
        transform: translate(0, 0);
      }
    }

    .cart-list {
      position: fixed;
      top: 0;
      right: 0;
      width: 350px;
      height: 385px;
      padding: 5px 10px 5px 10px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.7);
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7), 0 0 2px 1px rgba(0, 0, 0, 0.7);
      z-index: -1;
      opacity: 0;
      transform: translate(0, -400px);
      margin: 6px;
      backdrop-filter: blur(10px);
      overflow: hidden;
      color: white;
      transition: 0.5s ease;

      @media screen and (max-width: 414px) {
        left: 0;
        width: auto;
      }
      
      .cart-title {
        text-align: left;
        font-size: 20px;
        margin-bottom: 5px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
          padding-right: 5px;
          font-size: 25px;
          cursor: pointer;
          user-select: none;
        }
      }

      .cart-layout {
        
        .with-list {
          display: grid;
          grid-template-rows: 6fr 1fr;

          .top {

            .table {
              margin-bottom: 0;
              color: white;

              th {
                padding: 5px;
                text-align: center;
              }

              td {
                text-align: center;
                padding: 5px;

                .delete-items {
                  color: red;
                  cursor: pointer;
                  user-select: none;
                }
              }
            }
          }

          .bottom {

            .go-checkout {
              cursor: pointer;
              user-select: none;
              text-align: center;
              color: white;
              font-size: 20px;
              font-weight: unset;
              border-radius: 5px;
              margin: 10px 0 4.5px 0;
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
              padding: 2px 0 2px 0;
              transition: 0.5s ease;

              &:hover {
                background-color: rgb(0, 162, 255);
              }
            }
          }
        }
      }

      .cart-message {
        display: flex;
        padding: 10px 0;
        height: 335px;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { DeleteModal, Loading } from "@/component";
import { ProviderObjType } from '@/App'

interface PageStateType {
  otLocation: Ref<{
    orderID: string,
    orderLists: {
      orderProductID: string,
      orderProductName: string,
      orderProductSize: string,
      orderProductImgUrlI: string,
      orderCount: number,
      orderAllCash: number,
      orderSingleItemID: string
    }[]
  }>,
  navListCount: Ref<number>,
  deleteIndex: Ref<string | null>,
  modalObj: Ref<{ toggleModalStatus: boolean, modalTitle: string, modalContent: string }>,
  showRwdList: Ref<boolean>,
  isHiddenNav: Ref<boolean>
  toggleCartListStatus: Ref<boolean>
  toggleLoadingStatus: Ref<boolean>
  [key: string]: any
}

interface MethodType {
  loginOff(): void,
  goPage(path: string): void,
  switchCart(): Promise<void>,
  showDeleteModal(id: string): void,
  closeDeleteModal(): void,
  deleteItem(): void,
  deleteOrderList(): Promise<void>,
  getOrderList(): Promise<void>
}

export default defineComponent({
  components: {
    DeleteModal,
    Loading
  },
  setup(){
    const { $, getReducer, setReducer, toast, Fetch, rwdMod, useSleep } = inject<ProviderObjType>('NewProvider')!

    const router = useRouter()
    const route = useRoute()

    const { token, getResultWhenOrderNewProduct } = getReducer(state => ({
      token: state.Login.token,
      getResultWhenOrderNewProduct: state.Main.getResultWhenOrderNewProduct
    }))

    const pageState: PageStateType = {
      otLocation: ref({
        orderID: '',
        orderLists: []
      }),
      navListCount: ref(0),
      deleteIndex: ref(null),
      modalObj: ref({ 
        toggleModalStatus: false, 
        modalTitle: "", 
        modalContent: "" 
      }),
      showRwdList: ref(false),
      toggleDeleteModalStatus: ref(false),
      isHiddenNav: ref(false),
      toggleCartListStatus: ref(false),
      toggleLoadingStatus: ref(false),
      token,
      rwdMod
    }

    const method: MethodType = {
      async loginOff (){
        const res = await Fetch
          .post("/account/login_off", {
            token: pageState.token.value
          })

        if(res.status === 200){
          setReducer('Login/token', '')
          localStorage.removeItem('token')

          toast.info('登出成功')
        }
      },
      goPage: path => router.push(path),
      switchCart: async () => {

        if (!pageState.toggleCartListStatus.value) {
          
          await method.getOrderList();

          pageState.toggleCartListStatus.value = true

          return
        }

        pageState.toggleCartListStatus.value = false
      },
      showDeleteModal(id) {

        const [filterItem] = $.filter(pageState.otLocation.value!.orderLists,row => row.orderSingleItemID === id)

        if(filterItem){

          pageState.deleteIndex.value = id;
          pageState.modalObj.value = {
            ...pageState.modalObj.value,
            toggleModalStatus: true,
            modalTitle: '刪除商品',
            modalContent: `確定要刪除 ${filterItem.orderProductName} 嗎？`
          }
        }
      },
      closeDeleteModal() {

        setTimeout(() => {
          
          pageState.deleteIndex.value = null;
          pageState.modalObj.value = {
            toggleModalStatus: false,
            modalTitle: '',
            modalContent: ''
          }
        }, 750);
      },
      async deleteItem() {

        const res = await Fetch
          .delete(`/order_list/delete/${pageState.otLocation.value!.orderID}/${pageState.deleteIndex.value}`,{ token: token.value })
        
        if (res.status === 200) {
          
          if(route.name === 'product'){
            setReducer('Main/getResultWhenPageInProduct',true)
          }

          this.closeDeleteModal();
          this.getOrderList();
        }
      },
      async deleteOrderList() {
        const [curDeleteItem] = $.filter(pageState.otLocation.value!.orderLists,row => row.orderSingleItemID === pageState.deleteIndex.value)

        if(!curDeleteItem) return

        const res = await Fetch
          .post('/product/patch_total_pice', {
            data: {
              ODID: pageState.otLocation.value!.orderID,
              PDID: curDeleteItem.orderProductID,
              addCount: curDeleteItem.orderCount
            },
            token: token.value
          })

        if (res.status == 200) {
          method.deleteItem();
        }
      },
      getOrderList: async () => {

        pageState.toggleLoadingStatus.value = true

        const res = await Fetch.get<{ data: {
          ODID: string,
          PayStatus: boolean
          DownCase: boolean,
          List: {
            OPID: string
            ODPDCount: number
            ODPDSize: string
            PDID: string
            PDImgUrlI: string
            PDName: string
            PDOnSalePrice: number
          }[]
        }[] }>("/cart/get",{ token: token.value })

        await useSleep(500)

        pageState.toggleLoadingStatus.value = false

        if (res.status >= 200 && res.status <= 399) {
            pageState.otLocation.value = {
              orderID: '',
              orderLists: []
            };

            if(res.data.data.length === 0) return

            const [result] = res.data.data
            
            pageState.otLocation.value = {
              orderID: result.ODID,
              orderLists: $.maps(result.List, listRow => ({
                orderProductID: listRow.PDID,
                orderProductName: listRow.PDName,
                orderProductSize: listRow.ODPDSize,
                orderProductImgUrlI: listRow.PDImgUrlI,
                orderCount: listRow.ODPDCount,
                orderAllCash: listRow.ODPDCount * listRow.PDOnSalePrice,
                orderSingleItemID: listRow.OPID
              }))
            }
          }
      }
    }

    watch(route,(cur) => {

      if(!rwdMod){

        pageState.isHiddenNav.value = cur.name === 'register' || cur.name === 'login'

        return
      }
    })

    watch(getResultWhenOrderNewProduct,async cur => {
      
      if(cur){
        await method.getOrderList()
        setReducer('Main/getResultWhenOrderNewProduct',false)
      }
    })

    watch(pageState.token,async (cur) => {
      
      if(cur){

        const decode = $.jwtDeocde<UserInfo>(cur)

        if(decode.role === 3){
          router.push({ path: '/dashboard' });
          return
        }

        router.push({ path: '/main/mainPage' })
        await method.getOrderList();
      }
    })

    onMounted(async () => {

      const localToken = localStorage.getItem('token')

      if(localToken) {
        setReducer('Login/token',localToken)

        await method.getOrderList()

        method.goPage('/main/mainpage');
      }
    })

    return { ...pageState, ...method, route }
  }
})
</script>