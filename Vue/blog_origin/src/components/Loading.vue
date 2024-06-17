<template>
  <div class="page-for-loading">
    <div class="loading-frame">
      <div class="loading-outer">
        <div class="loading-icon"></div>
      </div>
      <span class="loading-text">讀取中</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-for-loading {
  opacity: 0;
  transform: scale(0.1);
  transition: 1s ease;
  .loading-frame {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    .loading-outer {
      animation: loading linear 1s infinite;
      .loading-icon {
        width: 98px;
        height: 98px;
        border-radius: 50%;
        border-top: 5px solid rgba(255, 255, 255, 0.8);
        border-right: 5px solid rgba(255, 255, 255, 0.77);
        border-bottom: 5px solid rgba(255, 255, 255, 0.75);
        border-left: 5px solid rgba(0, 47, 255, 0.7);
        box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.7),
          0 0 2px 0 rgba(0, 0, 0, 0.7);
      }
    }
    @keyframes loading {
      100% {
        transform: rotate(360deg);
      }
    }
    .loading-text {
      display: block;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      color: rgb(0, 0, 0);
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
      margin: 20px 0 20px 0;
    }
  }
}
.page-for-loading-active {
  opacity: 1;
  transform: scale(1);
}
</style>
<script>
export default {
  mounted() {
    setTimeout(
      () =>
        document
          .querySelector(".page-for-loading")
          .classList.add("page-for-loading-active"),
      500
    );
  },
};
</script>