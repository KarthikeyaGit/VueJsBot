<template>
  <div id="app">
    <div class="cont">
      <ul id="chatconatiner" style="max-height=450px; overflow-y=auto;">
        <li
          v-for="(msg, index) in msgs"
          :class="`me ${index}`"
          v-bind:key="msg.message"
        >
          {{ msg.message }}
        </li>
        <li
          v-for="(msg, index) in msgs"
          :class="`him ${index}`"
          v-bind:key="msg.message"
        >
          {{ msg.message }}
        </li>
      </ul>
    </div>

    <div><Input @submit="setMessage" :inputmsg="message"></Input></div>
  </div>
</template>
<style>
.cont {
  z-index: 99;
  height: 100%;
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

ul {
  list-style: none;
  margin: auto;
  padding: auto;
}

ul li {
  display: inline-block;
  clear: both;
  padding: 12px;
  margin: 12px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  width: 285px;
}

.him {
  float:left;
  background: rgb(190, 186, 186);
}

.me {
  float: right;
  background: #1f2020;
  color: #fff;
}

.him + .me {
  border-bottom-right-radius: 5px;
}

.me + .me {
  border-top-right-radius: 5px;
  /* border-bottom-right-radius: 5px; */
}

.me:last-of-type {
  border-bottom-right-radius: 30px;
  margin-bottom: 250px;
}
</style>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<script>
import Input from "./ChatInput.vue";

export default {
  name: "app",
  data() {
    return {
      message: "",
      inputmsg: "",
      msgs: [],
    };
  },
  components: {
    Input,
  },

  methods: {
    setMessage: function (inputmsg) {
      let message = { message: inputmsg };
      this.msgs.push(message);
      this.scrollToEnd();
    },

    scrollToEnd: async function () {
      var container = document.getElementById("chatconatiner");
      let index = document.querySelectorAll("me");

      let i = this.msgs.length;
      let className = `me ${i - 1}`;
      let element = await this.$el.getElementsByClassName(className);
      element[0].scrollIntoView({ behavior: "smooth" });

      console.log("el ", className, element[0], i);
    },
  },
};
</script>








