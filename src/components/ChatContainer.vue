<template>
  <div class="cont">
    <div>
      <ul id="chatconatiner">
        <li class="me" v-for="msg in msgs" v-bind:key="msg.message">
          {{ msg.message }}
        </li>
      </ul>
    </div>
    <div><Input @submit="getMessage" :inputmsg="message"></Input></div>
  </div>
</template>


<script>
import Input from "./ChatInput.vue";

export default {
  name: "chatconatiner",
  data() {
    return {
      message:"",
      inputmsg: "",
      msgs: [],
    };
  },
  components: {
    Input,
  },
  methods: {
    getMessage: function (inputmsg) {
      let message = {message : inputmsg}
      this.msgs.push(message)
      console.log("msg",inputmsg)
    }
  }
};
</script>

<style>
.cont {
  position: relative;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 120px;
  padding-left: 6px;
  padding-right: 6px;
}

ul {
  list-style: none;
  margin: 5px;
  padding: 0;
}

ul li {
  display: inline-block;
  clear: both;
  padding: 20px;
  margin: 10px;
  border-radius: 30px;
  margin-bottom: 2px;
  font-family: Helvetica, Arial, sans-serif;
}

.him {
  background: #eee;
  float: left;
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
  border-bottom-right-radius: 5px;
}

.me:last-of-type {
  border-bottom-right-radius: 30px;
}
</style>

