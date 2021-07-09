<template>
  <div>
    <awesome-swiper
    :hero="true"
    :mediaItems="getHeroTrending"
  ></awesome-swiper>
  <section class="container-fluid swiper-container py-5">
    <div id="heading">
      <h1 class="py-3">
        {{$t('recently_trending')}}
      </h1>
    </div>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getMovieTrending"
      :sliderHeading="$t('movie') + 's'"
    ></awesome-swiper>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getTvTrending"
      :sliderHeading="$t('tv')"
    ></awesome-swiper>
    <awesome-swiper
      :topBorderProp="true"
      :mediaItems="getPeopleTrending"
      :sliderHeading="$t('people')"
    ></awesome-swiper>
  </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AwesomeSwiper from "./AwesomeSwiper.vue";

export default {
  name: "Landing",
  components: {
    AwesomeSwiper
  },
  props: {},
  methods: {
    ...mapActions(["searchTrending"])
  },
  mounted() {
    console.log("In landing view- logging a test of store.state.lang ", this.$store.state.Lang)
    this.searchTrending();
  },
  computed: {
    ...mapGetters(["getMovieTrending", "getTvTrending", "getPeopleTrending"]),
    getHeroTrending(){
    let heroItems = null;
    heroItems = this.getMovieTrending.slice(0-3);
    const addTv = this.getTvTrending.slice(0-3);
    let items = heroItems.concat(addTv)
    return items
  }
  },
};
</script>

<style scoped>
.swiper-container{
  padding: 12rem;
}
#heading {
  text-align: center;
  /* background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(134, 29, 84, 1) 37%,
      rgb(255, 174, 174) 50%,
      rgba(134, 29, 84, 1) 63%,
      rgba(0, 0, 0, 0) 100%
    )
    center bottom no-repeat;
  background-size: 20% 1px; */
}
@media only screen and (max-width: 1300px){
  .swiper-container{
  padding: 0 1rem;
}
}
@media only screen and (max-width: 576px){
  .swiper-container{
  padding: 0 3px;
}
}
</style>
