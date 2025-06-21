<template>
  <DefaultLayout>
    <div class="example-content">
      <b-row>
        <b-col>
          <h1 class="mb-4">Welcome to Grandma's Recipe</h1>
          <p class="lead">
            This is an example page showing how to use the DefaultLayout
            component.
          </p>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col md="6">
          <b-card title="How to Use the Layout" class="mb-3">
            <p>
              Simply wrap your page content with the
              <code>&lt;DefaultLayout&gt;</code> component:
            </p>
            <pre><code>&lt;template&gt;
  &lt;DefaultLayout&gt;
    &lt;!-- Your page content here --&gt;
  &lt;/DefaultLayout&gt;
&lt;/template&gt;</code></pre>
          </b-card>
        </b-col>

        <b-col md="6">
          <b-card title="Features" class="mb-3">
            <ul>
              <li>Fixed navigation bar at the top</li>
              <li>Responsive design</li>
              <li>User authentication status</li>
              <li>Bootstrap Vue 3 components</li>
              <li>Clean and modern styling</li>
            </ul>
          </b-card>
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col>
          <b-alert variant="info" show>
            <strong>Note:</strong> The navigation bar is fixed at the top and
            the main content area automatically adjusts to prevent overlap.
          </b-alert>
        </b-col>
      </b-row>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";

export default {
  name: "ExamplePage",
  components: {
    DefaultLayout,
  },
};
</script>
