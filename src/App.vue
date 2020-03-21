<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

    }
  },
  methods: {
    logout: function(event) {
            axios.delete('members/signout', this.$store.state.token)
        }
  },
  mounted() {
    axios.get('ping').then(() => {
      if (!this.IsConnect) {
        this.$router.push('/');
      }
    }).catch(() => {
      console.log('Membre connecté')
    })

   
  },

  computed : {
    IsConnected() {
      return this.$store.state.membre ? true : false;
    }
  },
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
  }

  #app {
    width: 100%;
    height: 100%;
    font-family: Tahoma;
    font-size: 1.6rem;
    color: #222;
    height: 100vh;
    
  }
  


</style>
