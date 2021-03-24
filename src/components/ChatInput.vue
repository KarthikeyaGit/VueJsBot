<template>
  <div class="chatInput">
    <div class="flexible">
      <div class="inputField">
        <input
          v-model="message"
          type="text"
          name="message"
          class="textFied"
          placeholder="Type a message"
          @keyup.enter="submit"
        />
      </div>
      <div class="sendbtn">
        <button @click="submit" style="outline: none">
          <img
            src="../assets/send-icon.png"
            style="width: 37px; height: 37px"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import "../../node_modules/vuetify/dist/vuetify.css";

export default {
  name: "chatInput",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    submit: function () {
      console.log("message", this.message);
      this.$emit("submit", this.message);
      this.message = "";
    },
    
  },
};
</script>

<style scoped>
.flexible {
  display: flex;
}
.chatInput {
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  background-color: white;
  z-index: 200;
}
.inputField {
  padding: 8px;
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
}
.sendbtn {
  padding-top: 6px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
}
.v-input__control {
  height: 45px;
}

.textFied {
  height: 35px;
  width: 100%;
  margin: 10px;
  border-radius: 25px;
  background-color: #f1f3f4;
  outline: none;
  padding: 10px;
}
</style>


