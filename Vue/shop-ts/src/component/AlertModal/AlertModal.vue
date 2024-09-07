<template lang="pug">
.modalC(:class="{ 'modalC-toggle': toggleAlertModalStatus }")
  .modalC-body()
    .modalC-header
      span 提示訊息
    .modalC-content
      slot(name="modal-content")
</template>
<style lang="scss" scoped>
  .modalC {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: 0.5s ease;

    .modalC-body {
      position: absolute;
      top: 50%;
      left: 50%;
      border: 1px solid black;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
      background: white;
      border-radius: 10px;
      width: 100%;
      max-width: 300px;
      opacity: 0;
      transform: translate(-50%, -100%) scale(0.1);
      transition: 0.5s ease;
    }

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
      padding: 20px 50px;
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

    &.modalC-toggle {
      z-index: 35;
      opacity: 1;

      .modalC-body {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  props:['toggleAlertModalStatus'],
  setup(props:{ toggleAlertModalStatus: boolean }){
    
    return { ...toRefs(props) }
  }
})
</script>