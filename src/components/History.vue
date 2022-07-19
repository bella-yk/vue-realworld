<template>
  <div class="card">
    <div
      class="card-header"
      :class="{
        'bg-info': history.historyAction === 'NEW',
        'bg-success': history.historyAction === 'EDIT',
        'bg-default': history.historyAction === 'DELETE'
      }"
    >
      <span> [Title] {{ history.articleData.title }} </span>
      <span class="pull-xs-right">
        &nbsp;&nbsp; {{ history.createdAt | date }}
      </span>
      <span
        class="tag-pill tag-outline pull-xs-right"
        :class="{
          'tag-warning': history.historyAction !== 'EDIT',
          'tag-danger': history.historyAction === 'EDIT'
        }"
      >
        {{ history.historyAction }}
      </span>
    </div>
    <div class="card-block">
      {{ history.articleData.body }}
    </div>
    <div class="card-footer">
      <span class="tag-default tag-pill tag-outline-info"> description </span>
      {{ history.articleData.description }}
    </div>
    <div class="tag-list" v-if="history.articleData.tags.length > 0">
      <ul>
        <li
          class="tag-default tag-pill tag-outline"
          v-for="(tag, index) of history.articleData.tags"
          :key="index"
        >
          <span v-text="tag.name" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "RwvHistory",
  props: {
    history: { type: Object, required: true }
  },
  computed: {
    homeRoute: () => ({ name: "home-tag", params: { tag: name } })
  }
};
</script>
