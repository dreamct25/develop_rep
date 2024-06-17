<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-end">
        <div class="add-coupon-btn" @click="showModal">新增優惠券</div>
      </div>
      <div class="table-outer">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">優惠券名稱</th>
              <th scope="col">優惠券代碼</th>
              <th scope="col">折扣百分比</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">新增日期</th>
              <th scope="col">啟用日期</th>
              <th scope="col">停用日期</th>
              <th scope="col">修改 / 刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="cpLocation.length == 0">
              <td colspan="8" class="empty-data">{{ stateText }}</td>
            </tr>
            <tr v-for="(items, index) in cpLocation" :key="index">
              <td>{{ items.CPName }}</td>
              <td>{{ items.CPCode }}</td>
              <td>{{ items.CPPercent }} %</td>
              <td>
                <span v-if="items.CPState == false">已停用</span>
                <span v-else>已啟用</span>
              </td>
              <td>
                {{
                  new Date(items.CPCreateDate)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, " / ")
                }}
              </td>
              <td v-if="items.CPEnableDate == null">停用中</td>
              <td v-else>
                {{
                  new Date(items.CPEnableDate)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, " / ")
                }}
              </td>
              <td v-if="items.CPDisableDate == null">使用中</td>
              <td v-else>
                {{
                  new Date(items.CPDisableDate)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, " / ")
                }}
              </td>
              <td>
                <div class="choose-group">
                  <span
                    class="modify"
                    @click="showModal(items.CPID, (modify = true))"
                    >修改</span
                  >/
                  <span class="deleted" @click="showDeleteModal(items.CPID)"
                    >刪除</span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="cpLocation.length != 0"
        :pageItem="pagination"
        v-on:prev="getCoupon"
        v-on:current="getCoupon"
        v-on:next="getCoupon"
      />
      <div class="modal-add">
        <div class="modal-add-body">
          <div class="modal-add-header">
            <span class="modal-add-title" v-text="modalTitle"></span>
          </div>
          <div class="modal-add-content">
            <div class="coupon-name-group mb-3">
              <label for="coupon-name">優惠券名稱</label>
              <input id="coupon-name" type="text" v-model="couponName" />
            </div>
            <div class="row my-3">
              <div class="col-md-12">
                <div class="create-coupon-code-group">
                  <label>優惠券代碼</label>
                  <div class="create-coupon-code" @click="createCouponCode">
                    生成隨機優惠券代碼
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <input
                  class="code-block"
                  type="text"
                  placeholder="- - 請點擊右上方生成隨機優惠券代碼 - -"
                  readonly
                  v-model="couponCode"
                />
              </div>
            </div>
            <div class="row my-3">
              <div class="col-md-6">
                <label for="coupon-percent">折扣百分比 ( % )</label>
                <input
                  id="coupon-percent"
                  type="number"
                  v-model="couponPercent"
                />
              </div>
              <div class="col-md-6">
                <label for="coupon-status">啟用狀態</label>
                <select id="coupon-status" v-model="couponStatus">
                  <option :value="false">未啟用</option>
                  <option :value="true">啟用</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-add-footer">
            <div class="cancel">取消</div>
            <div
              class="confirm"
              v-text="modalConfirmName"
              @click="submitCode"
            ></div>
          </div>
        </div>
      </div>
      <DeleteModal
        :obj="modalDeletedObj"
        v-on:cancle="closeDeleteModal"
        v-on:confirm="deleteCoupon"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.add-coupon-btn {
  color: white;
  background-color: rgb(4, 142, 255);
  box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
  padding: 5px 15px 5px 15px;
  border-radius: 10px;
  font-size: 18px;
  margin: 20px 10px 20px 0;
  cursor: pointer;
  user-select: none;
}
.table-outer {
  .table {
    color: white;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
    margin-bottom: 0;
    thead {
      tr {
        th {
          border-top: none;
          text-align: center;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          .choose-group {
            display: flex;
            justify-content: center;
            .modify {
              display: block;
              background-color: rgba(140, 0, 255, 0.7);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 4px 1px rgba(0, 0, 0, 0.3);
              padding: 3px 10px 3px 10px;
              margin: 0 10px 0 10px;
              border-radius: 5px;
              color: white;
              cursor: pointer;
              user-select: none;
            }
            .deleted {
              display: block;
              background-color: rgba(255, 0, 0, 0.7);
              box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7),
                0 0 4px 1px rgba(0, 0, 0, 0.3);
              padding: 3px 10px 3px 10px;
              margin: 0 10px 0 10px;
              border-radius: 5px;
              color: white;
              cursor: pointer;
              user-select: none;
            }
          }
        }
        .empty-data {
          font-size: 20px;
        }
      }
    }
  }
}
@media screen and (max-width: 414px) {
  .table-outer {
    overflow-x: scroll;
    table {
      width: 1090px;
    }
  }
}
.modal-add {
  display: none;
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-add-body {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 1px solid black;
    box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
      0 0 3px 1px rgba(0, 0, 0, 0.7);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    margin: 2% auto;
    max-width: 500px;
    opacity: 0;
    transform: translate(-50%, -54%) scale(0.1);
    transition: 0.5s ease;
    .modal-add-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 15px 10px 15px;
      border-bottom: 0.1px solid rgba(255, 255, 255, 0.7);
      .modal-add-title {
        display: block;
        margin-top: 0px;
        margin-bottom: 0px;
        font-size: 25px;
        font-weight: bold;
      }
    }

    .modal-add-content {
      .delete-text {
        display: block;
        padding: 60px 50px 60px 50px;
        font-size: 20px;
      }
      padding: 15px;
      label {
        display: block;
      }
      input[type="text"],
      input[type="number"],
      select {
        width: 100%;
        outline: none;
        border-radius: 15px;
        border: none;
        box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
        transition: 1s ease;
      }
      input[type="text"]:focus,
      input[type="number"]:focus,
      select:focus {
        box-shadow: inset 0 0 2px 1px rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
      }
      .create-coupon-code-group {
        display: flex;
        justify-content: space-between;
        label {
          margin-bottom: 0;
        }
        .create-coupon-code {
          padding: 2px 10px 2px 10px;
          border-radius: 5px;
          box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.7),
            0 0 3px 1px rgba(255, 255, 255, 0.7);
          cursor: pointer;
          user-select: none;
        }
      }
      .code-block[type="text"] {
        margin-top: 10px;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
      }
    }
    .modal-add-footer {
      display: flex;
      justify-content: flex-end;
      border-top: 0.1px solid rgba(255, 255, 255, 0.7);
      padding: 10px 0px 10px 5px;
    }

    .cancel,
    .confirm {
      margin-right: 10px;
      padding: 3px 15px 3px 15px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.5s ease;
      user-select: none;
      box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }

    .cancel:hover {
      background-color: rgba(255, 0, 0, 7);
      transform: scale(1.05);
      box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }

    .confirm:hover {
      background-color: rgba(0, 162, 255, 0.7);
      transform: scale(1.05);
      box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.7),
        0 0 3px 1px rgba(255, 255, 255, 0.7);
    }
  }

  /* 彈出視窗本體架構淡入淡出動畫 */

  .modal-add-body-toggle {
    opacity: 1;
    transform: translate(-50%, -54%) scale(1);
    transition: 0.5s ease;
  }
}
.modal-add-toggle {
  opacity: 1;
}
</style>
<script>
import DeleteModal from "../DeleteModal.vue";
import Pagination from "../DashChild/Pagination.vue";
export default {
  data() {
    return {
      cpLocation: [],
      cpLocationTemp: [],
      couponName: "",
      couponCode: "",
      couponPercent: "",
      couponStatus: false,
      couponCodeHash: [],
      couponNameEmpty: true,
      couponCodeEmpty: true,
      couponPercentEmpty: true,
      couponFinalCheck: [],
      submitPass: false,
      modifyCurrentIndex: 0,
      modalConfirmName: "",
      modalTitle: "",
      modalName: "",
      modalBody: "",
      modalCancle: "",
      deleteName: "",
      modalDeletedObj: {
        modalTitle: "",
        modalContent: "",
      },
      stateText: "",
      pagination: {},
    };
  },
  components: {
    DeleteModal,
    Pagination,
  },
  watch: {
    couponPercent(val) {
      if (val >= 100) this.couponPercent = 100;
    },
  },
  methods: {
    renderHashCouponCode() {
      for (let x = 0; x <= 9; x++) {
        this.couponCodeHash.push(x);
      }
      for (let y = 0; y <= 25; y++) {
        this.couponCodeHash.push(String.fromCharCode(65 + y));
      }
    },
    paginationPart(pages) {
      this.pagination.totalLength = this.cpLocation.length;

      this.pagination.partPage = 10;
      this.pagination.pageTotal = Math.ceil(
        this.pagination.totalLength / this.pagination.partPage
      );
      pages == undefined ? (pages = 1) : pages;
      this.pagination.currentPage = pages;
      this.pagination.hasPage = this.pagination.currentPage > 1;
      this.pagination.hasNext =
        this.pagination.currentPage < this.pagination.totalLength;
      if (this.pagination.currentPage == this.pagination.pageTotal)
        this.pagination.hasNext = false;
      if (this.pagination.currentPage > this.pagination.pageTotal)
        this.pagination.currentPage = this.pagination.pageTotal;

      const minPage =
        this.pagination.currentPage * this.pagination.partPage -
        this.pagination.partPage +
        1;
      const maxPage = this.pagination.currentPage * this.pagination.partPage;

      this.cpLocationTemp = this.cpLocation;
      this.cpLocation = [];
      this.cpLocationTemp.forEach((key, index) => {
        let num = index + 1;
        if (num >= minPage && num <= maxPage) {
          this.cpLocation.push(key);
        }
      });
    },
    getCoupon(pages) {
      this.cpLocation = [];
      this.stateText = "讀取中...";
      this.axios
        .get("http://127.0.0.1:8088/shop/coupon")
        .then((res) => {
          if (res.status == 200) {
            this.cpLocation = res.data;
            if (this.cpLocation.length == 0) {
              this.stateText =
                "目前無任何的優惠券，您可以點擊右上角新增按鈕新增";
              return;
            }
            this.paginationPart(pages);
          }
        })
        .catch((err) => console.log(err));
    },
    modifyOn(index) {
      this.modifyCurrentIndex = index;
      this.axios
        .post("http://127.0.0.1:8088/shop/coupon/get_single_coupon", {
          id: this.modifyCurrentIndex,
        })
        .then((res) => {
          this.couponName = res.data[0].CPName;
          this.couponCode = res.data[0].CPCode;
          this.couponPercent = res.data[0].CPPercent;
          this.couponStatus = Boolean(res.data[0].CPState);
        });
    },
    modifyOff() {
      this.couponName = "";
      this.couponCode = "";
      this.couponPercent = "";
    },
    showModal(index, modify) {
      const modalShow = document.querySelector(".modal-add");
      const modalContentShow = document.querySelector(".modal-add-body");
      const cancel = document.querySelector(".cancel");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      cancel.addEventListener("click", this.closeModal);
      setTimeout(() => {
        modalShow.classList.add("modal-add-toggle");
        modalContentShow.classList.add("modal-add-body-toggle");
      }, 100);
      if (modify == true) {
        this.modalConfirmName = "修改";
        this.modalTitle = "修改優惠券";
        this.modifyOn(index);
      } else {
        this.modalConfirmName = "新增";
        this.modalTitle = "新增優惠券";
        this.modifyOff();
      }
    },
    closeModal() {
      const modalShow = document.querySelector(".modal-add");
      const modalContentShow = document.querySelector(".modal-add-body");
      const cancel = document.querySelector(".cancel");
      modalShow.classList.remove("modal-add-toggle");
      modalContentShow.classList.remove("modal-add-body-toggle");
      cancel.removeEventListener("click", this.closeModal);
      setTimeout(() => (modalShow.style.display = ""), 750);
    },
    showDeleteModal(id) {
      this.modifyCurrentIndex = id;
      const modalShow = document.querySelector(".modal-delete");
      const modalContentShow = document.querySelector(".modal-delete-body");
      modalShow.style.display = "block";
      modalShow.style.transition = "1s ease";
      setTimeout(() => {
        modalShow.classList.add("modal-delete-toggle");
        modalContentShow.classList.add("modal-delete-body-toggle");
      }, 100);
      this.axios
        .post("http://127.0.0.1:8088/shop/coupon/get_single_coupon", {
          id: id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.modalDeletedObj.modalTitle = "刪除商品";
            this.modalDeletedObj.modalContent = `確定要刪除 ${res.data[0].CPName} 嗎？`;
          }
        })
        .catch((err) => console.log(err));
    },
    closeDeleteModal() {
      const modalShow = document.querySelector(".modal-delete");
      const modalContentShow = document.querySelector(".modal-delete-body");
      modalShow.classList.remove("modal-delete-toggle");
      modalContentShow.classList.remove("modal-delete-body-toggle");
      setTimeout(() => {
        this.modalDeletedObj.modalTitle = "";
        this.modalDeletedObj.modalContent = "";
        modalShow.style.display = "";
      }, 750);
    },
    createCouponCode() {
      let CodeHash = this.couponCodeHash;
      let CodeHashArry = [];
      let CodeHashChoos = null;
      for (let z = 0; z < 20; z++) {
        CodeHashChoos = Math.floor(Math.random() * CodeHash.length);
        CodeHashArry.push(CodeHash[CodeHashChoos]);
      }
      this.couponCode = CodeHashArry.join("");
    },
    submitCodeCheck() {
      this.couponName == ""
        ? (this.couponNameEmpty = true)
        : (this.couponNameEmpty = false);
      this.couponCode == ""
        ? (this.couponCodeEmpty = true)
        : (this.couponCodeEmpty = false);
      this.couponPercent == ""
        ? (this.couponPercentEmpty = true)
        : (this.couponPercentEmpty = false);
      this.couponFinalCheck.push(
        this.couponNameEmpty,
        this.couponCodeEmpty,
        this.couponPercentEmpty
      );
    },
    addCode(dateStr) {
      this.axios
        .post("http://127.0.0.1:8088/shop/coupon/create", {
          couponName: this.couponName,
          couponCode: this.couponCode,
          couponPercent: this.couponPercent,
          couponStatus: Number(this.couponStatus),
          couponEnableDate: this.couponStatus == true ? `${dateStr}` : null,
          couponDisableDate: this.couponStatus == false ? `${dateStr}` : null,
          couponAddDate: `${dateStr}`,
        })
        .then((res) => {
          if (res.status == 200) {
            this.getCoupon();
            this.couponName = "";
            this.couponCode = "";
            this.couponPercent = "";
            this.couponFinalCheck = [];
            this.closeModal();
          }
        })
        .catch((err) => console.log(err));
    },
    modifyCode(dateStr) {
      this.axios
        .post("http://127.0.0.1:8088/shop/coupon/patch", {
          id: this.modifyCurrentIndex,
          couponName: this.couponName,
          couponCode: this.couponCode,
          couponPercent: this.couponPercent,
          couponEnableDate: this.couponStatus == true ? `${dateStr}` : null,
          couponDisableDate: this.couponStatus == false ? `${dateStr}` : null,
          couponStatus: Number(this.couponStatus),
        })
        .then((res) => {
          if (res.status == 200) {
            this.getCoupon();
            this.couponName = "";
            this.couponCode = "";
            this.couponPercent = "";
            this.couponFinalCheck = [];
            this.closeModal();
          }
        });
    },
    deleteCoupon() {
      this.axios
        .post("http://127.0.0.1:8088/shop/coupon/delete/", {
          id: this.modifyCurrentIndex,
        })
        .then((res) => {
          if (res.status == 200) {
            this.getCoupon();
            this.closeDeleteModal();
          }
        })
        .catch((err) => console.log(err));
    },
    submitCode() {
      let falseCount = 0;
      const dateData = new Date();
      let year = dateData.getFullYear();
      let month = `${dateData.getMonth() + 1 < 10 ? "0" : ""}${
        dateData.getMonth() + 1
      }`;
      let date = `${dateData.getDate() < 10 ? "0" : ""}${dateData.getDate()}`;
      let dateStr = `${year}-${month}-${date}T00:00:00.000Z`;
      this.submitCodeCheck();
      this.couponFinalCheck.forEach((key) =>
        key == true ? (falseCount += 1) : null
      );
      falseCount == 0 ? (this.submitPass = true) : (this.submitPass = false);
      if (this.submitPass == false) {
        this.couponName = "";
        this.couponCode = "";
        this.couponPercent = "";
        this.couponFinalCheck = [];
        return;
      }
      this.modalConfirmName == "新增"
        ? this.addCode(dateStr)
        : this.modifyCode(dateStr);
    },
  },
  created() {
    this.getCoupon();
    this.renderHashCouponCode();
  },
};
</script>