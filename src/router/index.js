/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Discover from "../views/Discover.vue";
import SearchResults from "../views/SearchResults.vue";
import ItemDetail from "../views/ItemDetail.vue";
import Favorites from "../views/Favorites.vue"
import Ratings from "../views/Ratings.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/discover",
    name: "Discover",
    component: Discover
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites
  },
  {
    path: "/ratings",
    name: "Ratings",
    component: Ratings
  },
  {
    path: "/search/:type/:data",
    name: "SearchResults",
    component: SearchResults
  },
  {
    path: "/:media_type/:id",
    name: "ItemDetail",
    props: true,
    component: ItemDetail
  },
  {
    path: "/auth",
    name: "Auth"
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
