<template>
  <TwoColumnLayout title="Login">
    <template #left>
      <div class="h-100 align-items-center d-flex">
        <b-card
          overlay
          img-src="https://www.foodandwine.com/thmb/UMnIiR7a7oiqwNAbUiMPu5Z7-zg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/garlic-butter-steak-bites-FT-RECIPE0221-8dbce15a089d4fbeac3c6935507d2d4f.jpg"
          img-alt="Card Image"
        >
          <b-card-text class="text-container-overlay">
            Welcome back! Always fun to see you again!
          </b-card-text>
        </b-card>
      </div>
    </template>
    <template #right>
      <h2>Login</h2>
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

        <b-button type="submit" variant="primary" class="w-100">Login</b-button>

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
  </TwoColumnLayout>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import TwoColumnLayout from "@/layouts/TwoColumnLayout.vue";

export default {
  name: "LoginPage",
  components: { TwoColumnLayout },
  setup() {
    const state = reactive({
      username: "",
      password: "",
      submitError: null,
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

      try {
        //await window.axios.post('/login', {
        await window.axios.post(`${window.store.server_domain}/Login`, {
          username: state.username,
          password: state.password,
        });
        window.store.login(state.username);
        window.router.push("/main");
      } catch (err) {
        state.submitError = err.response?.data?.message || "Unexpected error.";
        console.error("Login error:", err);
      }
    };

    return { state, v$, login, getValidationState };
  },
};
</script>
