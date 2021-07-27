/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex, { Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

import Axios from "axios";

//----------RESOURCES-------------
const baseURI = "https://api.themoviedb.org/3";
const keyPrefix = "?api_key=";
const apiV3Key = "a6817d1e66ed3d6719d7f43eb77d2969";
const keyQuery = keyPrefix + apiV3Key;
const sessionPrefix = "&session_id=";
const guestSessionPrefix = "&guest_session_id=";
const apiconfiguration = baseURI + "/configuration";
const SessionToken = baseURI + "/authentication/token/new";
const CreateSession = baseURI + "/authentication/session/new";
const DeleteSession = baseURI + "/authentication/session";
const CreateGuestSession = baseURI + "/authentication/guest_session/new";
const langPrefix = "&language="
const languages = "/configuration/languages"
const genres = { movie: "/genre/movie/list", tv: "/genre/tv/list" };

const endpoint = {
  details: { append: "&append_to_response=" },
  reviews: "/reviews",
  providers: "/watch/providers",
  credits: "/combined_credits",
  trending: {
    all: "/trending/all/day",
    movie: "/trending/movie/day",
    tv: "/trending/tv/day",
    person: "/trending/person/day"
  },
  multiSearch: "/search/multi"
};

const store = new Vuex.Store({
  state: {
    Lang: "en",
    ApiConf: [],
    Token: null,
    Session: null,
    GuestSession: null,
    CurrentSessionId: null,
    Account: null,
    FavoriteMovies: null,
    FavoriteTv: null,
    RatedMovies: null,
    RatedTv: null,
    MovieGenres: null,
    TvGenres: null,
    Movies: [],
    Tv: [],
    People: [],
    DiscoverItems: null,
    DiscoverMovies: null,
    DiscoverQuery: null,
    DiscoverPage: null,
    DiscoverTv: null,
    details: [],
    Reviews: [],
    Providers: [],
    Credits: [],
    PersonImages: null
  },
  mutations: {
    updateLang(state, payload) {
      state.Lang = payload.lang;
    },
    updateApiConf(state, payload) {
      state.ApiConf = payload.data;
    },
    updateToken(state, payload) {
      state.Token = payload.data;
    },
    updateSession(state, payload) {
      state.Session = payload.data;
    },
    updateGuestSession(state, payload) {
      state.GuestSession = payload.data;
    },
    updateCurrentSessionId(state, payload) {
      state.CurrentSessionId = payload.data;
    },
    updateAccount(state, payload) {
      state.Account = payload.data;
    },
    updateFavoriteMovies(state, payload) {
      state.FavoriteMovies = payload.data;
    },
    updateFavoriteTv(state, payload) {
      state.FavoriteTv = payload.data;
    },
    updateRatedMovies(state, payload) {
      state.RatedMovies = payload.data;
    },
    updateRatedTv(state, payload) {
      state.RatedTv = payload.data;
    },
    updateMovieGenres(state, payload) {
      state.MovieGenres = payload.data;
    },
    updateTvGenres(state, payload) {
      state.TvGenres = payload.data;
    },
    updateDiscoverItems(state, payload) {
      state.DiscoverItems = payload.data;
    },
    updateDiscoverMovies(state, payload) {
      state.DiscoverMovies = payload.data;
    },
    updateDiscoverTv(state, payload) {
      state.DiscoverTv = payload.data;
    },
    updateDiscoverQuery(state, payload) {
      state.DiscoverQuery = payload.data;
    },
    updateDiscoverPage(state, payload) {
      state.DiscoverPage = payload.data;
    },
    updateMovieTrending(state, payload) {
      // let obj = {};
      // obj["movies"] = payload.data;
      // state.TrendingItems.movies.push(obj);
      state.Movies = payload.data;
    },
    updateTvTrending(state, payload) {
      // let obj = {};
      // obj["tv"] = payload.data;
      // state.TrendingItems.push(obj);
      state.Tv = payload.data;
    },
    updatePersonTrending(state, payload) {
      // let obj = {};
      // obj["people"] = payload.data;
      // state.TrendingItems.push(obj);
      state.People = payload.data;
    },
    updateDetails(state, payload) {
      state.details = payload.data;
    },
    updateReviews(state, payload) {
      state.Reviews = payload.data;
    },
    updateProviders(state, payload) {
      state.Providers = payload.data;
    },
    updateCredits(state, payload) {
      state.Credits = payload.data;
    },
    updatePersonImages(state, payload) {
      state.PersonImages = payload.data;
    }
  },
  actions: {
    reqApiConfs: function ({ commit }) {
      Axios.get(apiconfiguration + keyQuery).then(response => {
        let images = response.data.images;
        let change_keys = response.data.change_keys;
        let confs = {};
        confs["images"] = images;
        confs["change_keys"] = change_keys;
        // console.log("apiConfigs: ", confs);
        commit("updateApiConf", { data: confs });
      });
      let getGenres = mediaType => {
        Axios.get(baseURI + genres[mediaType] + keyQuery).then(response => {
          let genres = response.data.genres;
          var genresReduced = genres.reduce(function (result, currentObject) {
            result[currentObject.id] = currentObject.name;
            return result;
          }, {});
          // console.log("genresReduced: ", genresReduced)
          mediaType == "movie"
            ? commit("updateMovieGenres", { data: genresReduced })
            : commit("updateTvGenres", { data: genresReduced });
        });
      };
      if (!this.state.MovieGenres) {
        getGenres("movie");
      }
      if (!this.state.TvGenres) {
        getGenres("tv");
      }
    },
    reqSessionToken({ commit }) {
      Axios.get(SessionToken + keyQuery).then(response => {
        let token = response.data;
        commit("updateToken", { data: token });
      });
    },
    createSessionGetAccount({ commit, dispatch }, payload) {
      Axios.post(
        CreateSession + keyQuery,
        {
          request_token: payload.approved_token
        },
        {
          headers: {
            Authorization: "Basic xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        let session = response.data;
        console.log("Session: ", session);
        commit("updateSession", { data: session });
        commit("updateCurrentSessionId", { data: session.session_id });
        console.log("Session read from state: ", this.state.Session.session_id);
        dispatch("requestAccount");
        dispatch("getFavorites", {
          media_type: "movie"
        });
        dispatch("getFavorites", {
          media_type: "tv"
        });
        dispatch("getRatings")
      });
    },
    requestAccount({ commit }) {
      Axios.get(
        baseURI +
        "/account" +
        keyQuery +
        sessionPrefix +
        this.state.Session.session_id
      ).then(response => {
        let account = response.data;
        console.log("account details: ", account);
        commit("updateAccount", { data: account });
      });
    },
    DeleteSession({ commit }) {
      let deleteSession = () => {
        console.log("session_id to delete: ", this.state.Session.session_id);
        Axios.delete(DeleteSession + keyQuery, {
          headers: {
            Authorization: "Basic xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json"
          },
          data: {
            session_id: this.state.Session.session_id
          }
        }).then(response => {
          let res = response.data;
          console.log("Deleted Session: ", res);
          commit("updateSession", { data: null });
          commit("updateAccount", { data: null });
          commit("updateCurrentSessionId", { data: null });
          commit("updateFavoriteMovies", { data: null });
          commit("updateFavoriteTv", { data: null });
          commit("updateRatedMovies", { data: null });
          commit("updateRatedTv", { data: null });
        });
      };
      if (this.state.GuestSession) {
        if (
          this.state.CurrentSessionId ==
          this.state.GuestSession.guest_session_id
        ) {
          let empty = null;
          commit("updateCurrentSessionId", { data: empty });
          commit("updateFavoriteMovies", { data: null });
          commit("updateFavoriteTv", { data: null });
          commit("updateRatedMovies", { data: null });
          commit("updateRatedTv", { data: null });
        } else {
          deleteSession();
        }
      } else {
        deleteSession();
      }
    },
    createGuestSession({ commit }) {
      let createGuestSession = () => {
        Axios.get(CreateGuestSession + keyQuery).then(response => {
          let guestSession = response.data;
          console.log("Guest Session: ", guestSession);
          commit("updateGuestSession", { data: guestSession });
          commit("updateCurrentSessionId", {
            data: guestSession.guest_session_id
          });
        });
      };
      if (this.state.GuestSession) {
        if (this.state.GuestSession.expires_at) {
          let currentSessionId = this.state.GuestSession.guest_session_id;
          commit("updateCurrentSessionId", { data: currentSessionId });
        } else {
          createGuestSession();
        }
      } else {
        createGuestSession();
      }
    },
    postFavoriteGetFavorites({ dispatch }, payload) {
      if (this.state.account) {
        var account_id_optional = this.state.account.acount_id;
      } else {
        account_id_optional = "/account_id";
      }
      if (!this.state.CurrentSessionId) {
        return Error("No CurrentSessionId");
      }
      Axios.post(
        baseURI +
        "/account" +
        account_id_optional +
        "/favorite" +
        keyQuery +
        sessionPrefix +
        this.state.CurrentSessionId,
        {
          media_type: payload.media_type,
          media_id: payload.media_id,
          favorite: payload.favorite
        },
        {
          headers: {
            Authorization: "Basic xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        let favoriteConfirmed = response.data;
        console.log("Favorite Confirmation: ", favoriteConfirmed);
        dispatch("getFavorites", { media_type: payload.media_type });
      });
    },
    getFavorites({ commit }, payload) {
      if (this.state.account) {
        var account_id_optional = this.state.account.acount_id;
      } else {
        account_id_optional = "/account_id";
      }
      let movieOrTv = payload.media_type == "movie" ? "/movies" : "/tv";
      Axios.get(
        baseURI +
        "/account" +
        account_id_optional +
        "/favorite" +
        movieOrTv +
        keyQuery +
        sessionPrefix +
        this.state.CurrentSessionId
      ).then(response => {
        let Favorites = response.data.results;
        console.log("Favorites: ", Favorites);
        if (payload.media_type == "movie") {
          commit("updateFavoriteMovies", {
            data: Favorites
          });
        } else {
          commit("updateFavoriteTv", {
            data: Favorites
          });
        }
      });
    },
    postRatingGetRatings({ dispatch }, payload) {
      // var optionalSesh
      // if (!this.state.CurrentSessionId) {
      //   optionalSesh = "";
      // }
      // else if (this.state.GuestSession) {
      //   if (this.state.CurrentSessionId == this.state.GuestSession.guest_session_id)
      //     optionalSesh = guestSessionPrefix + this.state.CurrentSessionId
      // }
      // else if (this.state.Session) {
      //   if (this.state.CurrentSessionId == this.state.Session.session_id)
      //     optionalSesh = sessionPrefix + this.state.CurrentSessionId
      // }
      Axios.post(
        baseURI +
        "/" + payload.media_type + "/" +
        payload.media_id +
        "/rating" +
        keyQuery +
        sessionPrefix + this.state.CurrentSessionId,
        {
          value: payload.rating,
        },
        {
          headers: {
            Authorization: "Basic xxxxxxxxxxxxxxxxxxx",
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        let ratingConfirmed = response.data;
        console.log("rating Confirmation: ", ratingConfirmed);
        dispatch("getRatings");
      });
    },
    getRatings({ commit }, payload) {
      if (this.state.account) {
        var account_id_optional = this.state.Account.id;
      } else {
        account_id_optional = "/account_id";
      }


      if (!this.state.CurrentSessionId) {
        return new Error("There isn't a CurrentSessionId for getRatings");
      }
      // else {
      //   if (this.state.GuestSession) {
      //     if (this.state.CurrentSessionId == this.state.GuestSession.guest_session_id)
      //       var requiredSesh = guestSessionPrefix + this.state.CurrentSessionId
      //   }
      //   else if (this.state.Session) {
      //     if (this.state.CurrentSessionId == this.state.Session.session_id)
      //       requiredSesh = sessionPrefix + this.state.CurrentSessionId
      //   }

      Axios.get(baseURI +
        '/account/' + account_id_optional + '/rated/movies' + keyQuery + sessionPrefix + this.state.CurrentSessionId)
        .then(response => {
          let ratedMovies = response.data.results;
          commit("updateRatedMovies", { data: ratedMovies });
        });
      Axios.get(baseURI +
        '/account/' + account_id_optional + '/rated/tv' + keyQuery + sessionPrefix + this.state.CurrentSessionId)
        .then(response => {
          let ratedTV = response.data.results;
          commit("updateRatedTv", { data: ratedTV });
        });
    },


    reqDetails({ commit }, payload) {
      console.log("payload: ", payload);
      Axios.get(
        baseURI + "/" + payload.media_type + "/" + payload.id + keyQuery
      ).then(response => {
        let details = response.data;
        // console.log("details: ", details);
        console.log("details: ", response);
        console.log(
          "details req: ",
          baseURI +
          "/" +
          payload.media_type +
          "/" +
          payload.id +
          keyPrefix +
          apiV3Key
        );
        commit("updateDetails", { data: details });
        ////We can consider having a different mutation for each media type which provides better debugging and tracing as we're mutating a single store object with one action that utilizes 3+ different data resources(api endpoints)
        // if (payload.media_type == "movie") {
        //   commit('updateMovieDetails', {data: details})
        // }
        // else if (payload.media_type == "tv") {
        //   commit('updateTvDetails', {data: details})
        // }
      });
      if (payload.media_type == "person") {
        Axios.get(
          baseURI +
          "/" +
          payload.media_type +
          "/" +
          payload.id +
          "/combined_credits" +
          keyPrefix +
          apiV3Key
        ).then(response => {
          let credits = response.data.cast;
          console.log(credits);
          commit("updateCredits", { data: credits });
        });
        Axios.get(
          baseURI +
          "/" +
          payload.media_type +
          "/" +
          payload.id +
          "/images" +
          keyPrefix +
          apiV3Key
        ).then(response => {
          let images = response.data.profiles;
          console.log(images);
          commit("updatePersonImages", { data: images });
        });
      } else {
        Axios.get(
          baseURI +
          "/" +
          payload.media_type +
          "/" +
          payload.id +
          endpoint.reviews +
          keyPrefix +
          apiV3Key
        )
          .then(response => {
            let reviews = response.data.results;
            // console.log("reviews: ", reviews);
            commit("updateReviews", { data: reviews });
          })
          .catch(function (error) {
            console.log("Reviews request failed", error);
          });
      }
    },
    reqProviders({ commit }, payload) {
      Axios.get(
        baseURI +
        "/" +
        payload.media_type +
        "/" +
        payload.id +
        endpoint.providers +
        keyPrefix +
        apiV3Key
      )
        .then(response => {
          let providers = response.data.results;
          // console.log("providers: ", providers);
          commit("updateProviders", { data: providers });
        })
        .catch(function (error) {
          console.log("Get watch providers request failed", error);
        });
    },
    searchTrending({ commit }) {
      Axios.get(baseURI + endpoint.trending.movie + keyQuery).then(response => {
        let movies = response.data.results;
        commit("updateMovieTrending", { data: movies });
      });
      Axios.get(baseURI + endpoint.trending.tv + keyQuery).then(response => {
        let tv = response.data.results;
        commit("updateTvTrending", { data: tv });
      });
      Axios.get(baseURI + endpoint.trending.person + keyQuery).then(
        response => {
          let persons = response.data.results.filter(
            item => item.profile_path != null
          );
          // console.log(persons);
          commit("updatePersonTrending", { data: persons });
        }
      );
    },
    discoverTMDB({ commit }, payload) {
      let movies = this.state.DiscoverMovies;
      let tv = this.state.DiscoverTv;
      let mediaType = payload.media_type;
      let query = this.state.discoverQuery;
      let page = this.state.discoverPage;
      if (this.state.DiscoverItems) {
        if (
          mediaType == "movie" &&
          movies &&
          query == payload.query &&
          page == payload.page &&
          payload.year
        ) {
          commit("updateDiscoverItems", { data: movies });
        } else if (
          mediaType == "tv" &&
          tv &&
          query == payload.query &&
          page == payload.page &&
          payload.year
        ) {
          commit("updateDiscoverItems", { data: tv });
        }
      }
      if (payload.year) {
        var year = "&year=" + payload.year;
      } else year = "";
      if (payload.genres) {
        var genresQuery = payload.genres.split(",").join("%2C");
      } else {
        genresQuery = "";
      }
      Axios.get(
        baseURI +
        "/discover/" +
        mediaType +
        keyPrefix +
        apiV3Key +
        "&language=en-US" +
        "&sort_by=" +
        payload.query +
        "&include_adult=false&include_video=false&page=" +
        payload.page +
        year +
        genresQuery
      ).then(response => {
        const items = response.data.results.filter(
          item => item.poster_path != null
        );
        // console.log("discover items: ", items);
        if (mediaType == "movie") {
          commit("updateDiscoverMovies", { data: items });
        } else if (mediaType == "tv") {
          commit("updateDiscoverTv", { data: items });
        }
        commit("updateDiscoverQuery", { data: payload.query });
        commit("updateDiscoverPage", { data: payload.page });
        commit("updateDiscoverItems", { data: items });
      });
    }
  },
  getters: {
    getLang: state => state.Lang,
    getApiConf: state => state.ApiConf,
    getToken: state => state.Token,
    getSession: state => state.Session,
    getGuestSession: state => state.GuestSession,
    getCurrentSessionId: state => state.CurrentSessionId,
    getAccount: state => state.Account,
    getFavoriteMovies: state => state.FavoriteMovies,
    getFavoriteTv: state => state.FavoriteTv,
    getRatedMovies: state => state.RatedMovies,
    getRatedTv: state => state.RatedTv,
    getMovieGenres: state => state.MovieGenres,
    getTvGenres: state => state.TvGenres,
    getDiscoverItems: state => state.DiscoverItems,
    getDetails: state => state.details,
    getReviews: state => state.Reviews,
    getProviders: state => state.Providers,
    getCredits: state => state.Credits,
    getPersonImages: state => state.PersonImages,
    getMovieTrending: state => state.Movies,
    getTvTrending: state => state.Tv,
    getPeopleTrending: state => state.People
  },
  modules: {
    search: {
      namespaced: true,
      // module assets
      state: () => ({
        movieItems: null,
        tvItems: null,
        personItems: null,
        searchTerm: null
      }), // module state is already nested and not affected by namespace option
      getters: {
        getMovieItems: state => state.movieItems,
        getTvItems: state => state.tvItems,
        getPersonItems: state => state.personItems
      },
      actions: {
        searchTMDB({ commit, state }, payload) {
          Axios.get(
            baseURI +
            endpoint.multiSearch +
            keyPrefix +
            apiV3Key +
            "&language=en-US&query=" +
            payload.searchTerm +
            "&page=1&include_adult=false"
          ).then(response => {
            const items = response.data.results.filter(
              item => item.poster_path != null || item.profile_path != null
            );
            console.log(items);
            var movies = items.filter(item =>
              item.media_type.includes("movie")
            );
            commit("updateMovieItems", { data: movies });
            var tv = items.filter(item => item.media_type.includes("tv"));
            commit("updateTvItems", { data: tv });
            var persons = items.filter(item =>
              item.media_type.includes("person")
            );
            commit("updatePersonItems", { data: persons });
            console.log("movieItems: ", state.movieItems);
          });
        } // -> dispatch('search/TMDB')
      },
      mutations: {
        updateMovieItems(state, payload) {
          state.movieItems = payload.data;
        },
        updateTvItems(state, payload) {
          state.tvItems = payload.data;
        },
        updatePersonItems(state, payload) {
          state.personItems = payload.data;
        },
        updateSearchTerm(state, payload) {
          state.SearchTerm = payload.data;
        }
      }
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      },
      paths: [
        "Lang",
        "Session",
        "GuestSession",
        "CurrentSessionId",
        "Account",
        "FavoriteMovies",
        "FavoriteTv",
        "RatedMovies",
        "RatedTv",
        "MovieGenres",
        "TvGenres",
        "search"
      ]
    })
  ]
});

Axios.interceptors.request.use(request => {
  if (request.method == 'get') {
    request.url = request.url + langPrefix + store.state.Lang;
  }
  return request;
});

export default store