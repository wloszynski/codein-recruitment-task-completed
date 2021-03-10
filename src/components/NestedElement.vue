<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="task-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div class="task-group" v-for="task in tasks" :key="task.id">
      <div
        class="task"
        :class="{ selected: task.id === selectedTask.id }"
        @click="
          () => {
            select(task);
          }
        "
        @dblclick="
          (e) => {
            setContentEditable(e);
          }
        "
        @blur="
          (e) => {
            e.target.contentEditable = false;
            setTaskName(task, e.target.textContent);
          }
        "
      >
        {{ task.name }}
      </div>
      <nested-element :list="task.elements" />
    </div>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

// function for search for nested tasks
const deepSearch = function(object, id) {
  if (object.hasOwnProperty("id") && object["id"] === id) return object;

  for (let i = 0; i < Object.keys(object).length; i++) {
    if (typeof object[Object.keys(object)[i]] === "object") {
      let o = deepSearch(object[Object.keys(object)[i]], id);
      if (o != null) return o;
    }
  }

  return null;
};
export default {
  name: "nested-element",
  components: {
    draggable,
  },

  methods: {
    emitter(value) {
      this.$emit("input", value);
    },

    select(selectedTask) {
      const task = deepSearch(this.$store.state.tasks, selectedTask.id);

      if (!task) {
        return;
      }

      this.$store.commit("updateSelectedTask", task);
    },

    // setting htmls element to contentEditable=true
    setContentEditable(e) {
      e.target.contentEditable = true;
      e.target.focus();
    },

    // setting task name
    setTaskName(task, name) {
      const selectedElement = deepSearch(this.$store.state.tasks, task.id);

      if (!selectedElement) {
        return;
      }

      selectedElement.name = name;
    },
  },
  computed: {
    // options for vuedraggable
    dragOptions() {
      return {
        animation: 200,
        group: "tasks",
        disabled: false,
        ghostClass: "ghost-ticket",
      };
    },

    // fetching tasks
    tasks() {
      return this.value ? this.value : this.list;
    },

    // getting selected task
    selectedTask: {
      get() {
        if (!this.$store.state.selectedTask) {
          return false;
        }

        return this.$store.state.selectedTask;
      },
    },
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null,
    },
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
};
</script>
<style scoped>
.task-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: flex-start;
  align-items: flex-end;
  align-content: flex-end;
  width: 100%;
  white-space: nowrap;
  margin-bottom: 0.4 em;
}

.selected {
  font-weight: bold;
}
.task-group {
  width: 80%;
  margin: 0.7em 0 0 0;
}

.task {
  background-color: white;
  color: black;
  padding: 0.5em;
  border-radius: 1em;
  cursor: pointer;
  margin-bottom: 0.3em;
  height: 2em;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}

.ghost-ticket {
  opacity: 0.5;
  border-radius: 2em;
}
</style>
