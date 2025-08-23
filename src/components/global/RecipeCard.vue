<template>
  <div>
    <b-card
      :img-src="
        recipe.image ? recipe.image : require('@/assets/empty-image.jpg')
      "
      img-alt="Recipe Image"
      :img-left="fullWidth"
      :img-top="!fullWidth"
      :img-width="fullWidth ? '300' : null"
      :style="fullWidth ? { maxWidth: '100%' } : { maxWidth: '20rem' }"
    >
      <!-- Title -->
      <b-card-title class="card-title">{{ recipe.title }}</b-card-title>

      <!-- Badges -->
      <b-card-sub-title class="card-sub-title d-flex gap-2">
        <b-badge variant="primary" v-if="recipe.vegan">Vegan</b-badge>
        <b-badge variant="primary" v-if="recipe.glutenFree"
          >Gluten free</b-badge
        >
      </b-card-sub-title>
      <!-- Basic info -->
      <div class="mt-3 mb-3">
        <b-card-subtitle class="card-subtitle card-subtitle"
          ><i class="bi bi-clock"></i> How long:
          {{ recipe.readyInMinutes }} minutes</b-card-subtitle
        >
        <b-card-subtitle class="card-subtitle card-subtitle"
          ><i class="bi bi-hand-thumbs-up"></i> Popularity:
          {{ recipe.popularity }}
          likes</b-card-subtitle
        >
      </div>
      <!-- Link -->
      <div class="d-flex gap-2">
        <router-link :to="`/recipe/${recipe.id}`" class="w-100">
          <b-button variant="primary" class="w-100">View Recipe</b-button>
        </router-link>
        <b-button variant="outline-primary"
          ><i class="bi bi-star"></i
        ></b-button>
        <b-button variant="outline-primary"><i class="bi bi-eye"></i></b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Card */
.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.02);
}
/* Card title */
.card-title {
  font-size: 32px;
  font-weight: 600;
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  transition: text-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
}

.card:hover .card-title {
  color: var(--color-accent);
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.8);
}

/* Subtitle */
.card-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-muted);
}
</style>
