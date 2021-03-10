<template>
  <div class="preview-box" style="width: 50vw; height: auto;">
    {{
      content
        ? content
        : "Select a task from the left pane to preview the details"
    }}
  </div>
</template>
<script>
export default {
  computed: {
    content: {
      get() {
        return this.$store.state.selectedTask?.details;
      },
    },
  },
};
</script>
<style>
.preview-box {
  padding: 1em 0.5em;
  border: 1px solid #ffffff;
}
</style>
