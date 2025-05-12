<template>
  <nav class="pagination-outer" aria-label="Page navigation">
    <ul class="pagination justify-content-center align-items-center">
      <li class="page-item" :class="{ disabled: !pageItem.hasPage }">
        <a
          class="page-link"
          :class="{ 'page-link-active': pageItem.hasPage }"
          @click.prevent="prev(pageItem.currentPage - 1)"
          href="#"
          aria-label="Previous"
        >
          <span aria-hidden="true"
            ><i class="far fa-chevron-double-left"></i
          ></span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="(pages, index) in pageItem.pageTotal"
        :key="index"
        :class="{ active: pageItem.currentPage == pages }"
      >
        <a class="page-link" href="#" @click.prevent="current(pages)">{{
          pages
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pageItem.hasNext }">
        <a
          class="page-link"
          :class="{ 'page-link-active': pageItem.hasNext }"
          @click.prevent="next(pageItem.currentPage + 1)"
          href="#"
          aria-label="Next"
        >
          <span aria-hidden="true"
            ><i class="far fa-chevron-double-right"></i
          ></span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.pagination-outer {
  margin: 30px 0 30px 0;
  .page-link {
    z-index: unset !important;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: inset 0 0 2px 1px rgba(255, 255, 255, 0.7);
    padding: 5px 20px 5px 20px;
    border-radius: 10px;
    margin: 0 3px 0 3px;
    border: none;
    span {
      display: block;
      font-size: 11px;
      padding: 3px 0 4px 0;
    }
  }
  .page-link:hover {
    color: black !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .page-item:first-child {
    .page-link {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: rgba(150, 150, 150, 0.7);
    }
    .page-link-active {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  .page-item:last-child {
    .page-link {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: rgba(150, 150, 150, 0.7);
    }
    .page-link-active {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
@media screen and (max-width: 414px) {
  .pagination-outer {
    margin: 20px 0 30px 0;
  }
}
</style>
<script>
export default {
  name: "Pagination",
  props: {
    pageItem: {
      type: Object,
    },
  },
  methods: {
    prev(val) {
      this.$emit("prev", val);
    },
    current(val) {
      this.$emit("current", val);
    },
    next(val) {
      this.$emit("next", val);
      console.log(this.pageItem);
    },
  },
};
</script>