<template>
  <b-form @submit.prevent="login">
    <!-- Username -->
    <b-form-group label="Username" label-for="username">
      <b-form-input
        id="username"
        v-model="state.username"
        :state="getValidationState(v$.username)"
      />
      <b-form-invalid-feedback v-if="v$.username.$error">
        Username is required.
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
        Password is required.
      </b-form-invalid-feedback>
    </b-form-group>

    <b-button
      type="submit"
      variant="primary"
      class="w-100"
      :disabled="state.isLoading"
    >
      {{ state.isLoading ? "Logging in..." : "Login" }}
    </b-button>

    <b-alert
      variant="danger"
      class="mt-3"
      dismissible
      v-if="state.submitError"
      show
    >
      Login failed: {{ state.submitError }}
    </b-alert>

    <div class="mt-2">
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </div>
  </b-form>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "LoginPage",
  setup() {
    const state = reactive({
      username: "",
      password: "",
      submitError: null,
      isLoading: false,
    });

    const rules = {
      username: { required },
      password: { required },
    };

    const v$ = useVuelidate(rules, state);

    const getValidationState = (field) => {
      return field.$dirty ? !field.$invalid : null;
    };

    const login = async () => {
      const valid = await v$.value.$validate();
      if (!valid) return;

      state.isLoading = true;
      state.submitError = null; // Clear previous errors

      try {
        //await window.axios.post('/login', {
        await window.axios.post(`${window.store.server_domain}/Login`, {
          username: state.username,
          password: state.password,
        });
        window.store.login(state.username);

        // If home page, refresh the page
        // (for favorite button to work)
        if (window.router.currentRoute.value.path === "/") {
          window.router.go(0);
        } else {
          // Navigate to homepage
          window.router.push("/");
        }
      } catch (err) {
        state.submitError = err.response?.data?.message || "Unexpected error.";
        console.error("Login error:", err);
      } finally {
        state.isLoading = false;
      }
    };

    return { state, v$, login, getValidationState };
  },
};
</script>
