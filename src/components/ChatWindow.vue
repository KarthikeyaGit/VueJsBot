<template>
  <div id="ChatWindow" class="container">
    <div><TopHead></TopHead></div>
    <section><ChatContainer></ChatContainer></section>
  </div>
</template>

<style >
.container {
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>

<script>
import TopHead from "./TopHead.vue";
import ChatContainer from "./ChatContainer.vue";
export default {
  name: "ChatWindow",
  data() {
    return {
      counter: 0,
    };
  },
  components: {
    TopHead,
    ChatContainer,
  },

  methods: {
    countincrement: function () {
      this.counter += 1;
    },
  },
};
</script>
