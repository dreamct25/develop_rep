<template>
  <div>
    <div class="container-fluid">
      <div class="table-outer">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">商品名稱</th>
              <th scope="col">商品原價</th>
              <th scope="col">商品售價</th>
              <th scope="col">商品庫存量</th>
              <th scope="col">是否為新品</th>
              <th scope="col">上架日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="ptLocation.length == 0">
              <td colspan="6" class="empty-match">{{ stateText }}</td>
            </tr>
            <tr v-for="(items, index) in ptLocation" :key="index">
              <td v-if="items.PDOnDate != null">{{ items.PDName }}</td>
              <td v-if="items.PDOnDate != null">
                $ {{ items.PDOriginPrice }} NT
              </td>
              <td v-if="items.PDOnDate != null">
                $ {{ items.PDOnSalePrice }} NT
              </td>
              <td v-if="items.PDOnDate != null">{{ items.PDPice }} 個</td>
              <td v-if="items.PDOnDate != null">
                <span v-if="Boolean(items.PDIsNew) == true">是</span>
                <span v-else>否</span>
              </td>
              <td v-if="items.PDOnDate != null">
                {{
                  new Date(items.PDOnDate)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, " / ")
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-outer {
  .table {
    color: white;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
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
        }
        .empty-match {
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
      width: 650px;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      ptLocation: [],
      stateText: "",
    };
  },
  methods: {
    getProduct() {
      this.stateText = "讀取中...";
      this.axios
        .get("http://127.0.0.1:8088/shop/product/")
        .then((res) => {
          if (res.status == 200) {
            res.data.forEach((key) =>
              Boolean(key.PDState) == true ? this.ptLocation.push(key) : null
            );
            this.ptLocation.length == 0
              ? (this.stateText = "目前暫無上架架商品")
              : null;
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getProduct();
  },
};
</script>