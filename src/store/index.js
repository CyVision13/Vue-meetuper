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
        
    },
    actions: {
        fetchMeetups({state,commit}){
            axios.get('/api/v1/meetups')
                .then(res =>{
                    const meetups = res.data
                    commit('setMeetups',meetups)
                    return state.meetups
                })
        },
        fetchCategories({state,commit}){
            axios.get('/api/v1/categories')
                .then(res =>{
                    const categories = res.data
                    commit('setCategories',categories)
                    return state.categories
                })  
        },
        fetchMeetupById({state,commit},meetupId){
            axios.get(`/api/v1/meetups/${meetupId}`)
            .then(res=>{
                const meetup = res.data
                commit('setMeetup',meetup)
                return state.meetup
            })
        },
        fetchThreads({state,commit},meetupId){
            axios.get(`/api/v1/threads?meetupId=${meetupId}`)
            .then(res=>{
                const threads = res.data
                commit('setThreads',threads)
                return state.threads
            })
        }
        
    },
    mutations: {
        setMeetups(state,meetups){
            state.meetups = meetups
        },
        setCategories(state,categories){
            state.categories = categories
        },
        setMeetup(state,meetup){
            state.meetup = meetup
        },
        setThreads(state,threads){
            state.threads= threads
        }
    }
})