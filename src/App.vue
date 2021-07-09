<template>
  <div id="app">
    <header>
      <navbar />
    </header>
    <main class="min-vh-100">
      <router-view />
    </main>
    <select class="lang-selector" text="Lang" v-model="selectedLang" @change="reloadPage">
      <option disabled value="">Lang</option>
      <option value="en"> eng</option>
      <option value="es"> es</option>
      <option value="fr"> fr</option>
      <option value="ru"> ru</option>
    </select>
    <main-footer></main-footer>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Navbar from "./components/Navbar.vue";
import MainFooter from "./components/MainFooter.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    MainFooter,
    Navbar
  },
  data: function() {
    return {
      selectedLang: "en"
    };
  },
  computed: {
    ...mapGetters(["getApiConf", "getLang"]),
    authSuccess() {
      return this.$route.query.request_token;
    },
  },
  methods: {
    ...mapActions(["reqApiConfs", "createSessionGetAccount", "reqSessionToken"]),
    ...mapMutations(["updateLang"]),
    reloadPage(){
      window.location.reload()
    }
  },
  mounted() {
      this.getLang ? this.selectedLang = this.getLang : this.selectedLang
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler(newVal) {
        if (this.$store.state.Session) {
          return;
        } else if (newVal.approved == "true") {
          this.createSessionGetAccount({
            approved_token: newVal.request_token
          });
        } else {
          console.log("TMDB Auth Not Yet Granted");
        }
      }
    },
    selectedLang(newVal){
      this.updateLang({ lang: newVal })
    }
  },
  created() {
    this.reqSessionToken();
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Metropolis-Black";
  src: local("Metropolis-Black"),
    url(./fonts/Metropolis/Metropolis-Black.otf) format("opentype");
}
@font-face {
  font-family: "Bebas-Neue";
  src: local("BebasNeue-Regular"),
    url(./fonts/BebasNeue-Regular.otf) format("opentype");
}
@font-face {
  font-family: "Metropolis-Regular";
  src: local("Metropolis-Regular"),
    url(./fonts/Metropolis/Metropolis-Regular.otf) format("opentype");
}
@font-face {
  font-family: "Metropolis-Bold";
  src: local("Metropolis-Bold"),
    url(./fonts/Metropolis/Metropolis-Bold.otf) format("opentype");
}
@font-face {
  font-family: "Cocon";
  src: local("Cocon-Regular-Font"),
    url(./fonts/Cocon/Cocon-Regular-Font.otf) format("opentype");
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;
}
#app {
  font-family: Metropolis-Regular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: rgb(7, 14, 22);
}
h1,
h2 {
  font-family: Bebas-Neue;
}
a {
  text-emphasis: none;
  text-decoration: none;
  color: white;
}
a:hover {
  color: white;
  text-emphasis: none;
  text-decoration: none;
  opacity: 1;
}
.router-view {
  background: linear-gradient(
    -90.68deg,
    #061c24e1 0%,
    #082025f3 49.72%,
    #09252cd5 100%
  );
}
.lang-selector {
  padding: 5px;
  z-index: 99;
  color: lightgray;
  background-color: rgba(0, 0, 0, 0.74);
  border: 1px solid grey;
  border-width: 1px 0 0 1px;
  border-radius: 7px 7px 0 0;
  list-style: none;
  position: absolute;
  bottom: 0;
  right: 15px;
  cursor: pointer;
}
.dropdown-toggle {
  color: rgb(187, 187, 187);
}
.dropdown-toggle:hover {
  color: grey;
}
.dropdown-menu {
  background-color: #0f4455;

  li > a {
    color: white;
  }
}
    
// [v-cloak] > * {
//   display: none;
// }
// [v-cloak] {
//   content: "Loading";
//   display: block;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     -90.68deg,
//     #061c24e1 0%,
//     #3bb114f3 49.72%,
//     #09252cd5 100%
//   );
//   background-image: url("./assets/primary-short.svg");
// }
</style>
