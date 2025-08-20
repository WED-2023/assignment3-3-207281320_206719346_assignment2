<template>
  <TwoColumnLayout title="Example Page">
    <!-- Left column -->
    <template #left>
      <h1>one</h1>
    </template>
    <!-- Right column -->
    <template #right>
      <h1>two</h1>
    </template>
  </TwoColumnLayout>
</template>

<script>
import TwoColumnLayout from "../layouts/TwoColumnLayout.vue";

export default {
  name: "ExamplePage",
  components: {
    TwoColumnLayout,
  },
};
</script>
