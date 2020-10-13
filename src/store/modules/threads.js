import Vue from 'vue'
import axios from "axios";
import axiosInstance from "@/services/axios";
import { applyFilters} from '@/helpers'

export default {
  namespaced: true,
  state: {
      isAllThreadsLoaded:false,
      items:[]
  },
  getters: {},
  actions: {
    fetchThreads({ state, commit }, {meetupId,filter = {},init}) {
      if(init){
        commit('setItems',{resoure:'threads',items:[]},{root:true})
      }
      

      const url = applyFilters(`/api/v1/threads?meetupId=${meetupId}`,filter)

      return axios.get(url).then(res => {
        const {threads,isAllDataLoaded} = res.data
        
        commit('setAllDataLoaded',isAllDataLoaded)
        commit(
          "mergeThreads",
           threads 
         
        );
        return state.items;
      }); 
    },
    postThread({ commit, state }, { title, meetupId }) {
      // console.log({state,commit},title,meetupId);
      const thread = {};
      thread.title = title;
      thread.meetup = meetupId;
      return axiosInstance.post(`/api/v1/threads`, thread)
      .then(res => {
        const createdThread = res.data;
        const index = state.items.length;

        commit(
          "addItemtoArray",
          { item: createdThread, index, resource: "threads" },
          { root: true }
        );
        return createdThread;
      });
    },
    sendPost({ commit, state ,dispatch},{postText,threadId}){
      const post = {text : postText , thread:threadId}

      return axiosInstance.post(`/api/v1/posts`, post)
        .then(res=>{
          const createdPost = res.data;
          dispatch(
            "addPostToThread",
            {post:createdPost,threadId },
            
          )
          return createdPost;
        })
      
      

    },
    addPostToThread({commit , state}, {post,threadId}){
      const threadIndex = state.items.findIndex(thread =>{
        return thread._id === threadId
      })
      if(threadIndex > -1 ) {
        const posts = state.items[threadIndex].posts
        posts.unshift(post) // reverse posts and take post to top instead of down
        commit('savePostToThread',{posts,index:threadIndex})
      }
    }
  },
  mutations: {
    savePostToThread(state, {posts,index}){
      Vue.set(state.items[index],'posts',posts)
    },
    setAllDataLoaded(state,isAllDataLoaded){
      state.isAllThreadsLoaded = isAllDataLoaded
    },
    mergeThreads (state,threads){
      state.items = [...state.items,...threads]
    }
  }
};
