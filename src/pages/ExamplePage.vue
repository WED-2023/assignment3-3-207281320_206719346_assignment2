<template>
  <TwoColumnLayout>
    <template #left>
      <PageTitle>Random Recipes</PageTitle>
      <RecipePreviewList />
    </template>
    <template #right> <RegisterForm /> </template>
  </TwoColumnLayout>
</template>

<script>
import TwoColumnLayout from "../layouts/TwoColumnLayout.vue";
import RecipePreviewList from "../components/RecipePreviewList.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";

export default {
  name: "ExamplePage",
  components: {
    TwoColumnLayout,
    RecipePreviewList,
    PageTitle,
    RegisterForm,
  },
};
</script>
