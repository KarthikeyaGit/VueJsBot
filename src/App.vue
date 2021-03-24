<template>
  <div>
    <div id="app" class="main">
      <ChatWindow></ChatWindow>
    </div>
  </div>
</template>

<style>


.main {
 margin:0;
 padding:0;
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


