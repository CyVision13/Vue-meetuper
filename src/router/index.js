import Vue from 'vue';
import Router from 'vue-router'
import store from   '@/store'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageNotFound from '@/pages/PageNotFound'
import PageRegister from '@/pages/PageRegister'
import PageLogin from '@/pages/PageLogin'
import PageSecret from '@/pages/PageSecret'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'


Vue.use(Router)

const router = new Router({
    routes:[
        {
            path:'/',
            name:'PageHome',
            component:PageHome
        },
        {
            path:'/meetups/secret',
            name:'PageSecret',
            component:PageSecret,
            beforeEnter(to,from,next){
                if(store.getters['auth/isAuthenticated']){
                    next()
                }else {
                    next({name: 'PageNotAuthenticated'})
                }
            }
        },
        {
            path:'/meetups/:id',
            name:'PageMeetupFind',
            component:PageMeetupFind
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
            path:'/401',
            name:'PageNotAuthenticated',
            component:PageNotAuthenticated
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