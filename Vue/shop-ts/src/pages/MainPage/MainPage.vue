<template lang="pug">
#carouselExampleIndicators.carousel.slide(data-ride="carousel")
  ol.carousel-indicators
    li.active(
      data-target="#carouselExampleIndicators"
      data-slide-to="0"
    )
    li(data-target="#carouselExampleIndicators",data-slide-to="1")
    li(data-target="#carouselExampleIndicators",data-slide-to="2")
  .carousel-inner
    .carousel-item.active
      .img-1
    .carousel-item
      .img-2
    .carousel-item
      .img-3
  a.carousel-control-prev(
    href="#carouselExampleIndicators"
    role="button"
    data-slide="prev"
  )
    span.carousel-control-prev-icon(aria-hidden="true")
    span.sr-only Previous
  a.carousel-control-next(
    href="#carouselExampleIndicators"
    role="button"
    data-slide="next"
  )
    span.carousel-control-next-icon(aria-hidden="true")
    span.sr-only Next
.product-type-outer
  .product-typeI(:ref="target => scrollActionElements(target,scrollYVal)")
    .border-helfI
    .product-mainI
      .row.no-gutters
        .col-md-6
          .d-flex.justify-content-center.h-100
            .product-text(:class="{ 'product-text-active': productTypeIAnimate }")
              span 服飾風格
              p.text-justify
                |Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                |Nihil deserunt corrupti perspiciatis, alias tempora,
                |dignissimos hic quidem iure tenetur quas, voluptas earum
                |aperiam consequuntur voluptatibus fugit tempore neque maxime
                |saepe.
        .col-md-6
          .carousel-group(:class="{ 'carousel-group-active': productTypeIAnimate }")
            i.far.fa-chevron-left.fa-2x.prev(@click="prevImg('I')")
            .carousel-outer
              img.carouselI(
                v-for="(item,index) in carouselImgsI"
                :class="{ 'now-img' : index === carouselICount }"
                :src="item" 
                :key="index"
              )
            i.far.fa-chevron-right.fa-2x.next(@click="nextImg('I')")
  .product-typeII(:ref="target => scrollActionElements(target,scrollYVal)")
    .border-helfII
    .product-mainII
      .row.no-gutters
        .col-md-6
          .carousel-group(:class="{ 'carousel-group-active': productTypeIIAnimate }")
            i.far.fa-chevron-left.fa-2x.prevII(@click="prevImg('II')")
            .carousel-outer
              img.carouselII( 
                v-for="(item,index) in carouselImgsII"
                :class="{ 'now-img' : index === carouselIICount }" 
                :src="item" 
                :key="index"
              )
            i.far.fa-chevron-right.fa-2x.nextII(@click="nextImg('II')")
        .col-md-6
          .d-flex.justify-content-center.h-100
            .product-text(:class="{ 'product-text-active': productTypeIIAnimate }")
              span 飾品設計
              p.text-justify
                |Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                |Perferendis quam tempora id accusamus blanditiis non
                |praesentium temporibus debitis eum maiores! Deleniti
                |voluptate soluta eum molestias, possimus dignissimos earum
                |similique. Deleniti!
  .product-typeIII(:ref="target => scrollActionElements(target,scrollYVal)")
    .border-helfIII
    .product-mainIII
      .row.no-gutters
        .col-md-6
          .d-flex.justify-content-center.h-100
            .product-text.align-self-center(:class="{ 'product-text-active': productTypeIIIAnimate }")
              span 潮流包包
              p.text-justify
                |Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                |Perferendis quam tempora id accusamus blanditiis non
                |praesentium temporibus debitis eum maiores! Deleniti
                |voluptate soluta eum molestias, possimus dignissimos earum
                |similique. Deleniti!
        .col-md-6
          .carousel-group(:class="{ 'carousel-group-active': productTypeIIIAnimate }")
            i.far.fa-chevron-left.fa-2x.prevIII(@click="prevImg('III')")
            .carousel-outer
              img.carouselIII(
                v-for="(item,index) in carouselImgsIII"
                :class="{ 'now-img' : index === carouselIIICount }" 
                :src="item" 
                :key="index"
              )
            i.far.fa-chevron-right.fa-2x.nextIII(@click="nextImg('III')")
</template>
<style lang="scss" scoped>
.carousel {
  margin: -1px;

  .carousel-item {
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: rgba(30, 30, 30, 0.3);
    }

    div {
      width: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      min-height: 550px;

      @media screen and (max-width: 414px) {
        min-height: 400px;
      }

      &.img-1 {
        background-image: url("https://unsplash.com/photos/GCAnKZM21_c/download?force=true&w=1920");
      }

      &.img-2 {
        background-image: url("https://unsplash.com/photos/i2jbuqO0YfM/download?force=true&w=1920");
      }

      &.img-3 {
        background-image: url("https://unsplash.com/photos/-SDgOlirIaY/download?force=true&w=1920");
      }
    }
  }
}

