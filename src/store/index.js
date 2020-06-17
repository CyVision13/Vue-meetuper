import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        meetups:[],
        categories:[],
        threads:[],
        meetup:{}
    },
    getters: {
        meetups(state){
            return state.meetups
        },
        categories(state){
            return state.categories
        }
    },
    actions: {
        fetchMeetups(context){
            axios.get('/api/v1/meetups')
                .then(res =>{
                    const meetups = res.data
                    context.commit('setMeetups',meetups)
                })
        },
        fetchCategories(context){
            axios.get('/api/v1/categories')
                .then(res =>{
                    const categories = res.data
                    context.commit('setCategories',categories)
                })  
        }
        
    },
    mutations: {
        setMeetups(state,meetups){
            state.meetups = meetups
        },
        setCategories(state,categories){
            state.categories = categories
        }
    }
})