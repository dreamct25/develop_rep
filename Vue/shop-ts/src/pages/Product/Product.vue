<template lang="pug">
.row
  .col-md-12
    .img-swiper-frame
      .img-swiper-outer
        .img-show.img-1
          span.banner-text 本季最新穎各項服飾、飾品、包包
.product-group
    router-view(name="producttype")
    router-view(name="productlist")
</template>
<style lang="scss" scoped>
  .img-swiper-frame {
    width: 100%;
    min-height: 400px;

    .img-swiper-outer {
      overflow: hidden;

      .img-show {
        opacity: 0;
        transition: 1s ease;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: center;

        &.img-1 {
          background-image: url("https://unsplash.com/photos/GCAnKZM21_c/download?force=true&w=1920");
          background-repeat: no-repeat;
          background-position: center center;
          min-height: 400px;
          animation: getBig1 16s linear forwards;
          opacity: 1;

          @keyframes getBig1 {
            0%,
            100% {
              background-size: 100%;
            }

            50% {
              background-size: 130%;
            }
          }
        }

        &.img-2 {
          background-image: url("https://unsplash.com/photos/i2jbuqO0YfM/download?force=true&w=1920");
          background-repeat: no-repeat;
          background-position: center center;
          animation: getBig2 16s linear forwards;
          min-height: 400px;
          opacity: 1;

          @keyframes getBig2 {
            0%,
            100% {
              background-size: 100%;
            }

            50% {
              background-size: 130%;
            }
          }
        }

        &.img-3 {
          background-image: url("https://unsplash.com/photos/-SDgOlirIaY/download?force=true&w=1920");
          background-repeat: no-repeat;
          background-position: center center;
          animation: getBig3 16s linear forwards;
          min-height: 400px;
          opacity: 1;

          @keyframes getBig3 {
            0%,
            100% {
              background-size: 100%;
            }

            50% {
              background-size: 130%;
            }
          }
        }

        @media screen and (max-width: 414px) {
          &.img-1,
          &.img-2,
          &.img-3 {
            animation: none;
            background-size: cover;
          }
        }

        .banner-text {
          color: white;
          font-size: 30px;
          background-color: rgba(0, 0, 0, 0.5);
          box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
            0 0 2px 1px rgba(0, 0, 0, 0.7);
          border-radius: 10px;
          margin-bottom: 50px;
          padding: 10px 20px;

          @media screen and (max-width: 414px) {
            font-size: 18px;
          }
        }
      }
    }
  }

  .product-group {
    background-color: rgb(30, 30, 30);
    color: white;
    padding: 12px;
  }
</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(){}
})
</script>