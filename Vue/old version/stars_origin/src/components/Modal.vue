<template>
  <div class="modalC">
    <div class="modalC-body">
      <div class="modalC-header">
        <span>提示訊息</span>
      </div>
      <div class="modalC-content">
        <p>{{ str }}</p>
      </div>
      <div class="modalC-footer">
        <div class="confirm" @click="postClose">確定</div>
      </div>
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
  background-color: rgba(0, 0, 0, 0.7);
  .modalC-body {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid black;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    background-color: white;
    border-radius: 10px;
    min-width: 400px;
    overflow: hidden;
    opacity: 0.5;
    transform: translate(-50%, -70%) rotateX(50deg) translateZ(100px);
    transition: 0.5s ease;
    .modalC-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 10px 10px 5px 10px;
      border-bottom: 1px solid black;
      span {
        display: block;
        font-size: 20px;
      }
    }
    .modalC-content {
      padding: 25px 0 25px 0;
      text-align: center;
      p {
        margin: unset;
        font-size: 20px;
      }
    }

    .modalC-footer {
      display: flex;
      justify-content: center;
      border-top: 1px solid black;
      .confirm {
        background-color: rgb(0, 162, 255);
        width: 100%;
        padding: 5px;
        color: white;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .modalC-body-toggle {
    opacity: 1;
    transform: translate(-50%, -50%) rotateX(0deg) translateZ(1px);
    transition: 0.5s ease;
  }
  @media screen and (max-width: 414px) {
    .modalC-body {
      min-width: 95%;
    }
  }
}

.modalC-toggle {
  opacity: 1;
}
</style>
<script>
export default {
  name: "Modal",
  props: {
    str: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    postClose() {
      this.$emit("close");
    },
  },
};
</script>