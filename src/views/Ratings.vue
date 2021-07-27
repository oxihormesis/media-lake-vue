<template>
  <div class="text-center" style="padding: 5rem 2rem">
    <h1>Ratings</h1>
    <h4 v-if="!getRatedMovies & !getRatedTv">
      You haven't rated any movies or tv shows!
    </h4>
    <div class="row justify-content-center py-4">
      <div
        v-for="item in getRatedMovies"
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
        v-for="item in getRatedTv"
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
  name: "Ratings",
  components: {
    Item,
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters(["getRatedMovies", "getRatedTv"]),
  },
};
</script>