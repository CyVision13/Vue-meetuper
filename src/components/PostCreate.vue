<template>
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
export default {
    
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