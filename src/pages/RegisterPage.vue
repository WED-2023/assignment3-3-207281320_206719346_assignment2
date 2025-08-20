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
      <h2>Register</h2>
      <b-form @submit.prevent="register">
        <!-- Username -->
        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="state.username"
            :state="getValidationState(v$.username)"
          />
          <b-form-invalid-feedback v-if="v$.username.$error">
            <div v-if="!v$.username.required">Username is required.</div>
            <div v-else-if="!v$.username.minLength || !v$.username.maxLength">
              Username must be 3–8 characters.
            </div>
            <div v-else-if="!v$.username.alpha">
              Username must contain only letters.
            </div>
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- First Name -->
        <b-form-group label="First Name" label-for="firstname">
          <b-form-input
            id="firstname"
            v-model="state.firstname"
            :state="getValidationState(v$.firstname)"
          />
          <b-form-invalid-feedback v-if="v$.firstname.$error">
            First name is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Last Name -->
        <b-form-group label="Last Name" label-for="lastname">
          <b-form-input
            id="lastname"
            v-model="state.lastname"
            :state="getValidationState(v$.lastname)"
          />
          <b-form-invalid-feedback v-if="v$.lastname.$error">
            Last name is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Email -->
        <b-form-group label="Email" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="state.email"
            :state="getValidationState(v$.email)"
          />
          <b-form-invalid-feedback v-if="v$.email.$error">
            <div v-if="!v$.email.required">Email is required.</div>
            <div v-else-if="!v$.email.email">
              Please enter a valid email address.
            </div>
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Country -->
        <b-form-group label="Country" label-for="country">
          <b-form-select
            id="country"
            v-model="state.country"
            :options="countries"
            :state="getValidationState(v$.country)"
          />
          <b-form-invalid-feedback v-if="v$.country.$error">
            Country is required.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Password -->
        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="state.password"
            :state="getValidationState(v$.password)"
          />
          <b-form-invalid-feedback v-if="v$.password.$error">
            <div v-if="!v$.password.required">Password is required.</div>
            <div v-else-if="!v$.password.minLength || !v$.password.maxLength">
              Password must be 5–10 characters.
            </div>
            <div v-else-if="!v$.password.hasNumber">
              Password must include at least one number.
            </div>
            <div v-else-if="!v$.password.hasSpecial">
              Password must include at least one special character.
            </div>
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Confirm Password -->
        <b-form-group label="Confirm Password" label-for="confirmedPassword">
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="state.confirmedPassword"
            :state="getValidationState(v$.confirmedPassword)"
          />
          <b-form-invalid-feedback v-if="v$.confirmedPassword.$error">
            <div v-if="!v$.confirmedPassword.required">
              Confirmation is required.
            </div>
            <div v-else-if="!v$.confirmedPassword.sameAsPassword">
              Passwords do not match.
            </div>
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="success" class="w-100"
          >Register</b-button
        >

        <b-alert
          variant="danger"
          class="mt-3"
          dismissible
          v-if="state.submitError"
          show
        >
          Registration failed: {{ state.submitError }}
        </b-alert>

        <div class="mt-2">
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
      </b-form>
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

export default {
  name: "RegisterPage",
  components: { TwoColumnLayout },
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
