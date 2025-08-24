import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: () => import("../pages/HomePage.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("../pages/RecipeViewPage.vue"),
  },
  {
    path: "/example",
    name: "example",
    component: () => import("../pages/ExamplePage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: "/my-recipes",
    name: "my-recipes",
    component: () => import("../pages/MyRecipesPage.vue"),
  },
  {
    path: "/my-favorites",
    name: "my-favorites",
    component: () => import("../pages/MyFavoritesPage.vue"),
  },
  {
    path: "/family-recipes",
    name: "family-recipes",
    component: () => import("../pages/FamilyRecipesPage.vue"),
  },
  {
    path: "/make-meal/:recipeId",
    name: "make-meal",
    component: () => import("../pages/MakeMealPage.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
