<template>
  <!-- <div> v-with-warning:red.prevent.yell="'what a nice day (:'"</div> -->
  <form class="post-craete">
    <div class="field">
      <textarea
        v-model="text"
        v-auto-expand
        placeholder="Write a post"
        class="textarea textarea-post"
        rows="1"
      ></textarea>
      <button @click.prevent="createPost" :disabled="!text" class="button is-primary m-t-tsm">Send</button>
    </div>
  </form>
</template>
<script>
// import withWarning from '@/directives/withWarning'
import autoExpand from "@/directives/autoExpand";
export default {
  props :{
    threadId :{
      required:true,
      type:String,
    }
  },
  directives: { autoExpand },
  data(){
    return {
      text : null
    }
  },
  methods:{
    createPost(){
      const post = {
        postText : this.text , 
        threadId : this.threadId
        }
      this.$store.dispatch('threads/sendPost' ,post)
      .then((cretedPost)=>{
        this.$root.socket.emit('meetup/postSave',cretedPost)
        this.text = null 
      })
      
    }
  }
};
</script>
<style lang="scss" scoped>
.textarea-post {
  padding-bottom: 30px;
}
.post-craete {
  margin-bottom: 15px;
}
</style>