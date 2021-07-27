<template>
  <div class="text-center" style="padding: 5rem">
    <h1>Favorites</h1>
    <h4 v-if="!getFavoriteMovies & !getFavoriteTv">
      You haven't added any movies or tv shows to your list!
    </h4>
    <div class="row justify-content-center py-4">
      <div
        v-for="item in getFavoriteMovies"
        :key="item.id"
        style="flex-shrink: 0; height: 100%; position: relative"
      >
        <item
          :mediaItem="item"
          discoverMediaTypeProp="movie"
          style="margin-right: 10px"
        ></item>
      </div>
      <div
        v-for="item in getFavoriteTv"
        :key="item.id"
        style="flex-shrink: 0; height: 100%; position: relative"
      >
        <item
          :mediaItem="item"
          discoverMediaTypeProp="tv"
          style="margin-right: 10px"
        ></item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Item from "../components/Item.vue";

export default {
  name: "Favorites",
  components: {
    Item,
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters(["getFavoriteMovies", "getFavoriteTv"]),
  },
};
</script>