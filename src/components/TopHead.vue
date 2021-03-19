<template>
  <header id="tophead" class="head">
    <p class="title" style="text-align: left">ChatBot</p>
  </header>
</template>

<style scoped>

.head {
  position: fixed;
  background-color: #000000;
  width: 100%;
  height: 50px;
  z-index: 999;

}
.title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 18px;
  margin: 0;
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  color: white;
}
</style>



<script>
export default {
  name: "tophead",
};
</script>
