import Vue from 'vue';
import Router from 'vue-router'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageNotFound from '@/pages/PageNotFound'
import PageRegister from '@/pages/PageRegister'
import PageLogin from '@/pages/PageLogin'


Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name:'PageHome',
            component:PageHome
        },
        {
            path:'/meetups/:id',
            name:'PageMeetupDetail',
            component:PageMeetupDetail
        },
        {
            path:'/find',
            name:'PageMeetupFind',
            component:PageMeetupFind
        },
        {
            path:'/register',
            name:'PageRegister',
            component:PageRegister
        },
        {
            path:'/login',
            name:'PageLogin',
            component:PageLogin
        },
        {
            path:'*',
            name:'PageNotFound',
            component:PageNotFound
        }
    ],
    mode:'history'
})

export default router