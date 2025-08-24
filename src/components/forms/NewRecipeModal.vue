<template>
  <b-modal
    v-model="showModal"
    title="Create New Recipe"
    size="lg"
    @ok="testClick"
    :ok-disabled="!isFormValid"
  >
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Recipe Title:" label-for="title">
        <b-form-input
          id="title"
          v-model="recipe.title"
          type="text"
          required
          placeholder="recipe title"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Image URL:" label-for="image">
        <b-form-input
          id="image"
          v-model="recipe.image"
          type="url"
          placeholder="url"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Summary:" label-for="summary">
        <b-form-textarea
          id="summary"
          v-model="recipe.summary"
          rows="3"
          required
          placeholder="summary"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Ready in (minutes):" label-for="readyInMinutes">
        <b-form-input
          id="readyInMinutes"
          v-model.number="recipe.readyInMinutes"
          type="number"
          min="1"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Servings:" label-for="servings">
        <b-form-input
          id="servings"
          v-model.number="recipe.servings"
          type="number"
          min="1"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ingredients:" label-for="ingredients">
        <div
          v-for="(ingredient, index) in recipe.ingredients"
          :key="index"
          class="mb-2"
        >
          <b-form-input
            v-model="recipe.ingredients[index].amount"
            required
            class="mb-2"
            placeholder="amount"
          ></b-form-input>
          <b-form-input
            v-model="recipe.ingredients[index].name"
            required
            placeholder="ingredient"
          ></b-form-input>
        </div>
        <b-button variant="outline-primary" @click="addIngredient" class="mt-2">
          <i class="bi bi-plus"></i> Add Ingredient
        </b-button>
      </b-form-group>

      <b-form-group label="Instructions:" label-for="instructions">
        <div
          v-for="(instruction, index) in recipe.instructions"
          :key="index"
          class="mb-2"
        >
          <b-form-textarea
            v-model="recipe.instructions[index]"
            required
          ></b-form-textarea>
        </div>
        <b-button
          variant="outline-primary"
          @click="addInstruction"
          class="mt-2"
        >
          <i class="bi bi-plus"></i> Add Instruction
        </b-button>
      </b-form-group>

      <b-form-group label="tags:">
        <b-form-checkbox v-model="recipe.vegan">Vegan</b-form-checkbox>
        <b-form-checkbox v-model="recipe.vegetarian"
          >Vegetarian</b-form-checkbox
        >
        <b-form-checkbox v-model="recipe.glutenFree"
          >Gluten Free</b-form-checkbox
        >
      </b-form-group>
    </b-form>

    <template #modal-footer>
      <b-button variant="secondary" @click="handleCancel">Cancel</b-button>
      <b-button
        variant="primary"
        @click="testClick"
        :disabled="!isFormValid"
        :title="!isFormValid ? 'Please fill in all required fields' : ''"
      >
        Create Recipe
        {{ !isFormValid ? "(Disabled)" : "" }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "NewRecipeModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recipe: {
        title: "",
        summary: "",
        readyInMinutes: "",
        servings: "",
        image: "",
        ingredients: [{ amount: "", name: "" }],
        instructions: [""],
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
    };
  },
  computed: {
    showModal: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      },
    },
    isFormValid() {
      return (
        this.recipe.title.trim() &&
        this.recipe.summary.trim() &&
        Number(this.recipe.readyInMinutes) > 0 &&
        Number(this.recipe.servings) > 0 &&
        this.recipe.ingredients.some(
          (ing) =>
            ing.amount && ing.name && ing.amount.trim() && ing.name.trim()
        ) &&
        this.recipe.instructions.some((inst) => inst.trim())
      );
    },
  },
  methods: {
    testClick() {
      if (this.isFormValid) {
        this.handleSubmit();
      }
    },
    addIngredient() {
      this.recipe.ingredients.push({ amount: "", name: "" });
    },
    addInstruction() {
      this.recipe.instructions.push("");
    },
    async handleSubmit() {
      try {
        // Filter out empty ingredients and instructions
        const filteredIngredients = this.recipe.ingredients.filter(
          (ing) =>
            ing.amount && ing.name && ing.amount.trim() && ing.name.trim()
        );
        const filteredInstructions = this.recipe.instructions.filter((inst) =>
          inst.trim()
        );

        const recipeData = {
          ...this.recipe,
          ingredients: filteredIngredients,
          instructions: filteredInstructions.join("\n\n"),
          analyzedInstructions: filteredInstructions.map(
            (instruction, index) => ({
              name: `Step ${index + 1}`,
              steps: [{ step: instruction }],
            })
          ),
        };

        await window.axios.post(
          `${this.$root.store.server_domain}/simple/myrecipes`,
          {
            recipe: recipeData,
            username: this.$root.store.username,
          }
        );

        this.$emit("recipe-created", recipeData);
        this.resetForm();
        this.showModal = false;

        // Redirect to my-recipes page after successful creation
        window.router.push("/my-recipes");
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    },
    handleCancel() {
      this.resetForm();
      this.showModal = false;
    },
    resetForm() {
      this.recipe = {
        title: "",
        summary: "",
        readyInMinutes: "",
        servings: "",
        image: "",
        ingredients: [{ amount: "", name: "" }],
        instructions: [""],
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      };
    },
  },
};
</script>
