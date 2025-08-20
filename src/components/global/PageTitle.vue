<template>
  <div class="page-title-container">
    <h1 class="page-title"><slot /></h1>
    <span class="page-title-rightline"></span>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
};
</script>

<style>
.page-title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);

  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  transition: text-shadow 0.3s ease-in-out;
}

.page-title-rightline {
  flex: 1;
  height: 5px;
  background-color: var(--color-accent);
}
</style>
