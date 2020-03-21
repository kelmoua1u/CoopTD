<template>
  <div class="ProfilInfo">
    <!-- BOOTSTRAP -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <!-- FIN BOOTSTRAP -->
    <br />
   
    <div class="container">
      <button class="btn btn-success" style="position: fixed;
                                             top: 10px !important;
                                             left: 10px !important;" 
                                             @click="goToMembers">
                                             Membres</button>
      <div class="row" style="margin-top:50px;margin-left:100px;">

        <div class="col col-4">
          <!-- Member info-->
          <div class="row justify-content-start">
         <div
        class="container-6 "
        style="padding: 1.5%;"
      >
        <div class=".col-6 .col-md-4" >
          <div class=" divgl" style="width: 18rem; border-radius: 10px;">
            <br />
            <div class="text-center ">
              
                <img src="https://image.freepik.com/vecteurs-libre/caricature-profil-homme-affaires_18591-58479.jpg" class="rounded" style="height: 100px; width: 100px;" />
            
            </div>
            <div class="card-body">
              <h6 class="card-title"> Nom : <b>{{$store.state.membre.fullname}}</b></h6>
              <h6 class="card-title"> Email : <b>{{$store.state.membre.email}}</b></h6>
              <h6 class="card-title"> Date de création : <b>{{$store.state.membre.created_at}}</b></h6>
              <center><button class="btn btn-dark"  @click="deleteUser($store.state.membre.id, $store.state.token)">Supprimer ce compte</button></center>
          </div>
          </div>
        </div>
      </div>
    </div>
          <br />
         
              
            
        </div>
        <!-- User messages -->
        <div class="col col-8">
          <!-- User messages -->
          <div class="card text-center" style="width: 100%;">
            <div class="card-body" style="background-color: #e9ecef">
              <h3 style="color:blue"> Messages :</h3>
              <div v-for="(msg,index) in $store.state.messages.data" :key="index" class="row">
                
                <div class="col col-3"></div>
                <div class="col col-6">
                  <div v-if="msg.member_id == $store.state.membre.id">
                    <div
                      class="alert alert-primary"
                      style="border: 2px solid #0774AF; border-radius: 20px 20px 20px 20px; color: #0774AF; background-color: white;"
                    >
                      <div v-for="owner in $store.state.membres" v-bind:key="owner">
                        <div v-if="owner.id == msg.member_id">
                          <h5
                            @click="gotoMessage(msg.channel_id, $store.state.token)"
                            style="cursor: pointer;"
                          >{{msg.message}}</h5>
                        </div>
                        <div v-if="owner.id == msg.member_id && (owner.id == msg.member_id) == 0">
                          <div class="alert alert-dark col-12" role="alert">Not messages yet!</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-3"></div>
              </div>
            </div>
          </div>
          <!-- End user messages-->
        </div>
      </div>
    </div>
    <br>
    <!-- Main Div -->
  </div>
</template>

<script>
export default {
  name: "ProfilInfo",
  methods: {
    goToHome() {
      this.$router.push("/Home");
    },goToMembers() {
      this.$router.push("/Members");
    },
    deleteUser: function(id, token) {
      axios
        .delete("members/" + id, token)
        .then(response => {
          this.$router.push("/Home");
        })
        .catch(error => console.log(error));
    },
    gotoMessage: function(id_channel, token) {
      
      axios
        .get("channels/" + id_channel + "/posts", token)
        .then(response => {
          
          this.$store.commit("setMessages", response);

          this.$router.push("/Messages");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>