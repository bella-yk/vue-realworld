<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <RwvArticleMeta :article="article" :actions="true"></RwvArticleMeta>
      </div>
    </div>
    <RwvHistoryList :items-per-page="5"> </RwvHistoryList>
  </div>
</template>

<script>
import RwvArticleMeta from "@/components/ArticleMeta";
import RwvHistoryList from "@/components/HistoryList";
import { mapGetters } from "vuex";

export default {
  name: "RwvProfileHistories",
  components: {
    RwvArticleMeta,
    RwvHistoryList
  },
  computed: {
    ...mapGetters(["article", "currentUser"])
  }
};
</script>
