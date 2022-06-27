<template>
  <div>
    <div class="modal-alert">
      <div class="modal-alert-body">
        <div class="modal-alert-header">
          <span>提示訊息</span>
        </div>
        <div class="modal-alert-content">
          <span v-html="text"></span>
        </div>
        <div class="modal-alert-footer">
          <div class="cancel" @click="cancleEvent">取消</div>
          <div class="confirm" @click="confirmEvent">確定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modal from "../customPlugin/js/Modal.js";
export default {
  props: {
    text: {
      type: String,
    },
  },
  mounted() {
    setTimeout(() => this.modalPart(), 100);
  },
  methods: {
    modalPart() {
      modal.createModal("", "", ".modal-alert", ".modal-alert-body", "");
    },
    cancleEvent() {
      this.$emit("cancle");
    },
    confirmEvent() {
      this.$emit("confirm");
    },
  },
};
</script>