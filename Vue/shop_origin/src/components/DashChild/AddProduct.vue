<template>
  <div>
    <div class="add-item-outer">
      <div class="container-fluid">
        <div class="row justify-content-end">
          <div class="add-btn" @click="showModal">新增商品</div>
        </div>
        <div class="add-item-show">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">商品名稱</th>
                <th scope="col">商品分類</th>
                <th scope="col">商品原價</th>
                <th scope="col">商品售價</th>
                <th scope="col">商品庫存量</th>
                <th scope="col">上架狀態</th>
                <th scope="col">是否為新品</th>
                <th scope="col" width="17%">修改 / 刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="ptLocation.length == 0">
                <td colspan="8" class="empty-data">{{ stateText }}</td>
              </tr>
              <tr v-for="(item, index) in ptLocation" :key="index">
                <td>{{ item.PDName }}</td>
                <td>{{ item.PDTypeName }}</td>
                <td>$ {{ item.PDOriginPrice }} NT</td>
                <td>$ {{ item.PDOnSalePrice }} NT</td>
                <td>{{ item.PDPice }}</td>
                <td>
                  <span v-if="item.PDState == 3">未上架</span>
                  <span v-else-if="Boolean(item.PDState) == true">上架中</span>
                  <span v-else>已下架</span>
                </td>
                <td>
                  <span v-if="Boolean(item.PDIsNew) == true">是</span>
                  <span v-else>否</span>
                </td>
                <td>
                  <div class="choose-group">
                    <span
                      class="modify"
                      @click="showModal(item.PDID, (modify = true))"
                      >修改</span
                    >/
                    <span class="deleted" @click="showDeleteModal(item.PDID)"
                      >刪除</span
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          v-if="ptLocation.length != 0"
          :pageItem="pagination"
          v-on:prev="getProduct"
          v-on:current="getProduct"
          v-on:next="getProduct"
        />
      </div>
    </div>
    <div class="modal-add">
      <div class="modal-add-body">
        <div class="modal-add-header">
          <span class="modal-add-title" v-text="modalTitle"></span>
        </div>
        <div class="modal-add-content">
          <div class="upload-items">
            <div class="row">
              <div class="col-md-12">
                <label class="img-upload-frame" for="img">
                  <span v-if="uploadStart == false"
                    >請點擊上傳欲登入的商品圖片</span
                  >
                  <span v-if="uploadStartChange == true">等待選取中...</span>
                  <div v-else class="uploading-outer">
                    <div
                      class="now-uploading notice"
                      v-if="uploadStatus == true"
                    >
                      <div class="uploading"></div>
                      <span>讀取中</span>
                    </div>
                    <div
                      class="uploading-completed success"
                      v-if="uploadCompleted == true"
                    >
                      <i class="fal fa-check-circle fa-3x"></i>
                      <span>讀取成功</span>
                    </div>
                  </div>
                  <img class="show-img" src v-if="productImg == ''" alt />
                  <img class="show-img" :src="productImg" v-else alt />
                  <span class="change-img" @click="uploadChoose"
                    >選擇其他上傳圖片</span
                  >
                  <input id="img" type="file" @change="uploadLocalProductImg" />
                </label>
                <div class="url-group">
                  <div class="row no-gutters align-items-center">
                    <div class="col-7">
                      <input
                        type="text"
                        class="img-url-input"
                        placeholder="或選擇主要圖片網址上傳"
                        v-model="imgLinkMainTemp"
                        @change="uploadLinkProductImg"
                      />
                    </div>
                    <div class="col-4">
                      <span class="change-img-url" @click="uploadLinkChoose"
                        >選擇其他網址上傳</span
                      >
                    </div>
                    <div class="col-1">
                      <div
                        class="row justify-content-center align-items-center"
                      >
                        <i
                          class="fal fa-plus icon"
                          @click="addUrlColumn(true, 0)"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row no-gutters align-items-center"
                    v-if="imgUrlRenderCount >= 1"
                  >
                    <div class="col-7">
                      <input
                        type="text"
                        class="img-url-input"
                        placeholder="或選擇次要圖片 1 網址上傳"
                        v-model="imgLinkOtherTempI"
                        @change="uploadLinkProductImg"
                      />
                    </div>
                    <div class="col-4">
                      <span
                        class="change-img-url"
                        @click="imgLinkOtherTempI = ''"
                        >選擇其他網址上傳</span
                      >
                    </div>
                    <div class="col-1">
                      <div
                        class="row justify-content-center align-items-center"
                      >
                        <i
                          class="fal fa-minus icon"
                          @click="addUrlColumn(false, 1)"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row no-gutters align-items-center"
                    v-if="imgUrlRenderCount > 1 && imgUrlRenderCount <= 2"
                  >
                    <div class="col-7">
                      <input
                        type="text"
                        class="img-url-input"
                        placeholder="或選擇次要圖片 2 網址上傳"
                        v-model="imgLinkOtherTempII"
                        @change="uploadLinkProductImg"
                      />
                    </div>
                    <div class="col-4">
                      <span
                        class="change-img-url"
                        @click="imgLinkOtherTempII = ''"
                        >選擇其他網址上傳</span
                      >
                    </div>
                    <div class="col-1">
                      <div
                        class="row justify-content-center align-items-center"
                      >
                        <i
                          class="fal fa-minus icon"
                          @click="addUrlColumn(false, 2)"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="product-info">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="product-name-group">
                        <label for="product-name">商品名稱</label>
                        <input
                          id="product-name"
                          type="text"
                          v-model="productName"
                          placeholder="請輸入商品名稱"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="product-type-group">
                        <label for="product-type">商品種類</label>
                        <select
                          id="product-type"
                          v-model="productType"
                          @change="getProductTypeName"
                        >
                          <option disabled :value="null">
                            -- 請選擇商品種類 --
                          </option>
                          <option
                            :value="typeData.typeNum"
                            v-for="(typeData, index) in productTypeData"
                            :key="index"
                          >
                            {{ typeData.typeName }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="product-new-group">
                        <label for="product-new">是否為本期新品</label>
                        <select id="product-new" v-model="productNew">
                          <option :value="false">否</option>
                          <option :value="true">是</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <div class="product-origin-price-group">
                        <label for="product-origin-price">商品原價</label>
                        <input
                          id="product-origin-price"
                          type="number"
                          v-model="productOriginPrice"
                          placeholder="請輸入原價"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="product-onsale-price-group">
                        <label for="product-onsale-price">商品售價</label>
                        <input
                          id="product-onsale-price"
                          type="number"
                          v-model="productOnsalePrice"
                          placeholder="請輸入售價"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="product-pice-group">
                        <label for="product-pice">商品數量</label>
                        <input
                          id="product-pice"
                          type="number"
                          v-model="productPice"
                          placeholder="請輸入庫存量"
                        />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="product-status-group">
                        <label for="product-status-on">商品狀態</label>
                        <select id="product-status-on" v-model="productStatus">
                          <option :value="null">未上架</option>
                          <option :value="true">上架</option>
                          <option :value="false">下架</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="product-descrip-group">
                    <label for="product-descrip">商品說明</label>
                    <textarea
                      id="product-descrip"
                      maxlength="30"
                      v-model="productDescrip"
                      placeholder="請輸入商品說明"
                    ></textarea>
                  </div>
                  <div class="product-img-descrip-group">
                    <div class="firt-img">
                      <div class="product-img-descrip-title">
                        <label for="product-img-descrip"
                          >商品主要圖片說明</label
                        >
                        <i
                          class="fal fa-plus icon"
                          @click="addImgDescColumn(true, 0)"
                        ></i>
                      </div>
                      <textarea
                        id="product-img-descrip"
                        maxlength="10"
                        v-model="imgDescMainTemp"
                        placeholder="請輸入商品主要圖片說明"
                      ></textarea>
                    </div>
                    <div class="seconde-img" v-if="imgDescRenderCount >= 1">
                      <div class="product-img-descrip-title">
                        <label for="product-img-descrip"
                          >商品次要圖片 1 說明</label
                        >
                        <i
                          class="fal fa-minus icon"
                          @click="addImgDescColumn(false, 1)"
                        ></i>
                      </div>
                      <textarea
                        id="product-img-descrip"
                        maxlength="10"
                        v-model="imgDescOtherTempI"
                        placeholder="請輸入商品次要圖片 1 說明"
                      ></textarea>
                    </div>
                    <div
                      class="third-img"
                      v-if="imgDescRenderCount > 1 && imgDescRenderCount <= 2"
                    >
                      <div class="product-img-descrip-title">
                        <label for="product-img-descrip"
                          >商品次要圖片 2 說明</label
                        >
                        <i
                          class="fal fa-minus icon"
                          @click="addImgDescColumn(false, 2)"
                        ></i>
                      </div>
                      <textarea
                        id="product-img-descrip"
                        maxlength="10"
                        v-model="imgDescOtherTempII"
                        placeholder="請輸入商品次要圖片 2 說明"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-add-footer">
          <div class="cancel">取消</div>
          <div
            class="confirm"
            v-text="modalConfirmText"
            @click="addProduct"
          ></div>
        </div>
      </div>
    </div>
    <DeleteModal
      :obj="modalDeletedObj"
      v-on:cancle="closeDeleteModal"
      v-on:confirm="deleteProduct"
    />
  </div>
</template>
<style lang="scss" scoped>
.add-item-outer {
  .add-btn {
    color: white;
    background-color: rgb(4, 142, 255);
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    padding: 5px 20px 5px 20px;
    font-size: 18px;
    margin: 20px 10px 20px 0;
    border-radius: 7px;
    cursor: pointer;
    user-select: none;
  }
  .add-item-show {
    table {
      color: white;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
      margin-bottom: 0;
      th {
        border-top: none;
      }
      th,
      td {
        text-align: center;
      }
      .empty-data {
        font-size: 20px;
      }
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
  }
  @media screen and (max-width: 414px) {
    .add-item-show {
      overflow-x: scroll;
      table {
        width: 1050px;
      }
    }
  }
}
.modal-add {
  display: none;
  position: fixed;
  overflow-y: scroll;
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
    min-width: 385px;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1);
    transition: 0.5s ease;
  }

  /* 彈出視窗本體架構淡入淡出動畫 */

  .modal-add-body-toggle {
    opacity: 1;
    transform: translate(-50%, -43%) scale(1);
    transition: 0.5s ease;
  }
  @media screen and(max-width: 414px) {
    .modal-add-body {
      transform: translate(-50%, -32%) scale(0.1);
    }
    .modal-add-body-toggle {
      transform: translate(-50%, -32%) scale(1);
    }
  }

  /* 彈出視窗本體內部架構 */

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
    .upload-items {
      .img-upload-frame {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 250px;
        margin-bottom: 0;
        overflow: hidden;
        border: 2px dashed white;
        input[type="file"] {
          display: none;
        }
        span {
          display: block;
          font-style: italic;
        }
        .uploading-outer {
          .now-uploading {
            padding-top: 35px;
            animation: nowUpload 1s ease forwards;
            transition: 1s ease;
            .uploading {
              border-radius: 50%;
              width: 47px;
              height: 47px;
              border-top: 4px solid transparent;
              border-right: 4px solid rgb(255, 0, 0);
              border-bottom: 4px solid rgb(255, 0, 0);
              border-left: 4px solid rgb(255, 0, 0);
              box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.5),
                0 0 3px 1px rgba(0, 0, 0, 0.5);
              animation: uploadActive 1s linear infinite;
            }
            @keyframes uploadActive {
              100% {
                transform: rotate(360deg);
              }
            }
            span {
              margin-top: 10px;
            }
          }
          @keyframes nowUpload {
            0% {
              opacity: 0;
              transform: scale(0.7);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .uploading-completed {
            padding-top: 35px;
            animation: completedUpload 1s ease forwards;
            transition: 1s ease;
            span {
              margin-top: 10px;
            }
          }
          @keyframes completedUpload {
            0% {
              opacity: 0;
              transform: scale(0.7);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .disable-icon {
            animation: disableIcon 1s ease forwards;
          }
          @keyframes disableIcon {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0.7);
            }
          }
        }
        .show-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: 1s ease;
        }
        .show-img-active {
          opacity: 1;
          z-index: 1;
        }
        .change-img {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 5px 10px 5px 10px;
          background-color: rgba(0, 0, 0, 0.7);
          box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.5),
            0 0 3px 1px rgba(0, 0, 0, 0.7);
          border-top-left-radius: 5px;
          color: white;
          transform: translate(100%, 0%);
          opacity: 0;
          transition: 1s ease;
          cursor: pointer;
        }
        .change-img-active {
          opacity: 1;
          transform: translate(0%, 0%);
          z-index: 2;
        }
      }
      .url-group {
        margin-top: 15px;
        input[type="text"] {
          width: 100%;
          outline: none;
          border-radius: 10px;
          border: none;
          margin-right: 15px;
          box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
            0 0 2px 1px rgba(255, 255, 255, 0.7);
          text-align: center;
          transition: 1s ease;
        }
        input[type="text"]:focus {
          box-shadow: inset 0 0 2px 1px rgba(4, 142, 255, 0.7),
            0 0 2px 1px rgba(255, 255, 255, 0.7);
        }
        .change-img-url {
          display: block;
          text-align: center;
          margin: 3px 0 3px 15px;
          padding: 1px 10px 1px 10px;
          background-color: rgba(0, 0, 0, 0.7);
          box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.5),
            0 0 3px 1px rgba(0, 0, 0, 0.7);
          border-radius: 10px;
          color: white;
          cursor: pointer;
          user-select: none;
        }
        .icon {
          cursor: pointer;
          user-select: none;
          // text-align: center;
        }
      }
    }
  }
  .product-info {
    label {
      display: block;
    }
    input[type="text"],
    input[type="number"] {
      outline: none;
      border-radius: 10px;
      border: none;
      box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
        0 0 2px 1px rgba(255, 255, 255, 0.7);
      text-align: center;
      transition: 1s ease;
    }
    input[type="text"]:focus,
    input[type="number"]:focus {
      box-shadow: inset 0 0 2px 1px rgba(4, 142, 255, 0.7),
        0 0 2px 1px rgba(255, 255, 255, 0.7);
    }
    select {
      padding: 1.5px 0 1.5px 0;
      outline: none;
      border-radius: 10px;
      border: none;
      box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
        0 0 2px 1px rgba(255, 255, 255, 0.7);
    }
    .product-name-group,
    .product-type-group,
    .product-new-group {
      display: flex;
      flex-direction: column;
      margin: 10px 0 20px 0;
    }
    .product-status-group,
    .product-origin-price-group,
    .product-onsale-price-group,
    .product-pice-group {
      display: flex;
      flex-direction: column;
    }
    .product-descrip-group {
      display: flex;
      flex-direction: column;
      margin: 20px 0 20px 0;
      textarea {
        resize: none;
        height: 30px;
        outline: none;
        border-radius: 10px;
        border: none;
        box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
        transition: 1s ease;
      }
      textarea:focus {
        box-shadow: inset 0 0 2px 1px rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
      }
    }
    .product-img-descrip-group {
      display: flex;
      flex-direction: column;
      margin: 20px 0 20px 0;
      .product-img-descrip-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          padding: 0 4px 8px 0px;
          cursor: pointer;
          user-select: none;
        }
      }

      textarea {
        resize: none;
        width: 100%;
        height: 30px;
        outline: none;
        border-radius: 10px;
        border: none;
        box-shadow: inset 0 0 0 0 rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
        transition: 1s ease;
      }
      textarea:focus {
        box-shadow: inset 0 0 2px 1px rgba(4, 142, 255, 0.7),
          0 0 2px 1px rgba(255, 255, 255, 0.7);
      }
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

