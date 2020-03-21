import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        isConnect: false,
        token: '',
        membres: '',
        channels: '',
        membre: '',
        channel: '',
        messages: ''
    },
    mutations: {
        Login(state, data) {
            state.token = data.token;
            state.membre = data.member;
            state.isConnect = true;
        },
        Logout(state, data) {
          state.isConnect = false;
          state.member = [];
          state.memberTokenSession = "";
        },
        setMembres(state, membres) {
            state.membres = membres
        },
        setChannels(state, channels) {
            state.channels = channels
        },
        setMembre(state, membre) {
            state.membre = membre
        },
        setChannel(state, channel) {
            state.channel = channel
        },
        setMessages(state, messages) {
            state.messages = messages
        }
    },
    actions: {},
    modules: {}
})