<template>
  <div>
    <div id="list">
      <nested-element v-model="localTasks" />
    </div>
    <p class="new_task" @click="addNewTask">
      &plus; Add new task
    </p>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
import NestedElement from "./NestedElement.vue";

export default {
  name: "list",
  components: {
    draggable,
    NestedElement,
  },
  computed: {
    localTasks: {
      get() {
        return this.$store.state.tasks;
      },
      set(value) {
        this.$store.commit("updateTasks", value);
      },
    },
  },
  methods: {
    addNewTask() {
      const count = this.localTasks.length;

      const newTask = {
        id: uuidv4(),
        name: `Task ${count + 1}`,
        details: `This is the task ${count +
          1} - ut id urna sollicitudin, ornare mauris eu, blandit arcu. Vestibulum pharetra ligula ut bibendum accumsan`,
        selected: false,
        elements: [],
      };

      this.$store.commit("addTask", newTask);
    },
  },
};
</script>
<style scoped>
#list {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding: 0 1em;
  width: 300px;
}

#list .box > .box {
  border: red 2px solid;
}

.new_task {
  cursor: pointer;
  text-align: right;
  padding: 0 1em;
}
</style>
