<template>
  <div id="app">
    <img alt="Codein logo" src="./assets/logo.svg" />
    <h1>
      Codein To-do list
    </h1>
    <div class="content">
      <List />
      <Preview />
    </div>
  </div>
</template>

<script>
let List = require("./components/List.vue").default;

import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  components: {
    List,
    Preview: require("./components/Preview.vue").default,
  },
  mounted() {
    // default tasks
    const startupTasks = [
      {
        id: uuidv4(),
        name: "Task 1",
        details:
          "This is task 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis dolor at nisl ultricies condimentum. Curabitur eget condimentum enim, a eleifend odio.",
        elements: [
          {
            id: uuidv4(),
            name: "Task 1.2",
            details:
              "This is task 1.2. Ut id urna sollicitudin, ornare mauris eu, blandit arcu. Vestibulum pharetra ligula ut bibendum accumsan",
            elements: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Task 2",
        details:
          "This is task 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis dolor at nisl ultricies condimentum. Curabitur eget condimentum enim, a eleifend odio.",
        elements: [],
      },
    ];
    this.$store.commit("updateTasks", startupTasks);
  },
};
</script>
<style>
#app {
  margin-top: 60px;
}

.content {
  display: flex;
  justify-content: center;
  text-align: left;
}
</style>
