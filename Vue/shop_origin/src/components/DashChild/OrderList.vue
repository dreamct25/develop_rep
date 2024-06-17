<template>
  <div>
    <div class="container-fluid">
      <div class="table-outer">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">買家名稱</th>
              <th scope="col">買家電話</th>
              <th scope="col">買家地址</th>
              <th scope="col">付款方式</th>
              <th scope="col">付款狀態</th>
              <th scope="col">訂單建立日期</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="pdLocation.length == 0">
              <td colspan="7" class="empty-data">{{ stateText }}</td>
            </tr>
            <tr v-for="(items, index) in pdLocation" :key="index">
              <td>{{ items.PMNum }}</td>
              <td>{{ items.PMName }}</td>
              <td>{{ items.PMTel }}</td>
              <td>{{ items.PMAddress }}</td>
              <td>{{ items.PMMethod }}</td>
              <td v-if="Boolean(items.PMState) == false" class="notice">
                未付款
              </td>
              <td v-else class="success">已付款</td>
              <td>
                {{
                  new Date(items.PMCreateDate)
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, " / ")
                }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-right" colspan="7">
                <span class="notice">未付款</span>：{{ unPay }} 筆訂單 /
                <span class="success">已付款</span>：{{ hasPay }} 筆訂單 / 總計
                {{ pdLocation.length }} 筆訂單
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Pagination
        v-if="pdLocation.length != 0"
        :pageItem="pagination"
        v-on:prev="getPayDownList"
        v-on:current="getPayDownList"
        v-on:next="getPayDownList"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
        }
        .empty-data {
          font-size: 20px;
        }
      }
    }
  }
}
.notice {
  color: red;
}
.success {
  color: rgb(0, 255, 0);
}
@media screen and (max-width: 414px) {
  .table-outer {
    overflow-x: scroll;
    table {
      width: 860px;
    }
  }
}
</style>
<script>
import Pagination from "../DashChild/Pagination.vue";
export default {
  data() {
    return {
      pdLocation: [],
      pdLocationTemp: [],
      stateText: "",
      hasPay: 0,
      unPay: 0,
      pagination: {},
    };
  },
  components: {
    Pagination,
  },
  methods: {
    paginationPart(pages) {
      this.pagination.totalLength = this.pdLocation.length;

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

      this.pdLocationTemp = this.pdLocation;
      this.pdLocation = [];
      this.pdLocationTemp.forEach((key, index) => {
        let num = index + 1;
        if (num >= minPage && num <= maxPage) {
          this.pdLocation.push(key);
        }
      });
    },
    getPayDownList(pages) {
      this.pdLocation = [];
      this.stateText = "讀取中...";
      this.axios
        .get("http://127.0.0.1:8088/shop/payment/")
        .then((res) => {
          if (res.status == 200) {
            this.pdLocation = res.data;
            let hasPayArray = this.pdLocation.filter(
              (key) => Boolean(key.PMState) == true
            );
            let unPayArray = this.pdLocation.filter(
              (key) => Boolean(key.PMState) == false
            );
            this.hasPay = hasPayArray.length;
            this.unPay = unPayArray.length;
            if (this.pdLocation.length == 0) {
              this.stateText = "目前無任何訂單";
              return;
            }
            this.paginationPart(pages);
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getPayDownList();
  },
};
</script>