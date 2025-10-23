<template lang="pug">
nav.pagination-outer(aria-label="Page navigation")
  ul.pagination.justify-content-center.align-items-center
    li.page-item(:class="{ disabled: !pageItem.hasPage }")
      a.page-link(
        :class="{ 'page-link-active': pageItem.hasPage }"
        @click.prevent="prev(pageItem.currentPage - 1)"
        href="#"
        aria-label="Previous"
      )
        span(aria-hidden="true")
          i.far.fa-chevron-double-left
    li.page-item(
      v-for="(pages, index) in pageItem.pageTotal"
      :key="index"
      :class="{ active: pageItem.currentPage === pages }"
    )
      a.page-link(href="#",@click.prevent="current(pages)") {{ pages }}
    li.page-item(:class="{ disabled: !pageItem.hasNext }")
      a.page-link(
        :class="{ 'page-link-active': pageItem.hasNext }"
        @click.prevent="next(pageItem.currentPage + 1)"
        href="#"
        aria-label="Next"
      )
        span(aria-hidden="true")
          i.far.fa-chevron-double-right
</template>
<style lang="scss" scoped>
.pagination-outer {

  ul {
    margin-top: 16px;
  }

  .page-item {
    user-select: none;

    &:first-child {

      .page-link {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: rgba(150, 150, 150, 0.7);
      }

      .page-link-active {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    &:last-child {

      .page-link {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: rgba(150, 150, 150, 0.7);
      }

      .page-link-active {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    &.disabled {
      cursor: not-allowed;
    }

    &.active {

      .page-link {
        background-color: rgb(255, 255, 255);
        box-shadow: inset 0 0 2px 1px rgba(30, 30, 30, 0.7);
        color: black !important;
      }
    }

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

      &:hover {
        color: black !important;
        background-color: rgba(255, 255, 255, 0.9) !important;
      }
    }
  }
}
</style>
<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: 'Pagination',
  props: ['pageItem'],
  setup(props: { pageItem: Record<string,any> },{ emit }){

    const method: {
      prev(val: number): void,
      current(val: number): void,
      next(val: number): void
    } = {
      prev(val) {
        emit("prev", val);
      },
      current(val) {
        emit("current", val);
      },
      next(val) {
        emit("next", val);
        console.log(props.pageItem);
      },
    }

    return { ...toRefs(props), ...method }
  }
})
</script>