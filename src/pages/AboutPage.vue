<template>
  <DefaultLayout>
    <PageTitle>Group Members</PageTitle>
    <b-row>
      <b-col class="d-flex justify-content-center align-items-center"
        ><AboutProfileCard
          name="Netanel Mordakhay"
          id="206719346"
          :image="nati"
      /></b-col>
      <b-col class="d-flex justify-content-center align-items-center"
        ><AboutProfileCard
          name="Daniel Lyubansky"
          id="207281320"
          :image="daniel"
      /></b-col>
      <b-col class="d-flex justify-content-center align-items-center"
        ><AboutProfileCard name="Noa Argamani" id="318859014" :image="noa"
      /></b-col>
    </b-row>
    <PageTitle>About the Project</PageTitle>
    <p>
      This project is a web application developed as part of the Web Development
      Environments course. Its goal is to combine both frontend and backend
      technologies into a functional system.
    </p>
    <p>
      On the client side, the project uses modern web technologies such as
      HTML5, CSS3, and JavaScript, along with the Vue.js framework to build a
      responsive Single Page Application (SPA). Vue’s reactive system, component
      structure, and data binding make the interface dynamic and user-friendly.
    </p>
    <p>
      On the server side, the project relies on Node.js and Express.js to create
      RESTful APIs that handle user authentication, recipe management, and
      interactions with external services like the Spoonacular API for recipe
      search and information. Data persistence is managed through MySQL,
      ensuring structured storage of users and their related content.
    </p>
    <p>
      Together, these technologies demonstrate the principles of full-stack web
      development, including client–server communication over HTTP, REST API
      design, session management, and integration with third-party services.
    </p>
    <p>
      The result is a complete recipe application where users can register, log
      in, search for recipes by name or ingredients, and manage their own
      personalized recipe collections.
    </p>
    <PageTitle>Previous Assignments</PageTitle>
    <b-list-group>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center flex-column flex-md-row"
      >
        <div>
          <h5 class="mb-1">Assignment 1 - Netanel Mordakhay, 206719346</h5>
          <p class="mb-1">
            A webpage dedicated to David Gilmour, implementing different effects
            for a visually pleasing browsing experience.
          </p>
        </div>
        <b-button
          variant="primary"
          href="https://github.com/WED-2023/206719346"
          class="mt-2 mt-md-0"
          >View Assignment</b-button
        >
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center flex-column flex-md-row"
      >
        <div>
          <h5 class="mb-1">Assignment 1 - Daniel Lyubansky, 207281320</h5>
          <p class="mb-1">
            Implemented user authentication, registration, and login
            functionality.
          </p>
        </div>
        <b-button
          variant="primary"
          href="https://github.com/WED-2023/207281320"
          class="mt-2 mt-md-0"
          >View Assignment</b-button
        >
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center flex-column flex-md-row"
      >
        <div>
          <h5 class="mb-1">Assignment 2 - Void Wars</h5>
          <p class="mb-1">Online multiplayer space shooter game.</p>
        </div>
        <b-button
          variant="primary"
          href="https://github.com/WED-2023/assignment2-207281320_206719346_318859014_assignment2"
          class="mt-2 mt-md-0"
          >View Assignment</b-button
        >
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center flex-column flex-md-row"
      >
        <div>
          <h5 class="mb-1">Assignment 3 - Grandma's Recipes (Backend)</h5>
          <p class="mb-1">
            A RESTful API for a recipe application, allowing users to manage
            recipes, ingredients, and categories.
          </p>
        </div>
        <b-button variant="primary" href="#" class="mt-2 mt-md-0"
          >View Assignment</b-button
        >
      </b-list-group-item>
      <b-list-group-item
        class="d-flex justify-content-between align-items-center flex-column flex-md-row"
      >
        <div>
          <h5 class="mb-1">Assignment 3 - Grandma's Recipes (Frontend)</h5>
          <p class="mb-1">
            A Single Page Application (SPA) for a recipe application, allowing
            users to manage recipes, ingredients, and categories.
          </p>
        </div>
        <b-button variant="primary" href="#" class="mt-2 mt-md-0"
          >View Assignment</b-button
        >
      </b-list-group-item>
    </b-list-group>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AboutProfileCard from "@/components/about/AboutProfileCard.vue";
import nati from "@/assets/devs/nati.png";
import daniel from "@/assets/devs/daniel.png";
import noa from "@/assets/devs/noa.png";
import PageTitle from "@/components/global/PageTitle.vue";

export default {
  name: "AboutPage",
  components: {
    DefaultLayout,
    AboutProfileCard,
    PageTitle,
  },
  mounted() {
    document.title = "Grandma's Recipes - About";
  },
  data() {
    return {
      nati,
      daniel,
      noa,
    };
  },
};
</script>
