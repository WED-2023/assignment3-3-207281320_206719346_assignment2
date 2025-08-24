<template>
  <DefaultLayout>
    <div
      class="container d-flex flex-column align-items-center justify-content-center"
      style="height: 70vh"
    >
      <h1 class="text-center">404 - NOT FOUND</h1>
      <img
        src="@/assets/et.jpeg"
        alt="ET"
        class="mb-4"
        style="max-width: 400px; width: 100%; border-radius: 50%"
      />
      <router-link to="/" exact class="btn btn-primary">ET Go Home</router-link>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  components: {
    DefaultLayout,
  },
  mounted() {
    document.title = "Grandma's Recipes - Not Found";
  },
};
</script>
