<template>
  <div class="layout-wrapper">
    <MainNavbar />
    <b-container class="content-container">
      <slot />
    </b-container>
  </div>
</template>

<script>
import MainNavbar from "@/components/global/MainNavbar.vue";
export default {
  name: "DefaultLayout",
  components: { MainNavbar },
};
</script>
