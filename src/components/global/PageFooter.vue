<template>
  <div class="footer-container">
    <b-img :src="logo" alt="Logo" height="40" class="me-lg-4" />
    <p>
      <span style="font-weight: bold">Netanel Mordakhay</span> (206719346),
      <span style="font-weight: bold">Daniel Lyubinsky</span> (206719347),
      <span style="font-weight: bold">Noa Argamani</span> (206719348)
    </p>
  </div>
</template>

<script>
import logo from "@/assets/logo.webp";

export default {
  name: "PageFooter",

  data() {
    return {
      logo,
    };
  },
};
</script>

<style>
.footer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: var(--color-deep);
  color: var(--color-highlight);
  padding: 0px 50px;
}

.footer-container p {
  margin: 0;
}
</style>
