<template lang="pug">
.page-layout
  .page-outer(:class="{ 'rwd-toggle': rwdMod && rwdSideBarState }")
    .header
      template(v-if="!rwdMod")
        .row.no-gutters
          .col-sm-2
            .shop-icon
              i.fab.fa-pied-piper-hat
              br
              |Fashion
          .col-sm-10
            .bar-right
              .login-off(@click="loginOff")
                i.fas.fa-sign-out-alt
      template(v-else)
        .shop-icon
          i.fab.fa-pied-piper-hat
          br
          |Fashion
    template(v-if="!rwdMod")
      .content
        .row.no-gutters.h-100
          .col-sm-2
            .aside
              .list
                .list-item(
                  v-for="(item, index) in routeItem"
                  :key="index"
                  @click="goRoute(item.routerPath)"
                )
                  span.route-text(:class="{ active: route.path === item.routerPath }")
                    i(:class="item.routerIcon")
                    |{{ item.routerName }}
          .col-sm-10
            .main
              .main-icon(v-if="!changed")
                i.fab.fa-pied-piper-hat
              .main-changed(v-else)
                router-view(name="productmanage")
                router-view(name="producttypemanage")
                router-view(name="onproduct")
                router-view(name="offproduct")
                router-view(name="coupon")
                router-view(name="orderlist")
              .footer
                h6 CopyRight &copy; 2021-01 Alex Chen
    template(v-else)
      .content-rwd
        .row.no-gutters.h-100
          .col-md-12
            .main-rwd
              .main-icon(v-if="!changed")
                i.fab.fa-pied-piper-hat
              .main-changed(v-else)
                router-view(name="productmanage")
                router-view(name="producttypemanage")
                router-view(name="onproduct")
                router-view(name="offproduct")
                router-view(name="coupon")
                router-view(name="orderlist")
              .footer
                h6 CopyRight &copy; 2021-01 Alex Chen
.rwd-list(
  v-if="rwdMod"
  :class="{ toggle: rwdSideBarState }"
  @click=" rwdSideBarState = !rwdSideBarState"
)
  span.line
  span.line
  span.line
.aside-rwd(v-if="rwdMod", :class="{ 'aside-rwd-active': rwdSideBarState }")
  .list
    .list-item(
      v-for="(item, index) in routeItem"
      :key="index"
      @click="goRoute(item.routerPath)"
    )
      span.route-text(:class="{ active: route.path === item.routerPath }")
        i(:class="item.routerIcon")
        |{{ item.routerName }}
    .list-item
      span.route-text(@click="loginOff")
        i.fas.fa-sign-out-alt.mx-2
        |登出
