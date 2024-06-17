<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src class="d-block w-100 img-1" alt />
        </div>
        <div class="carousel-item">
          <img src class="d-block w-100 img-2" alt />
        </div>
        <div class="carousel-item">
          <img src class="d-block w-100 img-3" alt />
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="product-type-outer">
      <div class="product-typeI">
        <div class="border-helfI"></div>
        <div class="product-mainI">
          <div class="row">
            <div class="col-md-6">
              <div class="row justify-content-center">
                <div
                  class="product-text"
                  :class="{ 'product-text-active': productTextIAnimate }"
                >
                  <span>服飾風格</span>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nihil deserunt corrupti perspiciatis, alias tempora,
                    dignissimos hic quidem iure tenetur quas, voluptas earum
                    aperiam consequuntur voluptatibus fugit tempore neque maxime
                    saepe.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="carousel-group"
                :class="{ 'carousel-group-active': carouselIAnimate }"
              >
                <i class="far fa-chevron-left fa-2x prev" @click="prevImg"></i>
                <div class="carousel-outer">
                  <img class="carouselI now-img" :src="carouselImgIFt" alt />
                  <img class="carouselI" :src="carouselImgISd" alt />
                  <img class="carouselI" :src="carouselImgITd" alt />
                </div>
                <i class="far fa-chevron-right fa-2x next" @click="nextImg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-typeII">
        <div class="border-helfII"></div>
        <div class="product-mainII">
          <div class="row">
            <div class="col-md-6">
              <div
                class="carousel-group"
                :class="{ 'carousel-group-active': carouselIIAnimate }"
              >
                <i
                  class="far fa-chevron-left fa-2x prevII"
                  @click="prevImg"
                ></i>
                <div class="carousel-outer">
                  <img class="carouselII now-img" :src="carouselImgIIFt" alt />
                  <img class="carouselII" :src="carouselImgIISd" alt />
                  <img class="carouselII" :src="carouselImgIITd" alt />
                </div>
                <i
                  class="far fa-chevron-right fa-2x nextII"
                  @click="nextImg"
                ></i>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row justify-content-center">
                <div
                  class="product-text"
                  :class="{ 'product-text-active': productTextIIAnimate }"
                >
                  <span>飾品設計</span>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Perferendis quam tempora id accusamus blanditiis non
                    praesentium temporibus debitis eum maiores! Deleniti
                    voluptate soluta eum molestias, possimus dignissimos earum
                    similique. Deleniti!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-typeIII">
        <div class="border-helfIII"></div>
        <div class="product-mainIII">
          <div class="row">
            <div class="col-md-6">
              <div class="row justify-content-center">
                <div
                  class="product-text"
                  :class="{ 'product-text-active': productTextIIIAnimate }"
                >
                  <span>潮流包包</span>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Perferendis quam tempora id accusamus blanditiis non
                    praesentium temporibus debitis eum maiores! Deleniti
                    voluptate soluta eum molestias, possimus dignissimos earum
                    similique. Deleniti!
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="carousel-group"
                :class="{ 'carousel-group-active': carouselIIIAnimate }"
              >
                <i
                  class="far fa-chevron-left fa-2x prevIII"
                  @click="prevImg"
                ></i>
                <div class="carousel-outer">
                  <img
                    class="carouselIII now-img"
                    :src="carouselImgIIIFt"
                    alt
                  />
                  <img class="carouselIII" :src="carouselImgIIISd" alt />
                  <img class="carouselIII" :src="carouselImgIIITd" alt />
                </div>
                <i
                  class="far fa-chevron-right fa-2x nextIII"
                  @click="nextImg"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.img-1 {
  background-image: url("https://unsplash.com/photos/GCAnKZM21_c/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 550px;
}
.img-2 {
  background-image: url("https://unsplash.com/photos/i2jbuqO0YfM/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 550px;
}
.img-3 {
  background-image: url("https://unsplash.com/photos/-SDgOlirIaY/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 550px;
}
.product-type-outer {
  background-image: url("https://unsplash.com/photos/jAdtyxPDmvU/download?force=true&w=1920");
  background-repeat: no-repeat;
  background-size: cover;
  .product-typeI {
    position: relative;
    text-align: center;
    overflow: hidden;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
    .border-helfI {
      position: absolute;
      top: -5%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(20deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
    }
    @media screen and (max-width: 414px) {
      .border-helfI {
        display: none;
      }
    }
    .product-text {
      color: white;
      padding: 20px 30px 20px 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(-60px);
      transition: 0.7s ease;
      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }
    }
    .product-text-active {
      opacity: 1;
      transform: translateX(0px);
    }
    .carousel-group {
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(60px);
      transition: 0.7s ease;
      .prev,
      .next {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: 0.5s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }
      .prev-active {
        opacity: 0;
        transform: translateX(-10px);
      }
      .next-active {
        opacity: 0;
        transform: translateX(10px);
      }
      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;
        .carouselI {
          width: 100%;
          transition: 1s ease;
        }
        .carousel-prev {
          transform: translateX(-5px);
        }
        .carousel-next {
          transform: translateX(5px);
        }
        .now-img {
          transform: translateX(0px);
          opacity: 1 !important;
        }
        .carouselI:nth-of-type(1) {
          position: absolute;
          top: 0%;
          left: 0;
          right: 0;
          z-index: 3;
          opacity: 0;
        }
        .carouselI:nth-of-type(2) {
          position: absolute;
          top: -40%;
          left: 0;
          right: 0;
          z-index: 2;
          opacity: 0;
        }
        .carouselI:nth-of-type(3) {
          position: absolute;
          top: -30%;
          left: 0;
          right: 0;
          z-index: 1;
          opacity: 0;
        }
      }
    }
    .carousel-group-active {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  .product-typeII {
    position: relative;
    text-align: center;
    overflow: hidden;
    padding: 20px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
    .border-helfII {
      position: absolute;
      top: -5%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(-20deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
    }
    @media screen and (max-width: 414px) {
      .border-helfII {
        display: none;
      }
    }
    .product-text {
      color: white;
      padding: 20px 30px 20px 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(60px);
      transition: 0.7s ease;
      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }
    }
    .product-text-active {
      opacity: 1;
      transform: translateX(0px);
    }
    .carousel-group {
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(-60px);
      transition: 0.7s ease;
      .prevII,
      .nextII {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: 0.5s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }
      .prevII-active {
        opacity: 0;
        transform: translateX(-10px);
      }
      .nextII-active {
        opacity: 0;
        transform: translateX(10px);
      }
      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;
        .carouselII {
          width: 100%;
          transition: 1s ease;
        }
        .carousel-prev {
          transform: translateX(-5px);
        }
        .carousel-next {
          transform: translateX(5px);
        }
        .now-img {
          transform: translateX(0px);
          opacity: 1 !important;
        }
        .carouselII:nth-of-type(1) {
          position: absolute;
          top: 0%;
          left: 0;
          right: 0;
          z-index: 3;
          opacity: 0;
        }
        .carouselII:nth-of-type(2) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2;
          opacity: 0;
        }
        .carouselII:nth-of-type(3) {
          position: absolute;
          top: -33%;
          left: 0;
          right: 0;
          z-index: 1;
          opacity: 0;
        }
      }
    }
    .carousel-group-active {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  .product-typeIII {
    position: relative;
    text-align: center;
    overflow: hidden;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.7);
    .border-helfIII {
      position: absolute;
      top: -5%;
      right: 50%;
      width: 3px;
      height: 295px;
      background-color: rgba(255, 255, 255, 0.7);
      transform: rotate(20deg);
      filter: blur(1px);
      box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
    }
    @media screen and (max-width: 414px) {
      .border-helfIII {
        display: none;
      }
    }
    .product-text {
      color: white;
      padding: 20px 30px 20px 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      opacity: 0;
      transform: translateX(-60px);
      transition: 0.7s ease;
      span {
        display: block;
        margin-bottom: 5px;
        font-size: 25px;
      }
    }
    .product-text-active {
      opacity: 1;
      transform: translateX(0px);
    }
    .carousel-group {
      display: flex;
      justify-content: space-around;
      padding: 40px;
      opacity: 0;
      transform: translateX(60px);
      transition: 0.7s ease;
      .prevIII,
      .nextIII {
        display: block;
        margin-top: 55px;
        cursor: pointer;
        user-select: none;
        opacity: 1;
        transition: 0.5s ease;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }
      .prevIII-active {
        opacity: 0;
        transform: translateX(-10px);
      }
      .nextIII-active {
        opacity: 0;
        transform: translateX(10px);
      }
      .carousel-outer {
        position: relative;
        width: 150px;
        height: 150px;
        .carouselIII {
          width: 100%;
          transition: 1s ease;
        }
        .carousel-prev {
          transform: translateX(-5px);
        }
        .carousel-next {
          transform: translateX(5px);
        }
        .now-img {
          transform: translateX(0px);
          opacity: 1 !important;
        }
        .carouselIII:nth-of-type(1) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          opacity: 0;
        }
        .carouselIII:nth-of-type(2) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2;
          opacity: 0;
        }
        .carouselIII:nth-of-type(3) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1;
          opacity: 0;
        }
      }
    }
    .carousel-group-active {
      opacity: 1;
      transform: translateX(0px);
    }
  }
}
.product-show {
  opacity: 1;
  transform: translateX(0px);
}
</style>
<script>
import carouselImgIFt from "../assets/shirt.png";
import carouselImgISd from "../assets/dress-1.png";
import carouselImgITd from "../assets/dress.png";
import carouselImgIIFt from "../assets/ring.png";
import carouselImgIISd from "../assets/necklace.png";
import carouselImgIITd from "../assets/watch-1.png";
import carouselImgIIIFt from "../assets/bag-1.png";
import carouselImgIIISd from "../assets/bag-2.png";
import carouselImgIIITd from "../assets/bag-3.png";
export default {
  data() {
    return {
      carouselI: 0,
      carouselICount: 1,
      carouselImgIFt: carouselImgIFt,
      carouselImgISd: carouselImgISd,
      carouselImgITd: carouselImgITd,
      carouselII: 0,
      carouselIICount: 1,
      carouselImgIIFt: carouselImgIIFt,
      carouselImgIISd: carouselImgIISd,
      carouselImgIITd: carouselImgIITd,
      carouselIII: 0,
      carouselIIICount: 1,
      carouselImgIIIFt: carouselImgIIIFt,
      carouselImgIIISd: carouselImgIIISd,
      carouselImgIIITd: carouselImgIIITd,
      productTextIAnimate: false,
      productTextIIAnimate: false,
      productTextIIIAnimate: false,
      carouselIAnimate: false,
      carouselIIAnimate: false,
      carouselIIIAnimate: false,
    };
  },
  mounted() {
    document
      .querySelectorAll(".carouselI")
      .forEach((key) => key.setAttribute("data-num", (this.carouselI += 1)));
    document
      .querySelectorAll(".carouselII")
      .forEach((key) => key.setAttribute("data-num", (this.carouselII += 1)));
    document
      .querySelectorAll(".carouselIII")
      .forEach((key) => key.setAttribute("data-num", (this.carouselIII += 1)));
  },
  methods: {
    switchControl(swithTemp) {
      document
        .querySelector(`.${swithTemp}`)
        .classList.add(`${swithTemp}-active`);
      setTimeout(
        () =>
          document
            .querySelector(`.${swithTemp}`)
            .classList.remove(`${swithTemp}-active`),
        500
      );
    },
    prevClassCenter(carouselTemp, countTemp) {
      document.querySelectorAll(`${carouselTemp}`).forEach((key) => {
        key.classList.add("carousel-prev");
        key.classList.remove("carousel-next");
        key.dataset.num == countTemp
          ? key.classList.add("now-img")
          : key.classList.remove("now-img");
      });
    },
    prevImg(e) {
      let swithTemp = e.target.classList[3];
      let carouselTemp = "";
      let countTemp = 0;
      switch (e.target.classList[3]) {
        case "prev":
          this.carouselICount < 2
            ? (this.carouselICount = 3)
            : (this.carouselICount -= 1);
          carouselTemp = ".carouselI";
          countTemp = this.carouselICount;
          this.prevClassCenter(carouselTemp, countTemp);
          break;
        case "prevII":
          this.carouselIICount < 2
            ? (this.carouselIICount = 3)
            : (this.carouselIICount -= 1);
          carouselTemp = ".carouselII";
          countTemp = this.carouselIICount;
          this.prevClassCenter(carouselTemp, countTemp);
          break;
        case "prevIII":
          this.carouselIIICount < 2
            ? (this.carouselIIICount = 3)
            : (this.carouselIIICount -= 1);
          carouselTemp = ".carouselIII";
          countTemp = this.carouselIIICount;
          this.prevClassCenter(carouselTemp, countTemp);
          break;
      }
      this.switchControl(swithTemp);
    },
    nextClassCenter(carouselTemp, countTemp) {
      document.querySelectorAll(`${carouselTemp}`).forEach((key) => {
        key.classList.remove("carousel-prev");
        key.classList.add("carousel-next");
        key.dataset.num == countTemp
          ? key.classList.add("now-img")
          : key.classList.remove("now-img");
      });
    },
    nextImg(e) {
      let swithTemp = e.target.classList[3];
      let carouselTemp = "";
      let countTemp = 0;
      switch (e.target.classList[3]) {
        case "next":
          this.carouselICount > 2
            ? (this.carouselICount = 1)
            : (this.carouselICount += 1);
          carouselTemp = ".carouselI";
          countTemp = this.carouselICount;
          this.nextClassCenter(carouselTemp, countTemp);
          break;
        case "nextII":
          this.carouselIICount > 2
            ? (this.carouselIICount = 1)
            : (this.carouselIICount += 1);
          carouselTemp = ".carouselII";
          countTemp = this.carouselIICount;
          this.nextClassCenter(carouselTemp, countTemp);
          break;
        case "nextIII":
          this.carouselIIICount > 2
            ? (this.carouselIIICount = 1)
            : (this.carouselIIICount += 1);
          carouselTemp = ".carouselIII";
          countTemp = this.carouselIIICount;
          this.nextClassCenter(carouselTemp, countTemp);
          break;
        default:
          this.switchControl(swithTemp);
          break;
      }
    },
    srcollBg() {
      const productAnimateItem = [
        {
          typeClassName: ".product-typeI",
        },
        {
          typeClassName: ".product-typeII",
        },
        {
          typeClassName: ".product-typeIII",
        },
      ];
      const screenScrollY = window.scrollY + window.innerHeight;
      productAnimateItem.forEach((key) => {
        let productType = document.querySelector(`${key.typeClassName}`);
        let productMainY = productType.offsetTop + productType.offsetHeight / 2;
        if (productMainY < screenScrollY) {
          if (key.typeClassName == ".product-typeI") {
            this.productTextIAnimate = true;
            this.carouselIAnimate = true;
          } else if (key.typeClassName == ".product-typeII") {
            this.productTextIIAnimate = true;
            this.carouselIIAnimate = true;
          } else if (key.typeClassName == ".product-typeIII") {
            this.productTextIIIAnimate = true;
            this.carouselIIIAnimate = true;
          }
        } else {
          if (key.typeClassName == ".product-typeI") {
            this.productTextIAnimate = false;
            this.carouselIAnimate = false;
          } else if (key.typeClassName == ".product-typeII") {
            this.productTextIIAnimate = false;
            this.carouselIIAnimate = false;
          } else if (key.typeClassName == ".product-typeIII") {
            this.productTextIIIAnimate = false;
            this.carouselIIIAnimate = false;
          }
        }
      });
    },
  },
  created() {
    window.addEventListener("scroll", this.srcollBg);
  },
  destroyed() {
    window.removeEventListener("scroll", this.srcollBg);
  },
};
</script>