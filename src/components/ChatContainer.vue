<template>
  <div id="app">
    <div class="cont">
      <ul id="chatconatiner" style="max-height=450px; overflow-y=auto;">
        <li
          v-for="(msg, index) in msgs"
          :class="`${msg.from} ${index}`"
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
  border-radius: 6px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  width: 285px;
}

.him {
  float: left;
  background: rgb(190, 186, 186);
  border-top-left-radius: 0px;
}

.me {
  float: right;
  background: #1f2020;
  color: #fff;
  border-top-right-radius: 0px;
}
</style>

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<script>
import Input from "./ChatInput.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "app",
  data() {
    return {
      message: "",
      inputmsg: {},
      msgs: [],
    };
  },
  components: {
    Input,
  },

  methods: {
    setMessage: async function (inputmsg) {
      let message = { message: inputmsg, from: "me" };
      this.msgs.push(message);
      // this.send(inputmsg);

      this.scrollToEnd();
    },

    scrollToEnd: async function () {


      let i = this.msgs.length;
      let className = `me ${i - 1}`;
      let element = await this.$el.getElementsByClassName(className);
      element[0].scrollIntoView({ behavior: "smooth" });

      console.log("el ", className, element[0], i);
    },

    send(message) {
      let session_id = uuidv4();
      let gateway = "http://localhost:3000/web";
      let request = {
        phone_number: "1234567890",
        session_id: session_id,
        query: message,
      };

      fetch(gateway + "?format=true", {
        method: "POST",
        body: JSON.stringify(request),
        headers: { "content-type": "application/json" },
      }).then(async (response) => {
        let msg = await response.json();
        let res = msg.fulfillmentText;
        let message = { message: res, from: "him" };
        this.msgs.push(message);
        this.scrollToEnd();
      });
    },
  },
};
</script>








