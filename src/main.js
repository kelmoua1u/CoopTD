import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

window.axios = axios.create({
    baseURL: 'https://tools.sopress.net/iut/coop/api',
    headers: {
        'Authorization': '584e480ca6f8fd96e13b41ea9602413e283986f0'
    }
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),

    beforeCreate() {
        window.axios.interceptors.request.use((config) => {
            if (this.$store.state.token) {
                config.url += '?token=' + this.$store.state.token;
            }
            return config;
        }, error => {
            return console.log(error)
        })
    }
}).$mount('#app')