<template>
<!-- <div> v-with-warning:red.prevent.yell="'what a nice day (:'"</div> -->
     <form class="post-craete">
                  <div class="field">
                    <textarea
                    
                      placeholder="Write a post"
                      class="textarea textarea-post"
                      rows="1"
                    ></textarea>
                    <button :disabled="true" class="button is-primary m-t-tsm">
                      Send
                    </button>
                  </div>
                </form>
</template>
<script>
import withWarning from '@/directives/withWarning'
export default {
    directives : {withWarning}
}
</script>
<style lang="scss" scoped>

.textarea-post {
  padding-bottom: 30px;
}
.post-craete {
  margin-bottom: 15px;
}

</style>