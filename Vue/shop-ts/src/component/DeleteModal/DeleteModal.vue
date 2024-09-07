<template lang="pug">
.modal-delete(:class="{ 'modal-delete-toggle': obj.toggleModalStatus }")
  .modal-delete-body
    .modal-customer-header
        span.modal-customer-title {{ obj.modalTitle }}
    .modal-customer-content
        span.delete-text {{ obj.modalContent }}
    .modal-customer-footer
      .cancel-delete(@click="postCancle") 取消
      .confirm-delete(@click="postConfirm") 確定
</template>
<style lang="scss" scoped>
  .modal-delete {
    position: fixed;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: 0.5s ease;
    
    .modal-delete-body {
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

      .modal-customer-header {
        display: flex;
        justify-content: space-between;
        padding: 7px 0 5px 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        span {
          display: block;
          font-size: 20px;
        }
      }

      .modal-customer-content {
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

      .modal-customer-footer {
        display: flex;
        justify-content: space-around;
        border-radius: 0 0 5px 5px;
        overflow: hidden;
        border-top: 0.1px solid rgba(0, 0, 0, 0.3);
        
        .cancel-delete,
        .confirm-delete {
          width: 100%;
          padding: 5px 0 5px 0;
          text-align: center;
          cursor: pointer;
          transition: 0.5s ease;
          user-select: none;
        }

        .cancel-delete {
          box-shadow: inset -1px 0 0 0 rgba(0, 0, 0, 0.3);
        }

        .confirm-delete {
          box-shadow: inset 1px 0 0 0 rgba(0, 0, 0, 0.3);
        }

        .cancel-delete:hover {
          color: white;
          background-color: rgba(255, 0, 0, 7);
          box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
        }

        .confirm-delete:hover {
          color: white;
          background-color: rgb(0, 162, 255);
          box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
        }
      }
    }

    &.modal-delete-toggle {
      opacity: 1;
      z-index: 35;

      .modal-delete-body{
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }
</style>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: 'DeleteModal',
  props:['obj'],
  setup(props:{ 
    obj: { toggleModalStatus: boolean, modalTitle:string, modalContent: string } 
  },{ emit }){

    const method: {
      postCancle():void,
      postConfirm():void
    } = {
      postCancle() {
        emit("cancle");
      },
      postConfirm() {
        emit("confirm");
      },
    }

    return { ...method, ...toRefs(props) }
  }
})
</script>