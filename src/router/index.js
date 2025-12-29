import { createRouter,createWebHistory } from "vue-router";
import HomeView from '@/views/homeView.vue';
import aboutView from '@/views/aboutView.vue';
import contactView from '@/views/contactView.vue';
import dashBoardView from '@/views/dashBoardView.vue';
import statisticsView from'@/views/statisticsView.vue';
import walletView from "@/views/walletView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'home',
            component:HomeView
        },
        {
            path:'/about',
            name:'about',
            component:aboutView
        },
        {
            path:'/contact',
            name:'contact',
            component:contactView
        },
        {
            path:'/dashboard',
            name:'dashboard',
            component:dashBoardView
        },
        {
            path:'/stats',
            name:'statistics',
            component:statisticsView
        },
        {
            path:'/wallet',
            name:'wallet',
            component:walletView
        },
    ]
})
export default router;