import axios from 'axios'
import { auth } from 'firebase-admin'
export default {
    namespaced:true,
    state:{
        user:null,
        isAuthResolved:false
    },
    getters:{
        authUser(state){
            return state.user || null
        },
        isAuthenticated(state){
            return !!state.user
        }
    }
    ,
    actions:{
        loginWithEmailPassword({commit},userData){
            return axios.post('/api/v1/users/login',userData)
                .then(res=>{
                    const user = res.data
                    commit('setAuthUser',user)
                })
        },
        registerUser(context,userData){
            return axios.post('/api/v1/users/register',userData)
        },
        logout({commit}){
            return axios.post('/api/v1/users/logout')
                .then((res)=>{
                    commit('setAuthUser',null)
                    return true
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        getAuthUser({commit,getters}){
            const authUser = getters['authUser']
            if(authUser) { return Promise.resolve(authUser)}
            return axios.get('api/v1/users/me')
                .then(res=>{
                    const user = res.data
                    commit('setAuthUser',user)
                    commit('setAuthState',true)
                    return user
                })
                .catch(err =>{
                    console.log(err);
                    commit('setAuthUser',null)
                    commit('setAuthState',true)
                    return undefined
                })
        }
        
    },
    mutations:{
        setAuthUser(state,user){
            return state.user = user
        },
        setAuthState(state,authState){
            return state.isAuthResolved = authState
        }
    }
}