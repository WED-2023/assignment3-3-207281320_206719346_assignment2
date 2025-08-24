<template>
  <TwoColumnLayout>
    <template #left>
      <PageTitle>Recipes</PageTitle>
      <RecipePreviewList />
    </template>
    <template #right>
      <!-- Not logged user -->
      <div v-if="!store.username">
        <PageTitle>Welcome, guest</PageTitle>
        <h3>Login</h3>
        <p>To get started, please login or register.</p>
        <LoginForm />
      </div>
      <!-- Logged user -->
      <div v-else>
        <PageTitle>Last Viewed Recipes</PageTitle>
        <RecipeLastViewed />
      </div>
    </template>
  </TwoColumnLayout>
</template>

<script>
import RecipePreviewList from "@/components/RecipePreviewList.vue";
import RecipeLastViewed from "@/components/RecipeLastViewed.vue";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import LoginForm from "@/components/forms/LoginForm.vue";

export default {
  name: "HomePage",
  components: {
    TwoColumnLayout,
    RecipePreviewList,
    RecipeLastViewed,
    PageTitle,
    LoginForm,
  },
  computed: {
    store() {
      return this.$root.store;
    },
  },
};
</script>
