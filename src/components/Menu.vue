<template>

<div class="global">
  

  <div class="Menu">
    
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />

    <div class="conv">
      
          <button class="btnmenu btnconv" @click="linktoConversation"><img class="imgbtn" src="https://image.flaticon.com/icons/svg/2598/2598834.svg"><br> Conversations</button>
          <button class="btnmenu btnmemb" @click="linktomembers"><img class="imgbtn" src="https://image.flaticon.com/icons/svg/1006/1006515.svg"><br> Membres</button>
        
    </div>
   
    
    
    
  </div>
</div>
</template>

<script>
import FixedHeader from 'vue-fixed-header'
 
export default {
  components: {
    FixedHeader
  },
  name: "Menu",
  mounted() {},
  methods: {
    
    linktoConversation: function(event) {
      this.$router.push("/Conversation");
    },
    linktomembers: function(event) {
      this.$router.push("/Members");
    }
  }
};
</script>

<style>

.btnmenu{
  background-color: #0774AF;
  width: 300px;
  height: 200px;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 36px;
  margin:20px;
  border-radius: 10%;
}
.imgbtn{
  width: 80px;
  height: 80px;
 
}

.conv{
  margin-left:25%;
  padding-top: 15%;
}



</style>