<template>
  <div>
    <div class="modal-message">
      <div class="modal-message-body">
        <div class="modal-message-header">
          <span>提示訊息</span>
        </div>
        <div class="modal-message-content">
          <span>{{ text }}</span>
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
      modal.createModal("", "", ".modal-message", ".modal-message-body", "");
    },
  },
};
</script>