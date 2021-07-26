<template>
  <div class="row justify-content-center py-4">
    <div
      v-for="item in favorites"
      :key="item.id"
      style="flex-shrink: 0; height: 100%; position: relative"
    >
      <item :mediaItem="item" style="margin-right: 10px"></item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Favorites",
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters(["getFavoriteMovies", "getFavoriteTv"]),
    favorites() {
      return this.getFavoriteMovies + this.getFavoriteTv;
    },
  },
};
</script>