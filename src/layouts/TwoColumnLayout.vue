<template>
  <div class="layout-wrapper">
    <MainNavbar />
    <b-container class="content-container fluid">
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
  </div>
</template>

<script>
import MainNavbar from "@/components/global/MainNavbar.vue";
import PageTitle from "@/components/global/PageTitle.vue";

export default {
  name: "TwoColumnLayout",
  components: { MainNavbar, PageTitle },
  props: {
    title: String,
  },
};
</script>
