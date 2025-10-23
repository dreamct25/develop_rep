<template lang="pug">
.bg
  .register
    .form-list-outer
      .form-list-header 會員註冊
      .form-list-body
        CustomInput(
          label="請輸入名子或暱稱"
          type="text"
          usingType="input"
          :inputValTemp="vals.createName.val"
          @changeEvent="val => vals.createName.val = val"
        )
        CustomInput(
          :label="vals.createAccount.msg || '請輸入帳號'"
          type="text"
          usingType="input"
          :isValidStatus="!vals.createAccount.isMatch && vals.createAccount.val"
          :inputValTemp="vals.createAccount.val"
          @changeEvent="val => vals.createAccount.val = val"
        )
        CustomInput(
          :label="vals.createPassword.msg || '請輸入密碼'"
          type="password"
          usingType="input"
          :isValidStatus="!vals.createPassword.isMatch && vals.createPassword.val"
          :inputValTemp="vals.createPassword.val"
          @changeEvent="val => vals.createPassword.val = val"
        )
        CustomInput(
          :label="vals.createPhoneNum.msg || '請輸入電話'"
          type="text"
          usingType="input"
          :isValidStatus="!vals.createPhoneNum.isMatch && vals.createPhoneNum.val"
          :inputValTemp="vals.createPhoneNum.val"
          @changeEvent="val => vals.createPhoneNum.val = val"
        )
        CustomInput(
          :label="vals.createEmail.msg || '請輸入 Email'"
          type="text"
          usingType="input"
          :isValidStatus="!vals.createEmail.isMatch && vals.createEmail.val"
          :inputValTemp="vals.createEmail.val"
          @changeEvent="val => vals.createEmail.val = val"
        )
        CustomInput(
          :label="vals.createAddress.msg ||'請輸入地址'"
          type="text"
          usingType="input"
          :isValidStatus="!vals.createAddress.isMatch && vals.createAddress.val"
          :inputValTemp="vals.createAddress.val"
          @changeEvent="val => vals.createAddress.val = val"
        )
      .confirm(@click="sendList") 送出
  AlertModal(:toggleAlertModalStatus="toggleAlertModalStatus")
    template(v-slot:modal-content)
      div(v-html="messageText")
</template>
<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 30, 30, 0.5);
    z-index: -1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://unsplash.com/photos/5gkYsrH_ebY/download?force=true&w=1920");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -2;
  }
}

