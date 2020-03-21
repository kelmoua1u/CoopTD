<template>
  <div class="Conversation">
    <!-- BOOTSTRAP -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <!-- FIN BOOTSTRAP-->

    <br />
    
    <div class="container">
      
      <!-- create a conversation-->
        <div class="">
          <div class="divcreate" style="border-radius: 10px;" >
            <div class="">
            
              <form @submit.prevent="CreatNewConversation" >
                <div style="float:left;">
                <label style="font-size:20px;">Libellé de la conversation  :</label>
                <input type="text" class="form-control" v-model="label"  style="width:200px;"/>   <br>           
                <label style="font-size:20px;">Sujet de la conversation  :</label>&nbsp;&nbsp;
                <input type="text" class="form-control" v-model="topic" style="width:200px;" />
                </div>
               <button type="submit" class="btn btn-info"  style="float:left; margin-top:3%;margin-left:3%;">Ajouter conversation</button>
              </form>
            </div>
          </div>
        </div>
        </div>
      
      <hr />
      <div class="divglb">
        
          <!--List of conversations-->
          
            <div  v-for="(channel,index) in $store.state.channels" :key="index" style="padding: 1.5%;" >
               <div class="divconversation">
               <div class="divconv">
             <h5> {{channel.label}}</h5>
             <h6>{{channel.topic}}</h6>
             </div>
            <div class="divbtnconv">
              <button class="btn btn-danger " @click="deleteConversation(channel.id,$store.state.token)">Supprimer</button>
               <button class="btn btn-info " @click="showMessages(channel,channel.id,$store.state.token)">Message</button>
            </div>
            </div>
               
            
            </div>
          </div>
</div>

        
      
    
 
</template>

<script>
export default {
  name: "Conversation",
  data() {
    return {
      label: "",
      topic: ""
    };
  },
  mounted() {
    this.showConversationsList()
  },
  methods: {
    CreatNewConversation: function(event) {
      axios
        .post("channels", {
          label: this.label,
          topic: this.topic,
          token: this.$store.state.token
        })
        .then(response => {
          this.$store.commit("channel", response.data);
          this.$router.go();
        })
        .catch(error => console.log(error));
    },
    showConversationsList: function(event) {
      axios
        .get("channels", this.$store.state.token)
        .then(response => {
          this.$store.commit("setChannels", response.data);
        })
        .catch(error => console.log(error));
    },
    showMessages(channel, id_channel, token) {
      //Send mesagges data
      axios
        .get("channels/" + id_channel + "/posts", token)
        .then(response => {
          //Trying to save the messages
          this.$store.commit("setMessages", response);
          this.$store.commit("setChannel", channel);
          this.$router.push("/Messages");
        })
        .catch(error => console.log(error));
    },
    deleteConversation: function(id, token) {
      axios
        .delete("channels/" + id, token)
        .then(response => {
          this.$router.go();
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style >
.conversation{
  width: 100%;
  height: 100%;
}
.container{
  width: 100%;
  height: 100%;
}

.divglb{
  width: 50%;
  height: 500px;
  background-color: #0774AF;
  border-radius: 10px;
  margin-left: 20%;
   
}

.divconv{
  border: 5px;
  width: 50%;
  height: 50px;
  margin-bottom: 50px;
  margin-left: 15px;;
  float: left;
  
}
.divconversation{
  border: 5px black;
  background-color: rgb(219, 217, 217);
  width: 100%;
  height: 60px;
  display: inline-block;
  border-radius: 10px;
}

.divconversation button{
  margin-top: 10px;
  margin-right: 5px;;
  float:right;
  
}
.divcreate{
  width: 100%;
  height: 100px;
  display: inline-block;
  margin-left: 15%;
}

.divcreate label{

  float: left;
  margin-bottom: 15px;
}
.divcreate input{
  margin-left:20px;
  margin-bottom: 15px;
  float: right;
  
}


</style>