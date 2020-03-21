<template>
  <div class="Messages">
    <!-- BOOTSTRAP -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <!-- FIN BOOTSTRAP-->
     <div class="container">
      <div class="row offset-3">
        <div class="col-8" style="background-color:#343A40;">
          <button class="btn btn-dark col-2 offset-1 " @click="GoToHome"><img src="../assets/home.png" style="width: 15px;" /></button>
          <button class="btn btn-dark col-2 " @click="GoToList"><img src="../assets/bullet.png" style="width: 15px;" /></button>       
          <button class="btn btn-dark col-2 offset-2" @click="deleteConversation($store.state.channel.id,$store.state.token)"><img src="../assets/delete.svg" style="width: 15px;" /></button>
          <button class="btn btn-dark col-2 " @click="logout"><img src="../assets/logout.png" style="width: 15px;" /></button>

       </div>
      </div>
    </div>

    <br />
    <div class="container">
      <div class="card text-center" style="width: 51%; margin-left:25%; border-radius: 20px 20px 20px 20px; ">
        
        <div class="card-body" style="background-color: #0774AF;border-radius: 20px 20px 20px 20px;">
          <h2>
      {{$store.state.channel.label}}
      
    </h2>
          <hr />
          
          <div v-if="$store.state.messages.data.length === 0">
            <div class="alert alert-dark col-12" role="alert">Il y'a aucun message pour le momment! <br>Ecrivez en toute liberté.</div>
          </div>
          

          <div v-for="(msg,index) in $store.state.messages.data" class="row" :key="index">
            
            <div class="col col-7">
              <div
                class="alert alert-primary"
                v-if="msg.member_id == $store.state.membre.id"
                style="border: 2px solid #0774AF; border-radius: 20px 20px 20px 20px; color: #0774AF; background-color: white;">
                <div v-for="(owner,index) in $store.state.membres" :key="index">
                  <div v-if="owner.id == msg.member_id">
                    <h5 >
                      <br>
                      <kbd
                        @click="gotoUser(owner)"
                        style="cursor: pointer; background-color: #0774AF; "
                      >{{owner.fullname}}</kbd> a écrit :
                    </h5>
                    <h6 style="color:black">
                     {{msg.message}}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-4">
              <br><br>
              <div class="row">
                <div class="col col-4"></div>
                <div class="col col-4">
                  <button class="btn " style="background-color:#FF5E45" @click="deleteMessage(msg,$store.state.token)">
                    <img src="../assets/delete.svg" style="width: 15px;" />
                  </button>
                </div>
                <div class="col col-4">
                  <button class="btn btn-warning">
                    <img src="../assets/edit.svg" style="width: 20px;" />
                  </button>
                </div>
              </div>
            </div>
          </div>
<br>
          <div class="row">
            <div class="col col-7">
              <textarea id="newMessage" class="form-control" v-model="message" />
            </div>
            <div class="col col-4">
              <button
                @click="newMessage($store.state.channel.id, $store.state.membre.id)"
                class="btn btn-light"
              >Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      message: ""
    };
  },
  methods: {
    GoToList: function(event) {
      this.$router.push("/Conversation");
    },GoToHome: function(event) {
      this.$router.push("/Home");
    },
    newMessage: function(channel_id, membre_id) {
      axios
        .post("channels/" + channel_id + "/posts", {
          member_id: membre_id,
          message: this.message,
          token: this.$store.state.token
        })
        .then(response => {
          this.message = "";
          axios
            .get("channels/" + channel_id + "/posts", this.$store.state.token)
            .then(response => {
              //Trying to save the messages
              this.$store.commit("setMessages", response);

              this.$store.commit("setChannel", channel);
              this.$router.push("/Messages");
            })
            .catch(error => console.log(error));
        });
    },

    gotoUser: function(membre) {
      this.$store.commit("setMembre", membre);
      this.$router.push("/Profil");
    },
    deleteConversation: function(id, token) {
      axios
        .delete("channels/" + id, token)
        .then(response => {
         this.$router.push("/Conversation");
        })
        .catch(error => console.log(error));
    },
    deleteMessage: function(msg ,token) {
     axios
        .delete("channels/" + msg.channel_id + "/posts/" + msg.id,token)
        .then(response => {
        this.$router.push("/Messages");
        })
        .catch(error => console.log(error));
    },
    logout: function(event) {
            axios.delete('members/signout', this.$store.state.token)
             .then(response => {
        this.$store.commit("logout", response.data);
        this.$router.push("/");
        })
        .catch(error => console.log(error));
            
        }
  }
};
</script>
