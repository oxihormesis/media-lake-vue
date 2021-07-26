<template>
  <b-navbar class="justify-content-around" toggleable="lg" type="dark">
    <b-navbar-brand>
      <router-link :to="{ name: 'Home' }"
        ><span
          style="display: inline-flex; align-items: center; margin-top: 4px"
          >{{ $t("filmlake") }}</span
        ></router-link
      >
    </b-navbar-brand>
    <b-navbar-nav class="mr-auto"> </b-navbar-nav>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse class="justify-content-end" id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav
        class="flex-grow-1 justify-content-end"
        style="align-items: center"
      >
        <b-nav-item class="margin-right mr-auto" left>
          <api-search-form></api-search-form>
        </b-nav-item>
        <b-nav-item class="margin-right" right>
          <router-link :to="{ name: 'Discover' }" style="font-size: 24px">
            <span title="Discover" class="far fa-compass" id="discover"
              ><span class="icon-text"> {{ $t("discover") }}</span></span
            >
          </router-link>
        </b-nav-item>
        <b-nav-item class="margin-right" right>
          <router-link :to="{ name: 'Favorites' }" style="font-size: 24px">
            <span title="Favorites" class="far fa-bookmark"
              ><span class="icon-text"> {{ $t("my_list") }}</span></span
            >
          </router-link>
        </b-nav-item>
        <b-nav-item class="margin-right" right>
          <router-link :to="{ name: 'Ratings' }" style="font-size: 24px">
            <span title="Ratings" class="far fa-star"
              ><span class="icon-text"> {{ $t("my_ratings") }}</span></span
            >
          </router-link>
        </b-nav-item>

        <b-nav-item-dropdown
          class="user"
          v-if="getCurrentSessionId"
          :text="getAccount ? getAccount.username : 'Guest'"
          right
        >
          <b-dropdown-item @click="DeleteSession">{{
            $t("log_out")
          }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item class="user" right v-else-if="!getCurrentSessionId">
          <a id="show-modal" @click="showModal = true">
            <span>{{ $t("sign_in") }}</span>
          </a>
          <auth-modal v-if="showModal" @close="showModal = false"></auth-modal>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import ApiSearchForm from "./ApiSearchForm.vue";
import AuthModal from "./AuthModal.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ApiSearchForm,
    AuthModal,
  },
  data: function () {
    return {
      showModal: false,
    };
  },
  computed: {
    ...mapGetters(["getCurrentSessionId", "getAccount"]),
  },
  methods: {
    ...mapActions(["DeleteSession"]),
  },
};
</script>

<style lang="scss">
.navbar {
  padding: 10px 30px 10px 160px;
  border-bottom: 1px solid #42b983;
  background: linear-gradient(
    160.68deg,
    #0f495c 0%,
    #0d3640 49.72%,
    #08141f 100%
  );

  a {
    font-weight: bold;
  }
}
.navbar-brand {
  font-family: Bebas-Neue;
  font-size: 36px;
}
// .navbar-toggler {
//   color: #42b983;
// }
.navbar-toggler,
.navbar-toggler:hover,
.navbar-toggler:focus {
  border: 0;
}
.margin-right {
  margin-right: 40px;
}
.icon-text {
  font-size: 18px;
  vertical-align: middle;
  font-family: Metropolis-Regular, Avenir, Helvetica, Arial, sans-serif;
}
.user {
  font-size: 16px;
}
#show-modal:hover {
  color: rgb(168, 168, 168);
}
#show-modal {
  color: lightgray;
  padding: 10px;
  border: 1px solid #42b983;
  border-radius: 7px;
}

@media only screen and (max-width: 1472px) {
  .navbar {
    padding: 10px 25px;
  }
  .margin-right {
    margin-right: 5px;
  }
  .icon-text {
    font-size: 16px;
  }
}
@media only screen and (max-width: 300px) {
  .navbar {
    padding: 0px 10px;
  }
  #nav-collapse {
    padding-bottom: 10px;
  }
  .margin-right {
    margin-right: 5px;
  }
}
</style>
