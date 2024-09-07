<template lang="pug">
.login-page
  .login-outer
    .login-main
      .login-header
        span 會員登入
        .forget-group
          span 忘記帳號
          span 忘記密碼
      .login-body
        CustomInput(
          :label="accoutInfoMsg || '帳號'"
          :isValidStatus="!acMatch && acName"
          :inputValTemp="acName"
          type="text"
          inputStyle="outline"
          usingType="input"
          @changeEvent="val => acName = val"
        )
        CustomInput(
          :label="passwordInfoMsg || '密碼'"
          type="password"
          usingType="input"
          inputStyle="outline"
          :isValidStatus="!psMatch && pwd"
          :inputValTemp="pwd"
          @changeEvent="val => pwd = val"
        )
      .confirm(@click="logIn") 登入
  Loading(:toggleLoadingStatus="toggleLoadingStatus")
</template>
<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://unsplash.com/photos/HY1fq4ZtLTE/download?force=true&w=1920");
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    z-index: -1;
  }

  .login-outer {
    width: 90%;
    max-width: 414px;
    margin: auto;

    .login-main {
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.7);
      border-radius: 10px;

      .login-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        padding: 10px;
        font-size: 20px;

        .forget-group {
          display: flex;

          span {
            display: block;
            font-size: 10px;
            margin: 0 5px 0 5px;
          }
        }
      }

      .login-body {
        display: flex;
        flex-direction: column;
        padding: 25px 30px 22px 30px;

        .input-outer {
          margin-bottom: 30px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .confirm {
        padding: 5px;
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        text-align: center;
        font-size: 20px;
        transition: 0.5s ease;
        border-radius: 0 0 9px 9px;
        cursor: pointer;
        user-select: none;

        &:hover {
          color: white;
          background-color: rgb(0, 174, 255);
        }
      }
    }
  }
}
</style>
<script lang="ts">
import $ from '@/lib/Library.ts'

import { defineComponent, Ref, ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { CustomInput, Loading } from '@/component'
import { ProviderObjType } from '@/App'

interface PageStateType {
  acName: Ref<string>,
  accoutInfoMsg: Ref<string>,
  pwd: Ref<string>,
  passwordInfoMsg: Ref<string>,
  acMatch: Ref<any>,
  psMatch: Ref<any>,
  currentTargetNum: Ref<any>,
  toggleLoadingStatus: Ref<boolean>
  checkTextItem: Ref<{
    currentTargetNum: number,
    currentWrongText: string,
    currentNoticeText: string,
    currentAccountMatch?: string,
    currentRegExp: string,
  }[]>
}

interface MethodType {
  valueCheck(val: string): void;
  valueCheckCenter(val: string): boolean;
  logIn(): Promise<void>;
}

export default defineComponent({
  name: "login",
  components: {
    CustomInput,
    Loading
  },
  setup(){
    const router = useRouter()

    const { setReducer, useSleep, Fetch, toast } = inject<ProviderObjType>('NewProvider')!

    const pageState: PageStateType = {
      acName: ref(""),
      accoutInfoMsg: ref("帳號"),
      pwd: ref(""),
      passwordInfoMsg: ref("密碼"),
      acMatch: ref(null),
      psMatch: ref(null),
      currentTargetNum: ref(null),
      toggleLoadingStatus: ref(false),
      checkTextItem: ref([
        {
          currentTargetNum: 0,
          currentWrongText: "帳號格式錯誤",
          currentNoticeText: "帳號",
          currentAccountMatch: "無效帳號，請註冊帳號",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        {
          currentTargetNum: 1,
          currentWrongText: "密碼格式錯誤",
          currentNoticeText: "密碼",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
      ])
    }

    const method: MethodType = {
      valueCheck(val) {
        const boolTemp = this.valueCheckCenter(val);

        if (pageState.currentTargetNum.value == 0) {
          
          pageState.acMatch.value = !boolTemp ? false : true
          return
        } 

        pageState.psMatch.value = !boolTemp ? false : true
      },
      valueCheckCenter(val) {
        let matchBool: boolean = true

        const [filterItem] = $.filter(pageState.checkTextItem.value,row => row.currentTargetNum === pageState.currentTargetNum.value)

        const checkType = pageState.currentTargetNum.value === 0 ? 'accoutInfoMsg' : 'passwordInfoMsg'

        const regExpTemp = new RegExp(filterItem.currentRegExp).test(val);
        
        matchBool = regExpTemp;

        if (!regExpTemp && !val) {
          matchBool = false;

          pageState[checkType].value = filterItem.currentNoticeText

          return matchBool
        } 
        
        if (!regExpTemp) {
          matchBool = false;
          pageState[checkType].value = filterItem.currentWrongText

          return matchBool
        }

        pageState[checkType].value = checkType === 'accoutInfoMsg' ? '帳號' : '密碼'

        return matchBool
      },
     
      logIn: async () => {

        if (!pageState.acMatch.value) {
          toast.error('帳號錯誤')

          return;
        }

        pageState.toggleLoadingStatus.value = true

        const enc = await $.useSHA('SHA-256',pageState.pwd.value)

        const res = await Fetch.post<{ message: string, ac: string, token: string }>('/account/login',{
          data: {
            acName: pageState.acName.value,
            pwd: enc
          }
        })

        pageState.toggleLoadingStatus.value = false

        if(res.status === 401) {
          toast.error('無此帳號')
          return
        }

        if(res.status === 500) {
          toast.error(res.data.message)
          return
        }

        await useSleep(500)

        const decode = $.jwtDeocde<UserInfo>(res.data.token)

        toast.info(`歡迎回來 ${decode.name}`)

        setReducer('Login/token', res.data.token)

        localStorage.setItem('token',res.data.token)
      }
    }

    watch(pageState.acName,(cur) => {
      pageState.currentTargetNum.value = 0
      method.valueCheck(cur)
    })
    watch(pageState.pwd,(cur) => {
      pageState.currentTargetNum.value = 1
      method.valueCheck(cur)
    })

    return { ...pageState, ...method }
  }
})
</script>