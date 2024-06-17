<template>
  <div class="modalC">
    <div class="modalC-body">
      <div class="modalC-header">
        <span>提示訊息</span>
      </div>
      <div class="modalC-content" v-html="inner"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modalC {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.7);
  .modalC-body {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid black;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    background: white;
    border-radius: 10px;
    margin: 2% auto;
    min-width: 350px;
    opacity: 0;
    transform: translate(-50%, -100%) scale(0.1);
    transition: 0.5s ease;
  }

  /* 彈出視窗本體架構淡入淡出動畫 */

  .modalC-body-toggle {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
    transition: 0.5s ease;
  }

  /* 彈出視窗本體內部架構 */

  .modalC-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 0px 10px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    span {
      display: block;
      font-size: 20px;
    }
  }

  .modalC-content {
    padding: 20px 50px 20px 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 2em;
    .count-text {
      display: flex;
      .count-down {
        display: block;
        margin: 0 5px 0 5px;
      }
    }
  }
}
.modalC-toggle {
  opacity: 1;
}
</style>
<script>
export default {
  name: "AlertModal",
  props: {
    inner: {
      type: String,
    },
  },
};
</script>