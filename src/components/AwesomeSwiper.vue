<template>
  <div v-if="hero" class="hero_container">
    <swiper :options="heroOptions" ref="swiper" class="swiper">
      <!-- Loops through item data and creates a swiper slide -->
      <swiper-slide v-for="item in mediaItems" :key="item.id">
        <div style="text-align: center">
          <img
            id="hero-image"
            :src="img.base_url + img.backdrop_sizes[3] + item.backdrop_path"
            alt="item.title || item.name"
            @click="$router.push(`/${item.media_type}/${item.id}`)"
          />
          <fit-text class="hero_title" :max="9">{{
            item.name || item.title
          }}</fit-text>
        </div>
      </swiper-slide>
      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>
    </swiper>
  </div>

  <div v-else class="wrapper">
    <h2 class="swiper_heading">{{ sliderHeading }}</h2>
    <swiper
      :options="swiperOptions"
      ref="swiper"
      class="swiper"
      :class="{ top_border: topBorderProp }"
    >
      <!-- Loops through item data and creates a swiper slide -->

      <swiper-slide v-for="item in mediaItems" :key="item.id">
        <item :mediaItem="item"></item>
      </swiper-slide>

      <template v-slot:button-prev>
        <div
          @click="$refs.swiper.swiperInstance.slidePrev()"
          class="swiper-button-prev"
        ></div>
      </template>
      <template v-slot:button-next>
        <div
          @click="$refs.swiper.swiperInstance.slideNext()"
          class="swiper-button-next"
        ></div>
      </template>
    </swiper>
    <hr class="carousel-container__separator" />
  </div>
</template>

<script>
import Item from "./Item.vue";
import { mapGetters } from "vuex";
import {
  Swiper as SwiperClass,
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
} from "swiper/js/swiper.esm";
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";
import "swiper/css/swiper.css";

import FitText from "./FitText.vue";

SwiperClass.use([Pagination, Mousewheel, Navigation, Autoplay]);
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);

export default {
  components: {
    Item,
    FitText,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {};
  },
  props: {
    mediaItems: {
      type: Array,
      default: () => [],
    },
    hero: Boolean,
    topBorderProp: Boolean,
    sliderHeading: String,
    slidesPerViewProp: Number,
    slidesPerGroup: Number,
    spaceBetweenProp: Number,
    centerInsufficientSlides: Boolean,
    numSlidesProp: Number,
  },
  computed: {
    ...mapGetters(["getApiConf"]),
    heroOptions() {
      return {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        navigation: false,
        simulateTouch: true,
        loop: true,
        resizeObserver: true,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar",
        },
      };
    },
    img() {
      return this.getApiConf.images;
    },
    swiperOptions() {
      return {
        slidesPerView: this.slidesPerViewProp || 7,
        slidesPerGroup: 7,
        spaceBetween: this.spaceBetweenProp || 10,
        simulateTouch: true,
        loop: true,
        centerInsufficientSlides: true,
        resizeObserver: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          // when window width is >= 0px
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 1,
          },
          280: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 0,
          },
          // when window width is >= 400px
          400: {
            slidesPerView: 3,
            slidesPerGroup: this.slidesPerViewProp || 3,
            spaceBetween: 0,
          },
          470: {
            slidesPerView: 4,
            slidesPerGroup: this.slidesPerViewProp || 4,
            spaceBetween: 0,
          },
          780: {
            slidesPerView: this.slidesPerViewProp - 3 || 4,
            slidesPerGroup: this.slidesPerViewProp || 4,
            spaceBetween: this.spaceBetweenProp || 10,
          },
          830: {
            slidesPerView: this.slidesPerViewProp - 2 || 5,
            slidesPerGroup: this.slidesPerViewProp || 5,
            spaceBetween: this.spaceBetweenProp || 10,
          },
          1040: {
            slidesPerView: this.slidesPerViewProp - 1 || 6,
            slidesPerGroup: this.slidesPerViewProp || 6,
            spaceBetween: 0,
          },
          1220: {
            slidesPerView: this.slidesPerViewProp || 7,
            slidesPerGroup: this.slidesPerViewProp || 7,
            spaceBetween: this.spaceBetweenProp || 10,
          },
          1300: {
            slidesPerView: 8,
            slidesPerGroup: 8,
            spaceBetween: this.spaceBetweenProp || 10,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.swiper_heading {
  padding-left: 25px;
}
.hero_container {
  height: 80vh;
  overflow: hidden;
}
#hero-image {
  width: 100%;
  cursor: pointer;
}
.hero_title {
  position: absolute;
  bottom: 30%;
  left: 10%;
  font-family: Bebas-Neue;
  /* text-shadow: 1px 0 0 black, 0 1px 0 black, -1px 0 0 black, 0 -1px 0 black; */
  filter: drop-shadow(0 0 2px white)
    drop-shadow(0 0 10px rgba(255, 255, 255, 0.405))
    drop-shadow(10px 15px 10px black) drop-shadow(10px 15px 30px black);
}
.wrapper {
  width: 100%;
}
.swiper-button-prev {
  color: #42b983;
  font-size: 82px;
  background: linear-gradient(
      to right,
      rgba(185, 245, 190, 0.39) 0%,
      #42b98362 10%,
      #0f4557 63%,
      rgba(185, 245, 190, 0.39) 100%
    )
    left top no-repeat;
  border-radius: 65px;
  padding: 30px;
}
.swiper-button-next {
  color: #42b983;
  font-size: 82px;
  background: linear-gradient(
      to left,
      rgba(185, 245, 190, 0.39) 0%,
      #42b98362 10%,
      #0f4557 63%,
      rgba(185, 245, 190, 0.39) 100%
    )
    right top no-repeat;
  border-radius: 65px;
  padding: 30px;
}
.top_border {
  padding-top: 20px;
  background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      #42b983 10%,
      #0f4557 63%,
      rgba(0, 0, 0, 0) 100%
    )
    left top no-repeat;
  background-size: 90% 1px;
}
@media only screen and (max-width: 780px) {
  .top_border {
    background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0) 0%,
        #0f4557 37%,
        #42b983 50%,
        #0f4557 63%,
        rgba(0, 0, 0, 0) 100%
      )
      center top no-repeat;
    background-size: 90% 1px;
  }
}
@media only screen and (max-width: 1200px) {
  .hero_container {
    height: 60vh;
  }
}
@media only screen and (max-width: 860px) {
  .hero_title {
    position: absolute;
    bottom: 30%;
    left: 10%;
    font-family: Bebas-Neue;
  }
}
@media only screen and (max-width: 768px) {
  .hero_container {
    height: 40vh;
  }
}
@media only screen and (max-width: 576px) {
  .hero_container {
    height: 30vh;
  }
}
@media only screen and (max-width: 400px) {
  .hero_container {
    height: 40vh;
  }
  #hero-image {
    width: 250%;
  }
}
</style>