</template>
<style lang="scss" scoped>
.page-layout {
  overflow: hidden;

  .page-outer {
    display: grid;
    grid-template-rows: auto 1fr;
    position: relative;
    min-height: 100vh;
    transition: .5s ease;

    &.rwd-toggle {
      transform: translate(200px);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -2;
      background-image: url("https://unsplash.com/photos/DB1FvoJW0L4/download?force=true&w=1920");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(30, 30, 30, 0.7);
      z-index: -1;
      backdrop-filter: blur(5px);
    }

    .header {

      .shop-icon {
        position: relative;
        color: white;
        font-size: 20px;
        text-align: center;
        padding: 5px 0 5px 0;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
          width: 80%;
          margin: 0 auto;

          @media screen and (max-width: 414px) {
            width: 90%;
            box-shadow: unset;
            height: .5px;
            background-color: rgba(255, 255, 255, 0.7);
          }
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);

          @media screen and (max-width: 414px) {
            content: unset;
          }
        }
      }

      .bar-right {
        position: relative;
        display: flex;
        justify-content: flex-end;

        .login-off {
          color: white;
          padding: 15px 20px 17px 20px;
          border-radius: 5px;
          font-size: 25px;
          cursor: pointer;
          user-select: none;
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
        }

        @media screen and (max-width: 768px) {
          justify-content: space-between;
        }
      }
    }

    .content {

      .aside {
        position: relative;
        height: 100%;
        display: flex;
        justify-content: center;

        .list {
          padding: 30px 18px 12px 0;

          .list-item {
            font-size: 18px;
            padding-bottom: 25px;
            color: white;

            .route-text {
              cursor: pointer;
              user-select: none;
              font-weight: bold;
              text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
              transition: 0.5s ease;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;

              &.active {
                color: #ff00c8 !important;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
              }
            }
          }
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
        }
      }
      
      .main {
        display: grid;
        grid-template-rows: 1fr 0fr;
        height: 100%;

        .main-icon {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 500px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .main-changed {
          position: relative;
        }

        .footer {
          margin-top: auto;
          position: relative;
          text-align: center;
          padding: 14px 0 14px 0;
          
          
          h6 {
            color: white;
            margin-bottom: 0;
          }

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.7);
          }
        }
      }
    }

    .content-rwd {

      .main-rwd {
        display: grid;
        grid-template-rows: 1fr;
        height: 100%;

        .main-icon {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 200px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .main-changed {
          position: relative;
        }

        .footer {
          position: relative;
          text-align: center;
          padding: 14px 0 14px 0;
          
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 90%;
            height: .5px;
            margin: 0 auto;
            background-color: rgba(255, 255, 255, 0.7);
          }

          h6 {
            color: white;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

.rwd-list {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  margin: 15px 0 0 15px;

  &.toggle {

    .line {
      
      &:nth-of-type(1){
        transform: translateY(2.5px) rotate(29deg);
      }

      &:nth-of-type(2){
        opacity: 0;
        transform: scale(0.5);
      }

      &:nth-of-type(3){
        transform: translateY(-2.5px) rotate(-29deg);
      }
    }
  }

  .line {
    display: block;
    height: 4px;
    width: 25px;
    background-color: white;
    margin: 4px 0;
    border-radius: 20px;
    transition: .5s ease;
  }
}

.aside-rwd {
  position: fixed;
  top: 0;
  width: 200px;
  bottom: 0;
  z-index: 2;
  padding: 60px 0 0 40px;
  background-color: rgb(30,30,30);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0);
  transform: translateX(-200px);
  transition: .5s ease;

  .list {
    height: 100%;

    .list-item {
      font-size: 18px;
      padding-bottom: 25px;
      color: white;

      .route-text {
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        text-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
        transition: 0.5s ease;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;

        &.active {
          color: #ff00c8 !important;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.8);
        }
      }
    }
  }

  &.aside-rwd-active {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .7);
    transform: translateX(0);
  }
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ProviderObjType } from '@/App'
import $ from '@/lib/Library.ts'

interface PageStateType {
  changed: Ref<boolean>,
  rwdSideBarState: Ref<boolean>
  routeItem: Ref<{ routerPath: string, routerIcon: string, routerName: string }[]>
  [key: string]: Ref<any>
}

interface MethodType {
  goRoute(path: string): void;
  loginOff(): void;
}

const dashboardRouteSetting = [
  {
    routerPath: "/dashboard/productmanage",
    routerIcon: "fas fa-sort-size-up-alt mx-2",
    routerName: "商品管理"
  },
  {
    routerPath: "/dashboard/producttypemanage",
    routerIcon: "fas fa-sort-size-up-alt mx-2",
    routerName: "商品類別"
  },
  {
    routerPath: "/dashboard/onproduct",
    routerIcon: "far fa-inbox-out mx-2",
    routerName: "上架產品"
  },
  {
    routerPath: "/dashboard/offproduct",
    routerIcon: "far fa-inbox-in mx-2",
    routerName: "下架產品"
  },
  {
    routerPath: "/dashboard/coupon",
    routerIcon: "fas fa-ticket-alt mx-2",
    routerName: "優惠券"
  },
  {
    routerPath: "/dashboard/orderlist",
    routerIcon: "fal fa-clipboard-list mx-2",
    routerName: "訂單總覽"
  }
]

export default defineComponent({
  setup(){
    const { setReducer, toast, getReducer, rwdMod } = inject<ProviderObjType>('NewProvider')!
    
    const router = useRouter()
    const route = useRoute()
    
    const pageState: PageStateType = {
      changed: ref(false),
      rwdSideBarState: ref(false),
      routeItem: ref(dashboardRouteSetting),
      rwdMod
    }

    const { token } = getReducer(state => state.Login)

    const method: MethodType = {
      goRoute(path) {
        pageState.changed.value = true;
        pageState.rwdSideBarState.value = false
        router.push({ path });
      },
      async loginOff() {
        pageState.changed.value = false;

        const decode = $.jwtDeocde<UserInfo>(localStorage.getItem('token')!)

        toast.info(`本日辛苦您了 ${decode.name}`)

        setReducer('Login/token', '')

        localStorage.removeItem('token')
      }
    }

    watch(token,async (cur) => {

      if(!cur){
        router.push({ path: '/main/mainPage' })
      }
    })

    onMounted(() => {

      const localToken = localStorage.getItem('token')

      if(localToken){

        const decode = $.jwtDeocde<UserInfo>(localToken)

        if(decode.role !== 3){

          router.push({ path: '/main/mainPage' });

          setReducer('Login/token',localToken)

          return
        }

        const [filterCurrentRoute] = $.filter(dashboardRouteSetting,row => row.routerPath === route.fullPath)

        if(filterCurrentRoute){
          pageState.changed.value = true;
          router.push({ path: filterCurrentRoute.routerPath })
        }

        setReducer('Login/token',localToken)

        return

      }

      router.push({ path: '/main/mainPage' });
    })

    return { ...pageState, ...method, route }
  }
})
</script>