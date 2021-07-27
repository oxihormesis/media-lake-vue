<template>
  <div
    name="persons-detail"
    v-if="this.$route.params.media_type == 'person'"
    class="router-view container-fluid pb-5"
  >
    <section class="row text-center" id="hero">
      <img
        id="hero-image"
        :src="
          img.secure_base_url +
          img.backdrop_sizes[3] +
          getCredits[0].backdrop_path
        "
      />
      <div class="img-overlay"></div>
      <div class="row" id="profile-pic">
        <div class="col-4">
          <img
            class="poster"
            :src="img.base_url + img.poster_sizes[2] + getDetails.profile_path"
          />
        </div>
        <div class="col-8">
          <div class="row">
            <div class="col-12 text-left">
              <div>
                <span id="title" class="px-4 py-2" title="name"
                  >{{ getDetails.name }}
                </span>
                <span>{{
                  getDetails.known_for_department == "Acting"
                    ? "Actor"
                    : getDetails.known_for_department == "Directing"
                    ? "Director"
                    : getDetails.known_for_department
                }}</span>
              </div>
            </div>

            <div class="col text-left mt-4">
              <span>{{ getDetails.birthday }}</span>
              <span>{{ getDetails.deathday }}</span>
              <span>{{ getDetails.place_of_birth }}</span>
            </div>
          </div>
        </div>
      </div>
      <a @click="$router.go(-1).catch((e) => {})">
        <span id="back" class="fas fa-chevron-left"></span>
      </a>
    </section>
    <section class="p-5" name="person-credits">
      <h1>{{ $t("credits") }}</h1>
      <awesome-swiper
        :mediaItems="getCredits"
        :spaceBetweenProp="10"
        :slidesPerViewProp="10"
      ></awesome-swiper>
    </section>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div id="biography-card" class="card col-11 col-md-7">
          <h2>Biography</h2>
          <p id="biography">{{ getDetails.biography }}</p>
        </div>
        <div
          class="
            col-11 col-md-4
            pt-5
            d-flex
            justify-content-center
            align-items-center
          "
        >
          <a
            target="_blank"
            rel="”noreferrer”"
            :href="'https://www.imdb.com/name/' + getDetails.imdb_id"
          >
            <img src="../assets/imdb.png" style="height: 140px" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div v-else class="router-view container-fluid pb-5">
    <section class="row d-flex justify-content-center" id="hero">
      <img
        id="hero-image"
        :src="img.base_url + img.backdrop_sizes[3] + getDetails.backdrop_path"
        alt="getDetails.title || getDetails.name"
      />
      <div class="img-overlay"></div>
      <div class="row" id="hero-banner">
        <div id="poster_container" class="col-5 col-sm-4 col-md-3">
          <img
            class="poster"
            :src="
              img.base_url +
              img.poster_sizes[3] +
              (getDetails.poster_path || getDetails.profile_path)
            "
          />
        </div>
        <div class="col-md-9 col-sm-8">
          <div class="row align-items-center">
            <span id="title" class="pt-2" title="title"
              >{{ getDetails.title || getDetails.name }}
            </span>
            <span v-if="media_type == 'movie'" id="runtime" title="runtime"
              ><i class="far fa-clock"></i>
              {{ runtime(getDetails.runtime) }}</span
            >
            <div class="col-12 text-left p-0">
              <span v-if="media_type == 'tv'" id="showrunning" title="ran for"
                ><i class="fa fa-book"></i> {{ getDetails.number_of_seasons }}
                {{ $t("seasons") }} /
                {{ getDetails.number_of_episodes }}
                {{ $t("episodes") }}</span
              >
            </div>
            <div class="col-12 text-left">
              <span
                v-if="getDetails.release_date"
                class="mr-3"
                id="year"
                :title="'Released ' + getDetails.release_date"
                >{{ getDetails.release_date.slice(0, -6) }}</span
              >
              <span
                v-if="getDetails.first_air_date"
                class="px-4 py-2 mr-3"
                id="year"
                :title="'First air: ' + getDetails.first_air_date"
                >{{ getDetails.first_air_date.slice(0, -6) }}</span
              >
              <span class="px-4 py-2" id="rating" title="average rating"
                ><i class="fa fa-star"></i> {{ getDetails.vote_average }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <a
        id="back"
        class="fas fa-chevron-left"
        @click="$router.go(-1).catch((e) => {})"
      >
      </a>
      <a
        id="rating-button"
        class="far fa-star rate"
        :class="{ active_rating: ratedBool }"
        @click="showRatingModal = true"
        :title="
          media_type == 'tv'
            ? `Rate this ${media_type} show`
            : `Rate this ${media_type}`
        "
      >
        <div id="user-rating-label">{{ userRating }}</div>
      </a>
      <modal v-if="showRatingModal" @close="showRatingModal = false">
        <template v-slot:header
          >Rate {{ getDetails.name || getDetails.title }}!</template
        >
        <template v-slot:customContent1>
          <star-rating
            @rating-selected="setRating"
            v-model="userRating"
            :increment="0.5"
            :rating="getDetails.vote_average"
            :max-rating="10"
            :star-size="25"
          ></star-rating>
        </template>
      </modal>
      <a
        @click="toggleFavorite"
        class="far fa-bookmark favorite"
        :class="{ active_favorite: favBool }"
        title="Add To My List"
      ></a>
      <auth-modal
        v-if="showAuthModal"
        @close="showAuthModal = false"
        :onlyTmdbModal="onlyTmdbModal"
      ></auth-modal>
    </section>
    <section class="row py-5 justify-content-center" id="details">
      <div class="card col-11 col-md-8 col-xl-5 mx-2" id="overview-card">
        <h2>{{ $t("overview") }}</h2>
        <span>{{ getDetails.overview }}</span>
      </div>
      <div v-if="getDetails.revenue > 0" class="mx-2" id="revenue-card">
        <h2>{{ $t("revenue") }}</h2>
        <div id="revenue">${{ numberWithCommas(getDetails.revenue) }}</div>
      </div>
      <div
        v-if="media_type == 'tv' && getProviders.US.flatrate"
        class="col-11 col-md-8 col-xl-5 m-5"
      >
        <h2>{{ $t("streaming_now") }}</h2>
        <div class="row">
          <div
            v-for="provider in getProviders.US.flatrate"
            :key="provider.provider_id"
            class="col-6 col-sm-3 col-md-2 col-lg-2 pb-2 align-middle"
          >
            <img
              v-if="provider.logo_path"
              id="logo"
              :src="img.base_url + img.logo_sizes[1] + provider.logo_path"
              :title="provider.provider_name"
            />
          </div>
        </div>
      </div>
    </section>
    <div class="studios_container">
      <div
        class="row justify-content-around align-items-center py-5"
        id="studios"
      >
        <div
          v-for="company in getDetails.production_companies"
          :key="company.id"
          class="col-12 col-md-5 col-lg-3 pb-2"
        >
          <img
            v-if="company.logo_path"
            id="logo"
            :src="img.base_url + img.logo_sizes[4] + company.logo_path"
            alt=""
          />
          <h3 v-else>{{ company.name }}</h3>
        </div>
      </div>
    </div>
    <div v-if="getReviews.length" class="container">
      <div class="row justify-content-around py-5" id="">
        <h1>{{ $t("reviews") }}</h1>
        <article
          v-for="review in getReviews"
          :key="review.id"
          id="review"
          class="col-11 px-3 py-5 mb-3"
        >
          <div class="row justify-content-center">
            <div class="col-12 col-md-2">
              <img
                v-if="review.author_details.avatar_path"
                id="profile"
                :src="
                  img.base_url +
                  img.profile_sizes[0] +
                  review.author_details.avatar_path
                "
                alt=""
              />
              <br />
              <span>{{ review.author }}</span>
              <br />
              <span v-if="review.author_details.rating" title="Author's Rating"
                >Rating: {{ review.author_details.rating }}/10</span
              >
            </div>
            <div class="col-12 col-md-10 text-left">
              {{ review.content }}
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AwesomeSwiper from "../components/AwesomeSwiper.vue";
import AuthModal from "../components/AuthModal.vue";
import Modal from "../components/Modal.vue";
import StarRating from "vue-star-rating";

export default {
  name: "ItemDetail",
  components: {
    AwesomeSwiper,
    AuthModal,
    Modal,
    StarRating,
  },
  data() {
    return {
      media_type: this.$route.params.media_type,
      id: this.$route.params.id,
      favBool: false,
      ratedBool: false,
      userRating: null,
      showAuthModal: false,
      showRatingModal: false,
      onlyTmdbModal: false,
    };
  },
  mounted() {
    this.reqDetails({
      media_type: this.media_type,
      id: this.id,
    });
    if (this.media_type == "tv") {
      this.reqProviders({
        media_type: this.media_type,
        id: this.id,
      });
    }
    if (this.media_type !== "person") {
      if (this.getFavoriteMovies) {
        let favMovies = this.getFavoriteMovies;
        for (let i = 0; i < favMovies.length; i++) {
          if (favMovies[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;

      if (this.getFavoriteTv) {
        let favTv = this.getFavoriteTv;
        for (let i = 0; i < favTv.length; i++) {
          if (favTv[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;

      if (this.getRatedMovies) {
        let ratedMovies = this.getRatedMovies;
        for (let i = 0; i < ratedMovies.length; i++) {
          if (ratedMovies[i].id == this.id) {
            this.ratedBool = true;
            this.userRating = ratedMovies[i].rating;
          }
        }
      } else this.ratedBool = false;

      if (this.getRatedTv) {
        let ratedTv = this.getRatedTv;
        for (let i = 0; i < ratedTv.length; i++) {
          if (ratedTv[i].id == this.id) {
            this.ratedBool = true;
            this.userRating = ratedTv[i].rating;
          }
        }
      } else this.ratedBool = false;
    }
  },
  watch: {
    getFavoriteMovies() {
      if (this.getFavoriteMovies) {
        let favMovies = this.getFavoriteMovies;
        for (let i = 0; i < favMovies.length; i++) {
          if (favMovies[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;
    },
    getFavoriteTv() {
      if (this.getFavoriteTv) {
        let favTv = this.getFavoriteTv;
        for (let i = 0; i < favTv.length; i++) {
          if (favTv[i].id == this.id) {
            this.favBool = true;
          }
        }
      } else this.favBool = false;
    },
    // userRating(newVal) {
    //   this.postRatingGetRatings({
    //     rating: newVal,
    //     media_type: this.$route.params.media_type,
    //     media_id: this.id,
    //   });
    // },
  },
  computed: {
    ...mapGetters([
      "getApiConf",
      "getCurrentSessionId",
      "getSession",
      "getDetails",
      "getReviews",
      "getProviders",
      "getCredits",
      "getPersonImages",
      "getFavoriteMovies",
      "getFavoriteTv",
      "getRatedTv",
      "getRatedMovies",
    ]),
    img() {
      return this.getApiConf.images;
    },
  },
  methods: {
    ...mapActions([
      "reqDetails",
      "reqProviders",
      "postFavoriteGetFavorites",
      "postRatingGetRatings",
    ]),
    async toggleFavorite() {
      if (this.getSession) {
        this.favBool = !this.favBool;
        this.postFavoriteGetFavorites({
          media_type: this.$attrs.media_type,
          media_id: this.$route.params.id,
          favorite: this.favBool,
        });
      } else if (this.getCurrentSessionId) {
        this.showAuthModal = true;
        this.onlyTmdbModal = true;
      } else {
        this.showAuthModal = true;
      }
    },
    // async giveRating() {
    //   this.ratedBool = !this.ratedBool;
    //   this.postRatingGetRatings({
    //     media_type: this.$attrs.media_type,
    //     media_id: this.$route.params.id,
    //     rating: this.userRating,
    //   });
    // },
    setRating: function (userSubmittedRating) {
      if (this.getSession) {
        if (this.getCurrentSessionId) {
          this.postRatingGetRatings({
            rating: userSubmittedRating,
            media_type: this.$route.params.media_type,
            media_id: this.id,
          });
          this.ratedBool = true;
        }
      } else {
        this.showAuthModal = true;
      }
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    runtime(time) {
      if (!time) {
        return;
      } else if (time > 60) {
        let hrs = Math.floor(time / 60);
        if (time % 60 !== 0) {
          return hrs + ":" + (time % 60);
        } else {
          return hrs + "hrs";
        }
      } else if (time < 60) {
        return time + "mins";
      }
    },
  },
};
</script>

<style scoped>
#hero {
  position: relative;
  height: 70vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.296);
}
#back,
#back:focus,
.rate,
.favorite {
  font-size: 78px;
  cursor: pointer;
}
#back {
  color: rgb(204, 204, 204);
  position: absolute;
  top: 0;
  left: 0;
  margin: 30px;
  transition: color 0.5s ease-in-out;
}
#back:hover {
  color: white;
}
.rate {
  color: rgba(255, 255, 255, 0.66);
  position: absolute;
  bottom: 0;
  right: 0;
  margin-right: 115px;
  margin-bottom: 60px;
  transition: color 0.5s ease-in-out;
}
.favorite {
  color: rgba(255, 255, 255, 0.66);
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 130px;
  margin-top: 30px;
  transition: color 0.5s ease-in-out;
}
.favorite:hover,
.rate:hover {
  color: white;
}
.active_favorite,
.active_rating {
  color: #42b983;
  text-shadow: 0 0 1.5rem #42b983;
}
.active_favorite:hover,
.active_rating:hover {
  color: #379c6f;
}
#user-rating-label {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 2rem;
  position: absolute;
  width: 60px;
  text-align: center;
  left: 13px;
  top: 75px;
}
.img-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #000;
  opacity: 0.7;
}
#hero-image {
  width: auto;
  position: relative;
}
#poster_container {
  text-align: center;
}
.poster {
  width: 100%;
  border-radius: 15px;
  position: relative;
}
#hero-banner {
  font-size: 4rem;
  line-height: 1;
  color: white;
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 2;
}
#profile-pic {
  font-size: 4rem;
  line-height: 1;
  color: white;
  position: absolute;
  top: 30%;
  left: 10%;
  z-index: 2;
}
#biography-card h2 {
  font-size: 2.5rem;
}
#biography {
  line-height: 2;
}
#biography::first-line {
  font-size: 1.5rem;
}
#biography::first-letter {
  font-size: 2.5rem;
}
#title {
  font-size: 4rem;
  /* background-color: rgba(0, 0, 0, 0.741); */
}
#runtime,
#showrunning {
  font-size: 1.5rem;
}
#runtime {
  padding-left: 1rem;
}
#year,
#rating {
  font-size: 2rem;
  /* background-color: rgba(0, 0, 0, 0.741); */
}

