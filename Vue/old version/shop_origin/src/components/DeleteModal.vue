<template>
  <div class="modal-delete">
    <div class="modal-delete-body">
      <div class="modal-customer-header">
        <span class="modal-customer-title">{{ obj.modalTitle }}</span>
      </div>
      <div class="modal-customer-content">
        <span class="delete-text">{{ obj.modalContent }}</span>
      </div>
      <div class="modal-customer-footer">
        <div class="cancel-delete" @click="postCancle">取消</div>
        <div class="confirm-delete" @click="postConfirm">確定</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.modal-delete {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.7);
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
  }

  /* 彈出視窗本體架構淡入淡出動畫 */

  .modal-delete-body-toggle {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
    transition: 0.5s ease;
  }

  /* 彈出視窗本體內部架構 */

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
.modal-delete-toggle {
  opacity: 1;
}
</style>
<script>
export default {
  name: "DeleteModal",
  props: {
    obj: {
      type: Object,
    },
  },
  methods: {
    postCancle() {
      this.$emit("cancle");
    },
    postConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>