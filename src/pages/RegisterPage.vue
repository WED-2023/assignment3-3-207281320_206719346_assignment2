<template>
  <TwoColumnLayout title="Register">
    <template #left>
      <div class="h-100 align-items-center d-flex">
        <b-card
          overlay
          img-src="https://www.foodandwine.com/thmb/UMnIiR7a7oiqwNAbUiMPu5Z7-zg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garlic-butter-steak-bites-FT-RECIPE0221-8dbce15a089d4fbeac3c6935507d2d4f.jpg"
          img-alt="Card Image"
        >
          <b-card-text class="text-container-overlay">
            Join our community! Register now to save your favorite recipes.
          </b-card-text>
        </b-card>
      </div>
    </template>
    <template #right>
      <RegisterForm />
    </template>
  </TwoColumnLayout>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  alpha,
  email,
} from "@vuelidate/validators";
import rawCountries from "../assets/countries";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: { TwoColumnLayout, RegisterForm },
  mounted() {
    document.title = "Grandma's Recipes - Register";
  },
  setup() {
    const state = reactive({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmedPassword: "",
      country: "",
      submitError: null,
    });

    // Custom validators
    const hasNumber = (value) => /\d/.test(value);
    const hasSpecial = (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const passwordsMatch = (value) => value === state.password;

    const rules = {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha,
      },
      firstname: { required },
      lastname: { required },
      email: { required, email },
      country: { required },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        hasNumber,
        hasSpecial,
      },
      confirmedPassword: {
        required,
        sameAsPassword: passwordsMatch,
      },
    };

    const v$ = useVuelidate(rules, state);

    const getValidationState = (field) => {
      return field.$dirty ? !field.$invalid : null;
    };

    const register = async () => {
      const valid = await v$.value.$validate();
      if (!valid) return;

      try {
        state.submitError = null;

        console.log("Sending registration data:", {
          username: state.username,
          firstname: state.firstname,
          lastname: state.lastname,
          email: state.email,
          country: state.country,
          password: state.password,
        });

        const response = await window.axios.post(
          `${window.store.server_domain}/Register`,
          {
            username: state.username,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            country: state.country,
            password: state.password,
          }
        );

        console.log("Registration response:", response.data);

        if (response.data.success) {
          console.log("Registration successful, redirecting to login");
          try {
            await window.router.push("/login");
            console.log("Redirect completed successfully");
          } catch (routerError) {
            console.error("Router error:", routerError);
          }
        } else {
          console.log("Registration failed:", response.data.message);
          state.submitError = response.data.message || "Registration failed";
        }
      } catch (err) {
        console.error("Registration error:", err);
        state.submitError =
          err.response?.data?.message ||
          "Unexpected error occurred. Please try again.";
      }
    };

    return {
      state,
      countries: ["Select a country", ...rawCountries],
      register,
      v$,
      getValidationState,
    };
  },
};
</script>