.register {
  width: 90%;
  max-width: 414px;
  margin: 0 auto;

  .form-list-outer {
    border-radius: 10px;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.7);

    .form-list-header {
      padding: 10px;
      font-size: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    .form-list-body {
      padding: 20px;

      .input-outer {

        &:last-child {
          margin-bottom: 0;
        }
      }

      .success {
        color: rgb(0, 255, 0);
      }
      .wrong {
        color: rgb(255, 0, 0) !important;
      }
    }

    .confirm {
      border-top: 1px solid rgba(0, 0, 0, 0.3);
      padding: 10px 0 10px 0;
      text-align: center;
      cursor: pointer;
      user-select: none;
      transition: 0.5s ease;
      border-radius: 0 0 10px 10px;

      &:hover {
        color: white;
        background-color: rgb(0, 162, 255);
      }
    }
  }

  @media screen and (max-width: 414px) {
    .form-list-outer {
      margin: 88px 0 20px 0;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '@/App'
import { AlertModal, CustomInput } from "@/component";

interface PageStateType {
  vals: Ref<Record<string, { val:string, isMatch: boolean, msg: string }>>,
  countNum: Ref<number>,
  toggleAlertModalStatus: Ref<boolean>,
  messageText: Ref<string>
  checkTextItem: Ref<Record<string, {
    currentWrongText: string,
    currentNoticeText: string,
    currentRegExp: string
  }>>
}

interface MethodType {
  valueCheck(keyNawe: string): void;
  showModal(showText: string, isRegisterSuccess: boolean): Promise<void>;
  sendList(): Promise<void>;
}

export default defineComponent({
  name: "Register",
  components: {
    AlertModal,
    CustomInput
  },
  setup(){
    const router = useRouter()

    const { Fetch, useSleep, $, toast } = inject<ProviderObjType>('NewProvider')!

    const pageState: PageStateType = {
      vals: ref({
        createName: { val: "", isMatch: false, msg: "" },
        createAccount: { val: "", isMatch: false, msg: "" },
        createPassword: { val: "", isMatch: false, msg: "" },
        createPhoneNum: { val: "", isMatch: false, msg: "" },
        createEmail: { val: "", isMatch: false, msg: "" },
        createAddress: { val: "", isMatch: false, msg: "" }
      }),
      countNum: ref(3),
      toggleAlertModalStatus: ref(false),
      messageText: ref(''),
      checkTextItem: ref({
        createAccount: {
          currentWrongText: "帳號格式錯誤",
          currentNoticeText: "請輸入帳號",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        createPassword: {
          currentWrongText: "密碼格式錯誤",
          currentNoticeText: "請輸入密碼",
          currentRegExp: "^[0-9a-zA-Z]+$",
        },
        createPhoneNum: {
          currentWrongText: "電話格式錯誤",
          currentNoticeText: "請輸入電話",
          currentRegExp: "^[0-9]*$",
        },
        createEmail: {
          currentWrongText: "電子郵件格式錯誤",
          currentNoticeText: "請輸入 Email",
          currentRegExp: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$",
        },
        createAddress: {
          currentWrongText: "地址格式錯誤",
          currentNoticeText: "請輸入地址",
          currentRegExp: "^[A-Za-z0-9\u4e00-\u9fa5]+$",
        },
      }),
    }

    const method: MethodType = {
      valueCheck(keyNawe) {
        const ruleItem = pageState.checkTextItem.value[keyNawe]
        const currentVal = pageState.vals.value[keyNawe].val

        if(ruleItem){
          const matchTemp = RegExp(ruleItem.currentRegExp, "g").test(currentVal);

          if(!currentVal){
            pageState.vals.value[keyNawe].isMatch = false
            pageState.vals.value[keyNawe].msg = ruleItem.currentNoticeText

            return
          }

          if(!matchTemp){
            pageState.vals.value[keyNawe].isMatch = false
            pageState.vals.value[keyNawe].msg = ruleItem.currentWrongText
            
            return
          }

          pageState.vals.value[keyNawe].isMatch = true
          pageState.vals.value[keyNawe].msg = ruleItem.currentNoticeText

          return
        }

        pageState.vals.value[keyNawe].isMatch = (keyNawe === 'createName' && currentVal !== '')
      },
      showModal: async (showText, isRegisterSuccess) => {
        pageState.toggleAlertModalStatus.value = true
        
        if(isRegisterSuccess){
          pageState.messageText.value = `
          ${showText}<br />
          提示將在 ${pageState.countNum.value--} 秒後跳轉回登入頁
          `;

          const counterTimer = setInterval(async () => {
            if (pageState.countNum .value === 0) {
              clearInterval(counterTimer);

              pageState.toggleAlertModalStatus.value = false

              await useSleep(1000)
            
              pageState.messageText.value = ''
              router.push({ name: 'login' })
            }

            pageState.messageText.value = `
            ${showText}<br />
            提示將在 ${pageState.countNum.value--} 秒後跳轉回登入頁
            `;
          }, 1000);

          return
        }

        pageState.messageText.value = showText;

        await useSleep(2000)

        pageState.toggleAlertModalStatus.value = false
        pageState.messageText.value = ''
      },
      async sendList() {

        const allMatch = $.maps(
          $.objDetails(pageState.vals.value,'keys'), 
          keyName => pageState.vals.value[keyName].isMatch
        ).filter(row => row === false)

        if(allMatch.length > 0) {
          toast.error('欄位不得為空或格式錯誤或帳號重複，請檢查欄位')
          return
        }

        const ps = await $.useSHA('SHA-256',pageState.vals.value.createPassword.val)

        const result = await Fetch.post("/account/register", {
          data :{
            name: pageState.vals.value.createName.val,
            account: pageState.vals.value.createAccount.val,
            password: ps,
            tel: pageState.vals.value.createPhoneNum.val,
            email: pageState.vals.value.createEmail.val,
            address: pageState.vals.value.createAddress.val,
            time: $.formatDateTime({ formatDate: new Date(), formatType: 'yyyy-MM-dd HH:mm:ss' }),
          }
        })
        
        if (result.status == 200) {
          pageState.vals.value = {
            createName: { val: "", isMatch: false, msg: "" },
            createAccount: { val: "", isMatch: false, msg: "" },
            createPassword: { val: "", isMatch: false, msg: "" },
            createPhoneNum: { val: "", isMatch: false, msg: "" },
            createEmail: { val: "", isMatch: false, msg: "" },
            createAddress: { val: "", isMatch: false, msg: "" }
          }

          this.showModal('感謝您註冊會員', true);
        }
      }
    }

    watch(pageState.vals,(cur) => {
      const getAllKeyName = $.objDetails(cur,'keys')
      
      $.each(getAllKeyName, keyNawe => method.valueCheck(keyNawe))

    },{ deep: true })

    return { ...pageState, ...method }
  }
})
</script>