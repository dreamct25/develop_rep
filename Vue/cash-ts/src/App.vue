<template lang="pug">
.header
    .login-off-outer
        .login-off(:class="{'login-off-active':loginStatus}",@click="loginOff") 登出
.main
    .container
        .row.justify-content-center
            .col-md-10
                span.time-show {{ timeShow }}
        router-view
.footer
    h6 CopyRight &copy; 2023-07 Alex Chen .
</template>
<style lang="scss" scoped>
    .header{
        .login-off-outer {
            display: flex;
            justify-content: flex-end;
            
            .login-off {
                position: fixed;
                top: -100%;
                right: 0;
                font-size: 18px;
                margin: -2px -2px 0 0;
                padding: 5px 10px 3px 10px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                border-radius: 0 0 0 10px;
                box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
                transition: 1s ease;
                cursor: pointer;
                user-select: none;

                &.login-off-active {
                    top: 0;
                }
            }
        }
    }

    .main {
        .time-show {
            display: block;
            text-align: right;
            margin: 16px 0 16px 0;
            font-weight: bold;
            color: white;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);

            @media screen and (max-width: 768px) {
                font-size: 18px;
            }
        }
    }

    .footer {
        color: white;
        text-align: center;

        h6 {
            font-size: 18px;
            padding: 40px 0 40px 0;
            font-style: italic;
            text-shadow: 0 2px 1px rgba(0, 0, 0, 0.7);
            margin-bottom: 0;
        }
    }
</style>
<script lang="ts">
import { defineComponent, provide, readonly, reactive, ref,toRef,onMounted,onUnmounted,watch } from 'vue'
import { Store, storeToRefs } from 'pinia'
import { useRouter,useRoute } from 'vue-router'
import { useToast,ToastInterface } from 'vue-toastification'
import $ from './lib/Library'
import Fetch from './utiles/fetch'
import store from './store'
import { reducerAssimbleType,storeMemberType,getMatchReducer } from './store/reducerAssimbleType'

export interface ProviderObjType {
    $:$,
    Fetch: typeof Fetch,
    getReducer<T>(callBack: (states: reducerAssimbleType) => T): T;
    setReducer<T extends storeMemberType>(storeMember:T,setObj:getMatchReducer<T>):void,
    toast: ToastInterface
}

const providerObj:ProviderObjType = {
    $,
    Fetch,
    getReducer: callBack => callBack.call(callBack,Object.fromEntries(Object.entries(store).map(([keyName,value]) => [keyName,storeToRefs(value())]))),
    setReducer: (storeMember,setObj) => (store[storeMember as string]() as Store).$patch(setObj),
    toast: useToast()
}

export default defineComponent({
    setup(){
        const timer = ref<NodeJS.Timer | undefined>()
        const timeShow = ref<string>('')
        const loginStatus = ref<boolean>(false)
        const router = useRouter()
        const route = useRoute()
        const auth = providerObj.getReducer(({ Login }) => toRef(Login.auth))

        provide("NewProvider",
            readonly(
                reactive<ProviderObjType>(providerObj)
            )
        );

        const loginOff:() => Promise<void> = async () => {
            const obj =  JSON.parse(sessionStorage.getItem('temp')) as {[key:string]:any}
            const res = await Fetch.get<{ ac:string,token:string,createDate:string }>('/logout',{
                token: obj.token
            })

            if(res.status >= 200 && res.status <= 399){
                sessionStorage.removeItem('temp')
                providerObj.setReducer('Login',{ auth: undefined })
                providerObj.toast.success('登出成功',{ 
                    icon: 'far fa-check-circle' 
                })
            } else {
                providerObj.toast.error('登出錯誤',{ 
                    icon: 'far fa-times-circle'
                })
            }
        }

        watch(auth,cur => {
            if(cur){
                loginStatus.value = true
            } else {
                loginStatus.value = false
                router.push('/login')
            }
        })

        onMounted(() => {
          const isLogin = sessionStorage.getItem('temp') ? JSON.parse(sessionStorage.getItem('temp')) : undefined

          timer.value = setInterval(() => {
            timeShow.value = $.formatDateTime({ formatDate: new Date(),formatType: 'yyyy-MM-dd HH:mm:ss' }) as string
          },1000)

          if(!isLogin){
            router.push('/login')
          } else {
            providerObj.setReducer('Login',{ auth: isLogin })
          }
        })

        onUnmounted(() => {
          clearInterval(timer.value)
        })

        return { timeShow,loginStatus,loginOff }
    }
})
</script>