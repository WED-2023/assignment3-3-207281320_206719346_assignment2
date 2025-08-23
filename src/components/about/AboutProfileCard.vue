<template>
  <div>
    <b-card
      :img-src="image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem; background-color: transparent; border: none"
      class="mb-2"
    >
      <b-card-title>{{ name }}</b-card-title>
      <b-card-subtitle>id: {{ id }}</b-card-subtitle>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "AboutProfileCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>
