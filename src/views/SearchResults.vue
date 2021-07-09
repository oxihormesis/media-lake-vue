<template>
  <div class="router-view">
    <section class="container py-5">
      <h1 class="py-5">{{$t('results_for')}} '{{ $route.params.data }}'</h1>
      <awesome-swiper
        :mediaItems="movieItems"
        :sliderHeading="$t('movie')+'s'"
      ></awesome-swiper>
      <awesome-swiper :mediaItems="tvItems" :sliderHeading="$t('tv')"></awesome-swiper>
      <awesome-swiper
        :mediaItems="personItems"
        :sliderHeading="$t('people')"
      ></awesome-swiper>
    </section>
  </div>
</template>

<script>
import AwesomeSwiper from "@/components/AwesomeSwiper.vue";
import { mapGetters } from "vuex";

export default {
  name: "SearchResults",
  components: {
    AwesomeSwiper
  },
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    ...mapGetters("search", {
      movieItems: "getMovieItems",
      tvItems: "getTvItems",
      personItems: "getPersonItems"
    })
  }
};
</script>