.product-type-outer {
  
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url("https://unsplash.com/photos/jAdtyxPDmvU/download?force=true&w=1920");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .product-typeI {
    position: relative;
    text-align: center;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);

    .border-helfI {
      position: absolute;
      top: -23%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(8deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);

      @media screen and (max-width: 768px) {
        display: none;
      }
    }
    
    .product-text {
      position: relative;
      color: white;
      padding: 20px 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(-60px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: 0.7s ease;
      margin: 0 25px 0 32px;

      @media screen and (max-width: 768px) {
        margin: unset;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 1px;

        @media screen and (max-width: 768px) {
          display: none;
        }
      }

      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }

      &.product-text-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
    
    .carousel-group {
      position: relative;
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(60px);
      transition: 0.7s ease;
      margin: 0 32px 0 -25px;

      @media screen and (max-width: 768px) {
        margin: unset;
        padding: 12px 40px 40px 40px;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 1px;

        @media screen and (max-width: 768px) {
          width: 85%;
          margin: 0 auto;
        }
      }

      .prev,
      .next {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: .3s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }

      .prev {
        
        &:active {
          opacity: 0;
          transform: translateX(-10px);
        }
      }

      .next {
        
        &:active {
          opacity: 0;
          transform: translateX(10px);
        }
      }
      
      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;

        .carouselI {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          transform: scale(1.1);
          transition: 1s ease;

          &:nth-of-type(1) {
            top: 0%;
            z-index: 3;
            opacity: 0;
          }

          &:nth-of-type(2) {
            top: -18%;
            z-index: 2;
            opacity: 0;
            width: 75%;
            margin-left: 24px;
          }

          &:nth-of-type(3) {
            top: -30%;
            z-index: 1;
            opacity: 0;
          }

          &.now-img {
            transform: scale(1);
            opacity: 1 !important;
          }
        }
      }

      &.carousel-group-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }
  
  .product-typeII {
    position: relative;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .border-helfII {
      position: absolute;
      top: -5%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(-8deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .product-text {
      color: white;
      padding: 20px 50px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(60px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 50px 0 16px;
      transition: 0.7s ease;

      @media screen and (max-width: 768px) {
        margin: unset;
        padding: 20px 30px;
      }

      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 1px;

        @media screen and (max-width: 768px) {
          width: 85%;
          margin: 0 auto;
        }
      }

      &.product-text-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }

    .carousel-group {
      position: relative;
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(-60px);
      transition: 0.7s ease;
      margin: 0 -25px 0 32px;

      @media screen and (max-width: 768px) {
        margin: unset;
        padding: 40px 40px 12px 40px;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 1px;

        @media screen and (max-width: 768px) {
          display: none;
        }
      }

      .prevII,
      .nextII {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: .3s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }

      .prevII {
        
        &:active {
          opacity: 0;
          transform: translateX(-10px);
        }
      }

      .nextII {
        
        &:active {
          opacity: 0;
          transform: translateX(10px);
        }
      }

      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;

        .carouselII {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          transform: scale(1.1);
          transition: 1s ease;

          &.now-img {
            transform: scale(1);
            opacity: 1 !important;
          }

          &:nth-of-type(1) {
            top: 0;
            z-index: 3;
            opacity: 0;
          }

          &:nth-of-type(2) {
            top: 0;
            z-index: 2;
            opacity: 0;
          }

          &:nth-of-type(3) {
            top: -12%;
            z-index: 1;
            opacity: 0;
            width: 75%;
            margin-left: 24px;
          }
        }
      }

      &.carousel-group-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }

  .product-typeIII {
    position: relative;
    text-align: center;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);

    .border-helfIII {
      position: absolute;
      top: -23%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(8deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .product-text {
      color: white;
      padding: 20px 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(-60px);
      transition: 0.7s ease;
      margin: 0 25px 0 50px;

      @media screen and (max-width: 768px) {
        margin: unset;
      }

      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }

      &.product-text-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
    
    .carousel-group {
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(60px);
      transition: 0.7s ease;

      @media screen and (max-width: 768px) {
        padding: 12px 40px 40px 40px;
      }

      .prevIII,
      .nextIII {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: .3s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }

      .prevIII {
        
        &:active {
          opacity: 0;
          transform: translateX(-10px);
        }
      }

      .nextIII {
        
        &:active {
          opacity: 0;
          transform: translateX(10px);
        }
      }
      
      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;
        
        .carouselIII {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          transform: scale(1.1);
          transition: 1s ease;

          &:nth-of-type(1) {
            z-index: 3;
            opacity: 0;
          }

          &:nth-of-type(2) {
            z-index: 2;
            opacity: 0;
          }

          &:nth-of-type(3) {
            z-index: 1;
            opacity: 0;
          }

          &.now-img {
            transform: scale(1);
            opacity: 1 !important;
          }
        }
      }

      &.carousel-group-active {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  }

  &.product-show {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
<script lang="ts">
import { defineComponent, Ref, ref, onMounted, onBeforeUnmount } from 'vue'

interface PageStateType {
  carouselICount: Ref<number>,
  carouselImgsI: Ref<string[]>,
  carouselIICount: Ref<number>,
  carouselImgsII: Ref<string[]>,
  carouselIIICount: Ref<number>,
  carouselImgsIII: Ref<string[]>,
  productTypeIAnimate: Ref<boolean>,
  productTypeIIAnimate: Ref<boolean>,
  productTypeIIIAnimate: Ref<boolean>,
  isOffLoadPage: Ref<boolean>,
  scrollYVal: Ref<number>
}

interface MethodType {
  prevImg(type: 'I' | 'II' | 'III'): Promise<void>;
  nextImg(type: 'I' | 'II' | 'III'): Promise<void>;
  srcollBg(): void;
  scrollActionElements(target: HTMLDivElement, scrollsVal: number): void
}

export default defineComponent({
  setup(){
    
    const pageState: PageStateType = {
      carouselICount: ref(0),
      carouselImgsI: ref([
        `${import.meta.env.VITE_APP_BASE_URL}img/shirt.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/dress-1.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/dress.png`
      ]),
      carouselIICount: ref(0),
      carouselImgsII: ref([
        `${import.meta.env.VITE_APP_BASE_URL}img/ring.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/necklace.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/watch-1.png`
      ]),
      carouselIIICount: ref(0),
      carouselImgsIII: ref([
        `${import.meta.env.VITE_APP_BASE_URL}img/bag-1.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/bag-2.png`, 
        `${import.meta.env.VITE_APP_BASE_URL}img/bag-3.png`
      ]),
      productTypeIAnimate: ref(false),
      productTypeIIAnimate: ref(false),
      productTypeIIIAnimate: ref(false),
      isOffLoadPage: ref(false),
      scrollYVal: ref(0)
    }

    const method: MethodType = {
      scrollActionElements: (target, scrollsVal) => {
        if(pageState.isOffLoadPage.value) return

        const elementPos = target.offsetTop + target.offsetHeight / 2
        const isOverPos = elementPos < scrollsVal

        const action: Record<string, () => void> = {
          'product-typeI': () => {
            pageState.productTypeIAnimate.value = isOverPos;
          },
          'product-typeII': () => {
            pageState.productTypeIIAnimate.value = isOverPos;
          },
          'product-typeIII': () => {
            pageState.productTypeIIIAnimate.value = isOverPos;
          }
        }

        action[target.className]()
      },
      prevImg: async type => {

        const action: Record<'I' | 'II' | 'III',() => void> = {
          I: () => {
            pageState.carouselICount.value = 
              pageState.carouselICount.value < 1 ? 2 : 
              pageState.carouselICount.value - 1
          },
          II: () => {
            pageState.carouselIICount.value = 
              pageState.carouselIICount.value < 1 ? 2 : 
              pageState.carouselIICount.value - 1
          },
          III: () => {
            pageState.carouselIIICount.value = 
              pageState.carouselIIICount.value < 1 ? 2 :
              pageState.carouselIIICount.value - 1;
          }
        }

        action[type]()
      },
      nextImg: async type => {

        const action: Record<'I' | 'II' | 'III',() => void> = {
          I: () => {
            pageState.carouselICount.value = 
              pageState.carouselICount.value > 1 ? 0 : 
              pageState.carouselICount.value + 1
          },
          II: () => {
            pageState.carouselIICount.value =
              pageState.carouselIICount.value > 1 ? 0 : 
              pageState.carouselIICount.value + 1
          },
          III: () => {
            pageState.carouselIIICount.value =
              pageState.carouselIIICount.value > 1 ? 0 : 
              pageState.carouselIIICount.value + 1;
          }
        }

        action[type]()
      },
      srcollBg() {
        const screenScrollY = window.scrollY + window.innerHeight;

        pageState.scrollYVal.value = screenScrollY
      },
    }

    onMounted(() => {
      pageState.isOffLoadPage.value = false
      window.addEventListener("scroll", method.srcollBg);
    })

    onBeforeUnmount(() => {
      pageState.isOffLoadPage.value = true
      window.removeEventListener("scroll", method.srcollBg);
    })

    return { ...pageState, ...method }
  }
})
</script>