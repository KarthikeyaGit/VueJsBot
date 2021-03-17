<template>
  <div>
    <div id="app" class="main">
      <ChatWindow></ChatWindow>
    </div>
  </div>
</template>

<style>

.main {
   display: flex;
  justify-content: center;
}
</style>


<script>

import ChatWindow from "./components/ChatWindow.vue";
export default {
  name: "App",
  components: {
    ChatWindow
  },
};
</script>


