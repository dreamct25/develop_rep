<template>
  <div>
    <div class="navs" :class="{ 'navs-active': navAnimate }">
      <div class="circle-outer">
        <div class="circle"></div>
      </div>
      <div
        v-for="(item, index) in routeArray"
        :key="index"
        class="lists"
        @mousemove="circleAnimateS"
        @mouseleave="circleAnimateE"
        @click="goPage"
        :data-num="index"
      >
        {{ item.routeText }}
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.navs {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  opacity: 0;
  transform: scale(0.1);
  transition: 1s ease;
  position: relative;
  .circle-outer {
    position: absolute;
    overflow: hidden;
    padding: 5px;
    .circle {
      width: 350px;
      height: 350px;
      border-radius: 50%;
      box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
        0 0 1px 1px rgba(255, 255, 255, 0.7);
      border: 15px solid transparent;
      border-top-color: rgba(0, 102, 255, 0.5);
      transition: 1s ease;
    }
    .circle-light {
      border-top-color: rgba(0, 102, 255, 1);
      box-shadow: inset 0 0 8px 1px rgba(255, 255, 255, 0.7),
        0 0 7px 1px rgba(255, 255, 255, 0.7);
    }
  }
  .lists {
    position: absolute;
    transform: scale(1);
    transition: 0.7s ease;
    color: white;
    background-color: rgb(0, 102, 255);
    padding: 5px 30px 5px 30px;
    border-radius: 20px;
    cursor: pointer;
    user-select: none;
  }
  .lists:nth-of-type(2) {
    top: 43%;
    right: 50%;
    transform: translate(-10%, 0);
  }
  .lists:nth-of-type(2):hover {
    transform: translate(-10%, -10%) scale(1.05);
  }
  .lists:nth-of-type(3) {
    bottom: 40%;
    right: 50%;
    transform: translate(50%, 0);
  }
  .lists:nth-of-type(3):hover {
    transform: translate(50%, -10%) scale(1.05);
  }
  .lists:nth-of-type(4) {
    top: 43%;
    left: 50%;
    transform: translate(10%, 0);
  }
  .lists:nth-of-type(4):hover {
    transform: translate(10%, -10%) scale(1.05);
  }
}
.navs-active {
  opacity: 1;
  transform: scale(1);
}
@media screen and (max-width: 414px) {
  .navs {
    min-height: 75vh;
  }
}
</style>
<script>
export default {
  data() {
    return {
      navAnimate: false,
      animateTarget: [
        {
          nodeNum: 0,
          nodeDeg: -70,
        },
        {
          nodeNum: 1,
          nodeDeg: 180,
        },
        {
          nodeNum: 2,
          nodeDeg: 70,
        },
      ],
      routeArray: [
        {
          routeNum: 0,
          routeName: "/fortune",
          routeText: "星座運勢",
        },
        {
          routeNum: 1,
          routeName: "/match",
          routeText: "契合度",
        },
        {
          routeNum: 2,
          routeName: "/explain",
          routeText: "星座簡介",
        },
      ],
    };
  },
  methods: {
    circleAnimateS(e) {
      this.animateTarget.forEach((key) => {
        if (key.nodeNum == e.target.dataset.num) {
          document.querySelector(
            ".circle"
          ).style.transform = `rotate(${key.nodeDeg}deg)`;
          document.querySelector(".circle").classList.add("circle-light");
        }
      });
    },
    circleAnimateE() {
      document.querySelector(".circle").style.transform = `rotate(360deg)`;
      document.querySelector(".circle").classList.remove("circle-light");
    },
    goPage(e) {
      this.routeArray.forEach((key) => {
        if (key.routeNum == e.target.dataset.num) {
          if (window.innerWidth <= 414) {
            setTimeout(() => {
              this.$parent.rwdMod = true;
              setTimeout(() => (this.navAnimate = false), 701);
              setTimeout(() => (this.$parent.rwdModAfter = true), 1402);
              setTimeout(
                () => this.$router.push(key.routeName, () => {}),
                1403
              );
            }, 700);
          } else {
            this.navAnimate = false;
            setTimeout(() => this.$router.push(key.routeName, () => {}), 701);
          }
        }
      });
    },
  },
  created() {
    console.log(this);
    setTimeout(() => (this.navAnimate = true), 300);
  },
};
</script>