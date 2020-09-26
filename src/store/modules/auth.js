import axios from "axios";
import axiosInstance from "@/services/axios";
import jwt from "jsonwebtoken";
import { rejectError } from "@/helpers";
import Vue from 'vue'

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }
  return false;
}
// import { auth } from 'firebase-admin'
export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  getters: {
    authUser(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    isMeetupOwner: (state) => meetupCreatorId => {
      if (!state.user) return false;
      return state.user._id === meetupCreatorId;
    },
    isMember: (state) => (meetupId) => {
      return state.user &&
        state.user["joinedMeetups"] &&
        state.user["joinedMeetups"].includes(meetupId)
      
    }
  },
  actions: {
    loginWithEmailPassword({ commit }, userData) {
      return axios
        .post("/api/v1/users/login", userData)
        .then(res => {
          const user = res.data;
          localStorage.setItem("meetuper-jwt", user.token);
          commit("setAuthUser", user);
        })
        .catch(err => rejectError(err));
    },
    registerUser(context, userData) {
      return axios
        .post("/api/v1/users/register", userData)
        .catch(err => rejectError(err));
    },
    logout({ commit }) {
      // For Session Authentication !
      // return axios
      //   .post("/api/v1/users/logout")
      //   .then(() => {
      //     commit("setAuthUser", null);
      //     return true;
      //   })
      //   .catch(err => {
      //     return err;
      //   });
      return new Promise((resolve, reject) => {
        localStorage.removeItem("meetuper-jwt");
        commit("setAuthUser", null);
        resolve(true);
      });
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      const token = localStorage.getItem("meetuper-jwt");
      const isTokenValid = checkTokenValidity(token);
      return new Promise(function(resolve, reject) {
        if (authUser && isTokenValid) {
          return resolve(authUser);
        }
        const config = {
          headers: {
            "Cache-Control": "no-cache"
            // 'authorization': `Bearer ${token}`
          }
        };
        return axiosInstance
          .get("/api/v1/users/me", config)
          .then(res => {
            const user = res.data;
            localStorage.setItem("meetuper-jwt", user.token);
            commit("setAuthUser", user);
            commit("setAuthState", true);
            return resolve(user);
          })
          .catch(err => {
            commit("setAuthUser", null);
            commit("setAuthState", true);
            return resolve(null);
          });
      });
    },
    addMeetupToAuthUser({commit,state},meetupId){
      // debugger
      const userMeetups = [...state.user['joinedMeetups'],meetupId]
      commit('setMeetupsToAuthUser',userMeetups)
    },
    removeMeetupFromAuthUser({commit,state},meetupId){

      // debugger
      const userMeeupsIds = [...state.user['joinedMeetups']]
      const index = userMeeupsIds.findIndex(userMeeupsId => userMeeupsId ===meetupId )

      userMeeupsIds.splice(index,1)
      commit('setMeetupsToAuthUser',userMeeupsIds)
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    },
    setMeetupsToAuthUser(state,meetups){
      return Vue.set(state.user,'joinedMeetups',meetups)

    }

  }
};
