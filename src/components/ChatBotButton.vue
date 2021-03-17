<template>

    <div id="BotButton"  >
        <h1>{{ counter }}</h1>
        <button v-on:click='increment'>Click me</button>
      <div @click="clickBotButton">
      </div>
  </div>
</template>




<script>
export default {
  name: "BotButton",

  data(){
    return {
      counter : 0
    }
  },
  methods:{
    clickBotButton(){
      this.counter += 1;
      this.$emit('IncrementCounter' ,this.counter)
    },
    increment(){
      this.counter += 1;
    }

 }

};
</script>




