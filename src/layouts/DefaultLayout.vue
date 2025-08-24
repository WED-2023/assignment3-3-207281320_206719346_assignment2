<template>
  <div class="layout-wrapper">
    <MainNavbar @recipe-created="handleRecipeCreated" />
    <b-container class="content-container pb-3">
      <!-- Page Title -->
      <PageTitle v-if="title">{{ title }}</PageTitle>
      <!-- Page Content -->
      <slot />
    </b-container>
    <PageFooter />
  </div>
</template>

<script>
import MainNavbar from "@/components/global/MainNavbar.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import PageFooter from "@/components/global/PageFooter.vue";
export default {
  name: "DefaultLayout",
  components: { MainNavbar, PageTitle, PageFooter },
  props: {
    title: String,
  },
  methods: {
    handleRecipeCreated(recipe) {
      this.$emit("recipe-created", recipe);
    },
  },
};
</script>
