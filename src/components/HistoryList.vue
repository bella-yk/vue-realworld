<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div v-if="histories.length === 0" class="article-preview">
          No articles are here... yet.
        </div>
        <RwvHistory
          v-for="history in histories"
          :history="history"
          :key="history.id"
        >
        </RwvHistory>
        <VPagination :pages="pages" :currentPage.sync="currentPage" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VPagination from "./VPagination";
import RwvHistory from "@/components/History";
import { FETCH_HISTORIES } from "../store/actions.type";
import RwvHeader from "@/components/TheHeader";

export default {
  name: "RwvHistoryList",
  components: {
    RwvHeader,
    RwvHistory,
    VPagination
  },
  props: {
    itemsPerPage: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data() {
    return {
      currentPage: 1,
      header: ["title", "description", "body"]
    };
  },
  computed: {
    listConfig() {
      const filters = {
        page: this.currentPage - 1,
        limit: this.itemsPerPage,
        slug: this.$route.params.slug
      };
      return {
        filters
      };
    },
    pages() {
      if (this.historiesCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.historiesCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["historiesCount", "histories", "isAuthenticated"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.page = newValue - 1;
      this.fetchHistories();
    }
  },
  mounted() {
    this.fetchHistories();
  },
  methods: {
    fetchHistories() {
      debugger;
      if (!this.isAuthenticated) return;
      this.$store.dispatch(FETCH_HISTORIES, this.listConfig);
    },
    resetPagination() {
      this.listConfig.page = 0;
      this.currentPage = 1;
    }
  }
};
</script>
