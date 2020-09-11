import axios from "axios";
import axiosInstance from "@/services/axios"
import jwt from 'jsonwebtoken'
function checkTokenValidity (token){
  if(token){
    const decodedToken =jwt.decode(token)
    return decodedToken && (decodedToken.exp *1000) > new Date().getTime()
  }
  return false
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
    }
  },
  actions: {
    loginWithEmailPassword({ commit }, userData) {
      return axios.post("/api/v1/users/login", userData).then(res => {
        const user = res.data;
        localStorage.setItem('meetuper-jwt',user.token)
        commit("setAuthUser", user);
      });
    },
    registerUser(context, userData) {
      return axios.post("/api/v1/users/register", userData);
    },
    logout({ commit }) {
      return axios
        .post("/api/v1/users/logout")
        .then(() => {
          commit("setAuthUser", null);
          return true;
        })
        .catch(err => {
          return err;
        });
    },
    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      const token = localStorage.getItem('meetuper-jwt')
      const isTokenValid = checkTokenValidity(token)
      return new Promise(function(resolve, reject) {
        if (authUser && isTokenValid) {
          return resolve(authUser);
        }
        const config = {
          headers: {
            "Cache-Control": "no-cache",
            // 'authorization': `Bearer ${token}`
          }
        };
        return axiosInstance
          .get("/api/v1/users/me", config)
          .then(res => {
            const user = res.data;
            localStorage.setItem('meetuper-jwt',user.token)
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
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.user = user;
    },
    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    }
  }
};
