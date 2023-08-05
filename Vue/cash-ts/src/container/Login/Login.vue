<template lang="pug">
.row.justify-content-center
  .col-md-10
    .login-outer-frame(:class="{'login-outer-frame-active':loginInput}")
      .login-outer
        .login
          .login-header 登入系統
          .login-body
            CustomInput(
              label="帳號"
              type="text"
              align="center"
              usingType="input"
              @changeEvent="val => account = val"
            )
            CustomInput(
              label="密碼"
              type="password"
              align="center"
              usingType="input"
              @changeEvent="val => password = val"
            )
          .login-footer(@click="login") 登入
Loading(:loadingStatus="isLoading")
</template>
<style lang="scss" scoped>
  .login-outer-frame {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 50vh;
    opacity: 0;
    transition: 1s ease;

    .login-outer {
      border-radius: 10px;
      box-shadow: inset 0 0 3px 2px rgba(255, 255, 255, 0.9),0 0 2px 1px rgba(0, 0, 0, 0.7);
      
      .login {
        min-width: 380px;
        color: white;
        
        .login-header {
          font-size: 18px;
          font-weight: bold;
          padding: 10px 0 10px 10px;
          background-color: rgba(0, 0, 0, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 10px 10px 0 0;
        }

        .login-body {
          padding: 13px 20px 1px 20px;
          background-color: rgba(0, 0, 0, 0.7);

          label {
            display: block;
            margin: 5px 0 5px 0;
          }

          input[type="text"],
          input[type="password"] {
            width: 100%;
            margin: 5px 0 5px 0;
            text-align: center;
            outline: none;
            border: none;
            border-radius: 20px;
            box-shadow: inset 0 0 0 0 rgba(0, 110, 255, 0.7),0 0 2px 1px rgba(0, 0, 0, 0.7);
            transition: 0.7s ease;

            &:focus{
                box-shadow: inset 0 0 3px 1px rgba(0, 110, 255, 0.7),0 0 2px 1px rgba(0, 0, 0, 0.7);
            }
          }
        }

        .login-footer {
          text-align: center;
          padding: 10px 0 10px 0;
          background-color: rgba(0, 0, 0, 0.7);
          border-top: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 0 0 10px 10px;
          cursor: pointer;
          user-select: none;
        }
      }
    }

    &.login-outer-frame-active {
        opacity: 1;
    }
  }
</style>
<script lang="ts">
import { defineComponent, ref, onMounted, inject, watch } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { ProviderObjType } from '../../App.vue'
import { CustomInput,Loading } from '../../component'
import { stateType,methodType } from '.'

export default defineComponent({
  components: {
    CustomInput,
    Loading
  },
  setup(){
    const { $,Fetch,setReducer,getReducer,toast } = inject<ProviderObjType>('NewProvider')
    const router = useRouter()
    const route = useRoute()

    const state:stateType = {
      account: ref(''),
      password: ref(''),
      loginStatus: ref(false),
      loginInput: ref(false),
      isLoading: ref(false)
    }

    const method:methodType = {
      login: async () => {
        try {
          state.isLoading.value = true

          const pwdEnc = await $.useSHA('SHA-256',state.password.value)

          const res = await Fetch.post<{ ac:string,token:string,createDate:string }>('/login',{
            data: {
              acName: state.account.value,
              pwd: pwdEnc
            }
          })

          sessionStorage.setItem('temp',JSON.stringify(res.data))

          setReducer('Login',{ auth: res.data })

          state.loginStatus.value = true
          state.account.value = ''
          state.password.value = ''

          toast.success('登入成功',{ 
            icon: 'far fa-check-circle' 
          })

          router.push('/main')
        } catch (error) {
          state.loginStatus.value = false
          state.account.value = ''
          state.password.value = ''
          toast.error('登入失敗',{ 
            icon: 'far fa-times-circle' 
          })
        }

        state.isLoading.value = false
      }
    }

    onMounted(() => {
      state.loginInput.value = true
    })

    return { ...state,...method }
  }
})
</script>