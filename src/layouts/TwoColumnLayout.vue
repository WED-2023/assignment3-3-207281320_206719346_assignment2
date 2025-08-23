<template>
  <div class="layout-wrapper">
    <MainNavbar />
    <b-container class="content-container fluid pb-3">
      <!-- Page Title -->
      <PageTitle v-if="title">{{ title }}</PageTitle>
      <!-- Page Content -->
      <b-row>
        <!-- Left column -->
        <b-col cols="12" md="6">
          <slot name="left" />
        </b-col>
        <!-- Right column -->
        <b-col cols="12" md="6">
          <slot name="right" />
        </b-col>
      </b-row>
    </b-container>
    <PageFooter />
  </div>
</template>

<script>
import MainNavbar from "@/components/global/MainNavbar.vue";
import PageTitle from "@/components/global/PageTitle.vue";
import PageFooter from "@/components/global/PageFooter.vue";
export default {
  name: "TwoColumnLayout",
  components: { MainNavbar, PageTitle, PageFooter },
  props: {
    title: String,
  },
};
</script>
