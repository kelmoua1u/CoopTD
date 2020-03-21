import Vue from 'vue'
import VueRouter from 'vue-router'
import Singup from '../components/Singup.vue'
import Menu from '../components/Menu.vue'
import Conversation from '../components/Conversation.vue'
import ProfilInfo from '../components/ProfilInfo.vue'
import Messages from '../components/Messages.vue'
import Members from '../components/Members.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'singup',
        component: Singup
    },
    {
        path: '/Home',
        name: 'menu',
        component: Menu
    },
    {
        path: '/members',
        name: 'members',
        component: Members
    },
    {
        path: '/Conversation',
        name: 'Conversation',
        component: Conversation
    },
    {
        path: '/Profil',
        name: 'Profil',
        component: ProfilInfo
    },
    {
        path: '/Messages',
        name: 'Messages',
        component: Messages
    }
]

const router = new VueRouter({
    routes
})

export default router