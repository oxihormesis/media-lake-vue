<template>
  <b-nav-form @submit.prevent="onSubmit">
    <div class="row no-gutters align-items-center">
      <transition name="slide-fade">
        <div class="input_container col">
          <input
            ref="input"
            class="form-control rounded-pill pr-5"
            id="search-input"
            type="text"
            v-model="search"
            :placeholder="$t('search_content')"
            v-show="showInput"
            @blur="handleBlur"
          />
        </div>
      </transition>
      <div class="col-auto">
        <button
          class="btn btn-outline-success text-dark border-0 rounded-pill"
          type="button"
          @click="buttonHandler"
        >
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </b-nav-form>
  <!-- <b-nav-form @submit.prevent="onSubmit">
          <b-form-input size="lg" class="mr-sm-2" id="search-input" type="text" v-model="search" placeholder="Search content"></b-form-input>
          <b-button size="lg" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
  <!-- <form @submit.prevent="onSubmit">
            <div class="row justify-content-center">
                <div class="col-11 col-md-10 col-lg-7 col-xl-5">
                    <input id="search-input" type="text" v-model="search" placeholder="Search content" />
                </div>
            </div>
        </form> -->
</template>

<script>
/* import { BIconstack, BIcon } from 'bootstrap-vue' */
import { mapActions } from "vuex";

export default {
  /*components: {
        BIcon,
        BIconstack
    },*/
  name: "ApiSearchForm",
  data() {
    return {
      search: "",
      showInput: false,
    };
  },
  methods: {
    ...mapActions({ searchTMDB: "search/searchTMDB" }),
    buttonHandler() {
      if (!this.showInput) {
        this.showInput = true;
        this.$nextTick(() => this.$refs.input.focus());
      } else if (this.showInput && !this.search) {
        this.showInput = false;
      } else this.onSubmit();
    },
    handleBlur(e) {
      if (!this.search) {
        e.target.placeholder = this.$t("still_be_here");
        setTimeout(() => {
          this.showInput = false;
          e.target.placeholder = this.$t("search_content");
        }, 1500);
      } else this.showInput = false;
    },
    onSubmit() {
      if (this.search === "") {
        return;
      }
      this.searchTMDB({ searchTerm: this.search });
      // this.searchTMDB(this.search)
      this.$router.push({
        name: "SearchResults",
        params: { type: "multi", data: this.search },
      });
      this.search = "";
    },
    //     searchTMDB: function (searchTerm) {
    //         this.$http.get(this.$store.state.baseURI + this.$store.state.endpoint.multiSearch + this.$store.state.keyPref+this.$store.state.apiV3Key + "&language=en-US&query=" + searchTerm + "&page=1&include_adult=false")
    //         .then((response) => {
    //         const items = response.data.results.filter(item => item.poster_path != null)
    //         console.log(items);
    //         var movies = items.filter(item => item.media_type.includes("movie"))
    //         this.$store.commit('updateMovieItems', {data: movies})
    //         var tv = items.filter(item => item.media_type.includes("tv"))
    //         this.$store.commit('updateTvItems', {data: tv})
    //         var persons = items.filter(item => item.media_type.includes("person"))
    //         this.$store.commit('updatePersonItems', {data: persons})
    //         console.log("movieItems: ", this.$store.state.movieItems);
    //     })
    // }
  },
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1.5s ease;
  transition-property: width;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
  width: 0;
}

input::placeholder,
.fa-search {
  /* color: rgb(46, 46, 46); */
  color: rgba(255, 255, 255, 0.692);
  font-size: 1.2em;
}
#search-input {
  box-shadow: 0;
  text-indent: 10px;
  height: 2.5rem;
  width: auto;
  border-width: 1px;
  border-inline-color: green;
  border-style: solid;
  border-block-color: green;
  color: rgba(255, 255, 255);
  border-radius: 20pt;
  background: #ffffff2c;
  margin-right: -2.8rem;
  /* transition: display 0.15s ease-in-out, box-shadow 0.15s ease-in-out; */
}
#search-input:focus {
  box-shadow: 0 0 0 0.5rem rgba(55, 249, 212, 0.07);
}
.btn-outline-success {
  background-color: #42b983;
}
.btn-outline-success:hover {
  background-color: #279741;
}
</style>
