<template lang="pug">
.top
  h2 本季新品
  .new-product-group
    template(v-if="ptNewData.length > 0")
      .new-product-card-outer(
        :style="{ gridTemplateColumns: `repeat(${ptNewData.length} ,200px)`}"
        :class="{ 'un-scroll': ptNewData.length === 0 }"
        @wheel=`(event) => {
          event.preventDefault();

          if(!event.target.className === 'new-product-card-outer'){
            event.target.scrollLeft += event.deltaY
            return
          }
          
          event.target.parentElement.parentElement.scrollLeft += event.deltaY
        }`
      )
        .new-product-card(
          v-for="(news, index) in ptNewData"
          :key="index"       
          @click="goProductDetails(`${news.PDID}|${news.PDTypeName}`, true)"
        )
          .img(:style="{ backgroundImage: `url(${news.PDImgUrlI})` }")
          span.new-product-title {{ news.PDName }}
          span.new-product-explain {{ news.PDDesc }}
    template(v-else)
      .row
        .col-md-12
          span.no-new-product-title 本季尚無新品
.bottom
  .product-type-list
    .list-row(v-if="productTypeData.length > 0")
      .list-col-outer(v-for="(row,index) in productTypeData",:key="index")
        .list-col
          .mask-before-frame
          .img(style="background-image: url('https://unsplash.com/photos/GCAnKZM21_c/download?force=true&w=1920');")
          .title {{ row.typeName }}
          .mask-after-frame
            i.fas.fa-long-arrow-alt-right.fa-7x
            div(@click="goProductDetails(row.typeNameEn, false)") 前往選購
    .no-data(v-else) 暫無品項分類
Loading(:toggleLoadingStatus="toggleLoadingStatus")
</template>
<style lang="scss" scoped>
  .top {

    h2 {
      padding: 25px 0 15px 0;
      text-align: center;
    }
    
    .new-product-group {
      position: relative;
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
        width: 300px;
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: rgba(255,255,255,.5);
      }

      .no-new-product-title {
        display: block;
        text-align: center;
        font-size: 20px;
        padding-bottom: 30px;
        letter-spacing: 3px;
      }

      .new-product-card-outer {
        display: grid;
        gap: 12px;
        padding-bottom: 12px;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        &.un-scroll {
          overflow-x: unset;
        }

        .new-product-card {
          scroll-snap-align: center;
          overflow: hidden;
          height: 300px;
          border-radius: 10px;
          position: relative;
          cursor: pointer;
          user-select: none;

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
            pointer-events: none;
            border-radius: 10px;
          }

          .img {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 80%;
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          }

          .new-product-title {
            display: block;
            text-align: center;
            margin-top: 5px;
          }

          .new-product-explain {
            display: block;
            text-align: center;
          }
        }

        &::-webkit-scrollbar {
          height: 0;
          background-color: transparent;
        }
        
        &::-webkit-scrollbar-thumb {
          background-color: rgb(100, 100, 100);
          border-radius: 20px;
        }
      }
    }
  }

  .bottom {

    .product-type-list {
      margin-bottom: 12px;

      @media screen and (max-width: 540px) {
        overflow-y: auto;
        overflow-x: hidden;
        scroll-snap-type: y mandatory;
        height: 600px;
        margin: 0 24px 12px 24px;

        &::-webkit-scrollbar {
          background-color: transparent;
          width: 5px;
        }
        
        &::-webkit-scrollbar-thumb {
          border: none;
        }
      }

      .list-row {
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
          grid-template-columns: repeat(1,300px);
        }

        .list-col-outer {
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          height: 300px;

          @media screen and (max-width: 540px) {
            height: 400px;
            scroll-snap-align: center;
          }

          .list-col {

            .img {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-repeat: no-repeat;
              background-position: center center;
              background-size: cover;
              z-index: 0;
              height: 100%;
              border-radius: 5px;
            }

            .title {
              text-align: center;
              padding: 6px 0;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 2;
            }

            .mask-before-frame {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 5;
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
              pointer-events: none;
              border-radius: 5px;
            }

            .mask-after-frame {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              opacity: 0;
              z-index: 3;
              transition: .5s ease;
              background-color: rgba(30, 30, 30,.8);

              i {
                position: absolute;
                top: 23%;
                left: 0;
                opacity: 0;
                transform: translate(-50%,0);
                transition: .5s ease;
              }

              div {
                position: absolute;
                top: 90%;
                left: 50%;
                opacity: 0;
                transform: translate(-50%,0);
                box-shadow: 0 0 0 1px rgba(255, 255, 255, .5);
                border-radius: 5px;
                padding: 6px 12px;
                transition: .5s ease;
                cursor: pointer;
                user-select: none;
              }

              &:hover {
                opacity: 1;
                background-color: rgba(30, 30, 30,.8);

                i {
                  opacity: 1;
                  left: 50%;
                }

                div {
                  opacity: 1;
                  top: 60%;
                }
              }
            }
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 60px;
            background: linear-gradient(0deg,rgba(30, 30, 30,.8),rgba(30, 30, 30,0));
          }
        }
      }

      .no-data {
        text-align: center;
        margin: 52px 0 42px;
        letter-spacing: 3px;
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, Ref, ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderObjType } from '@/App'
import { Loading } from '@/component'

interface PageStateType {
  productTypeData: Ref<{ typeName: string, typNameEn: string }[]>,
  ptNewData: Ref<{
    PDID: string,
    PDName: string,
    PDDesc: string,
    PDImgUrlI: string,
    PDTypeName: string
  }[]>,
  toggleLoadingStatus: Ref<boolean>
}

interface MethodType {
  goProductDetails(typeName: string, isUseNew: boolean):void
  getProductNewsList(): Promise<void>
  getProductTypeList(): Promise<void>
}

export default defineComponent({
  components: {
    Loading
  },
  setup(){
    const router = useRouter()

    const { Fetch } = inject<ProviderObjType>('NewProvider')!

    const pageState: PageStateType = {
      productTypeData: ref([]),
      ptNewData: ref([]),
      toggleLoadingStatus: ref(false)
    }

    const method: MethodType = {
        goProductDetails: (typeName, isUseNew) => {

          if(isUseNew){

            const [PDID,PDTypeName] = typeName.split('|')

            router.push({ path: `/main/product/${PDTypeName}`, query: { p: PDID } })

            return
          }

          router.push({ path: `/main/product/${typeName}` })
        },
        getProductNewsList: async () => {
          const res = await Fetch.get<{ data: PageStateType['ptNewData']['value'] }>('/product/news')

          if(res.status === 200){
            pageState.ptNewData.value = res.data.data
          }
        },
        getProductTypeList: async () => {
          const res = await Fetch.get<{ data: PageStateType['productTypeData']['value'] }>('/product/types')

          if(res.status === 200){
            pageState.productTypeData.value = res.data.data
          }
        },
    }

    onMounted(async () => {
      pageState.toggleLoadingStatus.value = true

      await method.getProductTypeList()
      await method.getProductNewsList()

      pageState.toggleLoadingStatus.value = false
    })

    return { ...pageState, ...method }
  }
})

</script>