#details {
  color: #fff;
}
.card {
  background-color: rgba(67, 67, 67, 0.275);
  border-radius: 20pt;
  padding: 5rem;
}
#revenue-card {
  font-size: 4rem;
  padding: 5rem;
}
#studios {
  color: black;
  background-color: #e6e6e6;
}
#studios div {
  display: flex;
  justify-content: center;
}
#studios img {
  max-width: 100%;
  max-height: 175px;
}
#review {
  background-color: rgba(67, 67, 67, 0.275);
  border-radius: 20pt;
}
#profile {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
@media screen and (min-width: 575px) and (max-width: 768px) {
  #title {
    font-size: 3rem;
  }
  .favorite {
    top: unset;
    right: unset;
    bottom: 0;
    left: 0;
    margin: 0;
    margin-left: 115px;
    margin-bottom: 60px;
  }
}
@media (max-width: 575px) {
  #hero-banner {
    padding-top: 40px;
    padding-right: 25px;
  }
  #poster_container {
    padding-left: 0;
    text-align: left;
  }
  #title {
    font-size: 2.5rem;
  }
  #runtime {
    font-size: 1rem;
    padding: 0;
    padding-top: 15px;
  }
  .favorite,
  .rate {
    font-size: 3rem;
    margin-right: 30px;
  }
  .rate {
    margin-bottom: 30px;
  }
  #user-rating-label {
    width: 60px;
    font-size: 1.5rem;
    left: -3px;
    top: 45px;
  }
  .card {
    padding: 3rem;
  }
  #revenue-card {
    font-size: 3.5rem;
  }
}
@media (max-width: 400px) {
  #revenue-card {
    font-size: 3rem;
  }
}
@media (max-width: 1200px) {
  #year,
  #rating {
    font-size: 1.75rem;
  }
}
</style>
