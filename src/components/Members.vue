<template>
    <div class="members">
         <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <div class="row justify-content-start">
      <div
        v-for="membre in $store.state.membres"
        v-bind:key="membre"
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
              <h6 class="card-title"> Nom : <b>{{membre.fullname}}</b></h6>
              <h6 class="card-title"> Email : <b>{{membre.email}}</b></h6>
              <h6 class="card-title"> Date de création : <b>{{membre.created_at}}</b></h6>
              
              <center><button class="btn btn-danger" v-if="membre.id != $store.state.membre.id" @click="deleteUser(membre.id,$store.state.token)">Supprimer</button></center>
              <center><button class="btn btn-primary" v-if="membre.id == $store.state.membre.id" @click="gotoUser(membre)">Profil</button></center>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>




<script>
export default {
  name: "members",
  mounted() {
    this.getMembersList()
  },
  methods: {
    showMembersList: function(event) {
      axios.get("members").then(response => {
        this.$store.commit("setMembres", response.data);
      });
    },
    getMembersList: function(event) {
      axios.get("members").then(response => {
        this.$store.commit("setMembres", response.data);
      });
    },
    linktoConversation: function(event) {
      this.$router.push("/Conversation");
    },
    deleteUser: function(id, token) {
      axios
        .delete("members/" + id, token)
        .then(response => {
          this.$router.push("/Home");
        })
        .catch(error => console.log(error));
    },

    gotoUser: function(membre) {
      this.$store.commit("setMembre", membre);
      this.$router.push("/Profil");
    }
  }
};
</script>
<style >
.divgl{
    background-color:#0774AF;
}

</style>