.modal-add-toggle {
  opacity: 1;
}
@media screen and(min-width: 769px) {
  .modal-add::-webkit-scrollbar {
    overflow-y: hidden;
  }
}
.success {
  color: rgb(0, 200, 0);
}
.notice {
  color: rgb(255, 0, 0);
}
</style>
<script>
import Pagination from "../DashChild/Pagination.vue";
import DeleteModal from "../DeleteModal.vue";
export default {
  name: "addProduct",
  data() {
    return {
      ptLocation: [],
      onStatus: false,
      stateText: "",
      imgUrlTemp: "",
      imgLinkMainTemp: "",
      imgLinkOtherTempI: "",
      imgLinkOtherTempII: "",
      imgUrlRenderCount: 0,
      imgDescRenderCount: 0,
      imgDescMainTemp: "",
      imgDescOtherTempI: "",
      imgDescOtherTempII: "",
      uploadStart: false,
      uploadStatus: false,
      uploadStartChange: false,
      uploadCompleted: false,
      productName: "",
      productType: null,
      productTypeName: "",
      productNew: false,
      productOriginPrice: "",
      productOnsalePrice: "",
      productPice: "",
      productStatus: false,
      productDescrip: "",
      productImg: "",
      productImgCheck: false,
      productNameCheck: false,
      productTypeCheck: false,
      productOriginPriceCheck: false,
      productOnsalePriceCheck: false,
      productPiceCheck: false,
      productDescripCheck: false,
      productFinalCheck: [],
      productPass: false,
      modalTitle: "",
      modalConfirmText: "",
      modifyCurrentIndex: 0,
      modalDeletedObj: {
        modalTitle: "",
        modalContent: "",
      },
      pagination: {},
      ptLocationTemp: [],
      productTypeData: [
        {
          typeNum: 1,
          typeName: "套裝",
        },
        {
          typeNum: 2,
          typeName: "褲子",
        },
        {
          typeNum: 3,
          typeName: "裙裝",
        },
        {
          typeNum: 4,
          typeName: "內搭衣",
        },
        {
          typeNum: 5,
          typeName: "高跟鞋",
        },
        {
          typeNum: 6,
          typeName: "平底鞋",
        },
        {
          typeNum: 7,
          typeName: "皮鞋",
        },
        {
          typeNum: 8,
          typeName: "靴子",
        },
        {
          typeNum: 9,
          typeName: "項鍊",
        },
        {
          typeNum: 10,
          typeName: "戒指",
        },
        {
          typeNum: 11,
          typeName: "時尚錶",
        },
        {
          typeNum: 12,
          typeName: "包包",
        },
      ],
    };
  },
  components: {
    Pagination,
    DeleteModal,
  },
  methods: {
    paginationPart(pages) {
      this.pagination.totalLength = this.ptLocation.length;

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

      this.ptLocationTemp = this.ptLocation;
      this.ptLocation = [];
      this.ptLocationTemp.forEach((key, index) => {
        let num = index + 1;
        if (num >= minPage && num <= maxPage) {
          this.ptLocation.push(key);
        }
      });
    },
    getProduct(pages) {
      this.ptLocation = [];
      this.stateText = "讀取中...";
      this.axios
        .get("http://127.0.0.1:8088/shop/product/")
        .then((res) => {
          if (res.status == 200) {
            this.ptLocation = res.data;
            if (this.ptLocation.length == 0) {
              this.stateText = "目前無任何產品，您可點擊右上角的按鈕新增商品";
              return;
            }
            this.paginationPart(pages);
          }
        })
        .catch((err) => console.log(err));
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
        .post("http://127.0.0.1:8088/shop/product/get_single_product", {
          id: id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.modalDeletedObj.modalTitle = "刪除商品";
            this.modalDeletedObj.modalContent = `確定要刪除 ${res.data[0].PDName} 嗎？`;
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
        this.modifyOn(index);
        this.modalConfirmText = "修改";
        this.modalTitle = "修改商品";
      } else {
        this.modalConfirmText = "新增";
        this.modalTitle = "新增商品";
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
    addUrlColumn(plusState, order) {
      if (plusState == false) {
        if (this.imgUrlRenderCount == 2 && order == 1) {
          alert("請按新增順序刪除！");
          return;
        }
        this.imgUrlRenderCount--;
      } else if (this.imgUrlRenderCount >= 2) {
        this.imgUrlRenderCount = 2;
      } else if (plusState == true) {
        this.imgUrlRenderCount++;
      }
    },
    addImgDescColumn(plusState, order) {
      if (plusState == false) {
        if (this.imgDescRenderCount == 2 && order == 1) {
          alert("請按新增順序刪除！");
          return;
        }
        this.imgDescRenderCount--;
      } else if (this.imgDescRenderCount >= 2) {
        this.imgDescRenderCount = 2;
      } else if (plusState == true) {
        this.imgDescRenderCount++;
      }
    },
    uploadChoose() {
      this.uploadStartChange = true;
      this.uploadCompleted = false;
      const showImg = document.querySelector(".show-img");
      const changeImg = document.querySelector(".change-img");
      showImg.classList.remove("show-img-active");
      changeImg.classList.remove("change-img-active");
      setTimeout(() => {
        showImg.setAttribute("src", "");
      }, 1000);
    },
    uploadLinkChoose() {
      this.imgLinkMainTemp = "";
      this.uploadStartChange = true;
      this.uploadCompleted = false;
      const showImg = document.querySelector(".show-img");
      showImg.classList.remove("show-img-active");
    },
    uploadLocalProductImg: (imgFile) => {
      const showImg = document.querySelector(".show-img");
      let file = imgFile.target.files[0];
      let createFileURL = window.URL.createObjectURL(file);
      this.imgUrlTemp = createFileURL;
      this.uploadStartChange = false;
      this.uploadStart = true;
      this.uploadStatus = true;
      this.linkStatus = false;
      setTimeout(() => {
        document.querySelector(".now-uploading").classList.add("disable-icon");
        setTimeout(() => {
          this.uploadStatus = false;
          this.uploadCompleted = true;
        }, 1000);
        setTimeout(
          () =>
            document
              .querySelector(".uploading-completed")
              .classList.add("disable-icon"),
          2000
        );
        setTimeout(() => {
          showImg.setAttribute("src", createFileURL);
          showImg.classList.add("show-img-active");
          document
            .querySelector(".change-img")
            .classList.add("change-img-active");
        }, 2990);
      }, 5000);
    },
    uploadLinkProductImg() {
      if (this.imgLinkMainTemp == "") return;
      const showImg = document.querySelector(".show-img");
      this.linkStatus = true;
      this.uploadStartChange = false;
      this.uploadStart = true;
      this.uploadStatus = true;
      setTimeout(() => {
        document.querySelector(".now-uploading").classList.add("disable-icon");
        setTimeout(() => {
          this.uploadStatus = false;
          this.uploadCompleted = true;
        }, 1000);
        setTimeout(
          () =>
            document
              .querySelector(".uploading-completed")
              .classList.add("disable-icon"),
          2000
        );
        setTimeout(() => {
          showImg.setAttribute("src", this.imgLinkMainTemp);
          showImg.classList.add("show-img-active");
        }, 2990);
      }, 5000);
    },
    submitCheck() {
      this.productImg != "" || this.imgLinkMainTemp != ""
        ? (this.productImgCheck = true)
        : (this.imgLinkMainTemp = false);
      this.productName == ""
        ? (this.productNameCheck = false)
        : (this.productNameCheck = true);
      this.productType == ""
        ? (this.productTypeCheck = false)
        : (this.productTypeCheck = true);
      this.productOriginPrice == ""
        ? (this.productOriginPriceCheck = false)
        : (this.productOriginPriceCheck = true);
      this.productOnsalePrice == ""
        ? (this.productOnsalePriceCheck = false)
        : (this.productOnsalePriceCheck = true);
      this.productPice == ""
        ? (this.productPiceCheck = false)
        : (this.productPiceCheck = true);
      this.productDescrip == ""
        ? (this.productDescripCheck = false)
        : (this.productDescripCheck = true);
      this.productFinalCheck.push(
        this.productImgCheck,
        this.productNameCheck,
        this.productTypeCheck,
        this.productOriginPriceCheck,
        this.productOnsalePriceCheck,
        this.productPiceCheck,
        this.productDescripCheck
      );
    },
    addProduct() {
      let falseCount = 0;
      const dateObj = new Date();
      let year = dateObj.getFullYear();
      let month = `${dateObj.getMonth() + 1 < 10 ? "0" : ""}${
        dateObj.getMonth() + 1
      }`;
      let date = `${dateObj.getDate() < 10 ? "0" : ""}${dateObj.getDate()}`;
      let dateDescrip = `${year}-${month}-${date}T00:00:00.000Z`;
      this.submitCheck();
      this.productFinalCheck.forEach((key) =>
        key == false ? (falseCount += 1) : null
      );
      falseCount == 0 ? (this.productPass = true) : (this.productPass = false);
      if (this.productPass == false) {
        this.productFinalCheck = [];
        return;
      }
      this.modalConfirmText == "新增"
        ? this.postProduct(dateDescrip)
        : this.patchProduct(dateDescrip);
    },
    modifyOn(index) {
      this.modifyCurrentIndex = index;
      this.axios
        .post("http://127.0.0.1:8088/shop/product/get_single_product", {
          id: this.modifyCurrentIndex,
        })
        .then((res) => {
          if (res.status == 200) {
            this.productImg = res.data[0].PDImgUrlI;
            this.imgLinkMainTemp = res.data[0].PDImgUrlI;
            this.imgLinkOtherTempI = res.data[0].PDImgUrlII;
            this.imgLinkOtherTempII = res.data[0].PDImgUrlIII;
            this.imgDescMainTemp = res.data[0].PDImgDescI;
            this.imgDescOtherTempI = res.data[0].PDImgDescII;
            this.imgDescOtherTempII = res.data[0].PDImgDescIII;
            this.productName = res.data[0].PDName;
            this.productType = res.data[0].PDTypeNum;
            this.productOriginPrice = res.data[0].PDOriginPrice;
            this.productOnsalePrice = res.data[0].PDOnSalePrice;
            this.productDescrip = res.data[0].PDDesc;
            this.productPice = res.data[0].PDPice;
            this.productStatus =
              res.data[0].PDState == 3 ? null : Boolean(res.data[0].PDState);
            setTimeout(
              () =>
                document
                  .querySelector(".show-img")
                  .classList.add("show-img-active"),
              500
            );
          }
        })
        .catch((err) => console.log(err));
    },
    modifyOff() {
      this.imgLinkMainTemp = "";
      this.imgLinkOtherTempI = "";
      this.imgLinkOtherTempII = "";
      this.imgDescMainTemp = "";
      this.imgDescOtherTempI = "";
      this.imgDescOtherTempII = "";
      this.productImg = "";
      this.productName = "";
      this.productType = null;
      this.productNew = false;
      this.productOriginPrice = "";
      this.productOnsalePrice = "";
      this.productDescrip = "";
      this.productPice = "";
      this.productStatus = null;
      document.querySelector(".show-img").classList.remove("show-img-active");
    },
    postProduct(dateDescrip) {
      this.axios
        .post("http://127.0.0.1:8088/shop/product/create", {
          productMainImg:
            this.imgUrlTemp == "" ? this.imgLinkMainTemp : this.imgUrlTemp,
          productOtherImgI:
            this.imgLinkOtherTempI == "" ? null : this.imgLinkOtherTempI,
          productOtherImgII:
            this.imgLinkOtherTempII == "" ? null : this.imgLinkOtherTempII,
          productMainImgDesc: this.imgDescMainTemp,
          productOtherImgDescI:
            this.imgDescOtherTempI == "" ? null : this.imgDescOtherTempI,
          productOtherImgDescII:
            this.imgDescOtherTempII == "" ? null : this.imgDescOtherTempII,
          productName: this.productName,
          productTypeName: this.productTypeName,
          productTypeNum: this.productType,
          productNew: Number(this.productNew),
          productOriginPrice: this.productOriginPrice,
          productOnSalePrice: this.productOnsalePrice,
          productDescript: this.productDescrip,
          productPice: this.productPice,
          productStatus:
            this.productStatus == null ? 3 : Number(this.productStatus),
          productAddDate: dateDescrip,
          productOnDate: this.productStatus == true ? dateDescrip : null,
          productOffDate: null,
        })
        .then((res) => {
          if (res.status == 200) {
            this.imgUrlRenderCount = 0;
            this.productFinalCheck = [];
            this.getProduct();
            this.closeModal();
            setTimeout(() => alert("新增成功！"), 850);
          }
        })
        .catch((err) => console.log(err));
    },
    patchProduct(dateDescrip) {
      this.axios
        .post(`http://127.0.0.1:8088/shop/product/patch`, {
          id: this.modifyCurrentIndex,
          productMainImg:
            this.imgUrlTemp == "" ? this.imgLinkMainTemp : this.imgUrlTemp,
          productOtherImgI:
            this.imgLinkOtherTempI == "" ? null : this.imgLinkOtherTempI,
          productOtherImgII:
            this.imgLinkOtherTempII == "" ? null : this.imgLinkOtherTempII,
          productMainImgDesc: this.imgDescMainTemp,
          productOtherImgDescI:
            this.imgDescOtherTempI == "" ? null : this.imgDescOtherTempI,
          productOtherImgDescII:
            this.imgDescOtherTempII == "" ? null : this.imgDescOtherTempII,
          productName: this.productName,
          productTypeNum: this.productType,
          productNew: Number(this.productNew),
          productOriginPrice: this.productOriginPrice,
          productOnsalePrice: this.productOnsalePrice,
          productDescript: this.productDescrip,
          productPice: this.productPice,
          productStatus:
            this.productStatus == null ? 3 : Number(this.productStatus),
          productOnDate: this.productStatus == true ? dateDescrip : null,
          productOffDate: this.productStatus == false ? dateDescrip : null,
        })
        .then((res) => {
          if (res.status == 200) {
            this.imgUrlRenderCount = 0;
            this.productFinalCheck = [];
            this.getProduct();
            this.closeModal();
            setTimeout(() => alert("修改成功！"), 850);
          }
        })
        .catch((err) => console.log(err));
    },
    deleteProduct() {
      this.axios
        .post(`http://127.0.0.1:8088/shop/product/delete`, {
          id: this.modifyCurrentIndex,
        })
        .then((res) => {
          if (res.status == 200) {
            this.productFinalCheck = [];
            this.closeDeleteModal();
            this.getProduct();
            setTimeout(() => alert("刪除成功！"), 850);
          }
        })
        .catch((err) => console.log(err));
    },
    getProductTypeName() {
      this.productTypeData.forEach((key) =>
        key.typeNum == this.productType
          ? (this.productTypeName = key.typeName)
          : null
      );
    },
  },
  created() {
    this.getProduct();
  },
};
</script>