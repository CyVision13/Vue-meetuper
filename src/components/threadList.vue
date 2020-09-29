<template>
     <div class="content is-medium">
              <h3 class="title is-3">Threads</h3>
              <div v-for="thread in threads" :key="thread._id" class="box">
                <h4 id="const" class="title is-3">{{ thread.title }}</h4>
                <form class="post-craete">
                  <div class="field">
                    <textarea
                      placeholder="Write a post"
                      class="textarea textarea-post"
                    ></textarea>
                    <button :disabled="true" class="button is-primary m-t-tsm">
                      Send
                    </button>
                  </div>
                </form>

                <article
                  v-for="post in thread.posts"
                  :key="post._id"
                  class="media post-item"
                >
                  <figure class="media-left is-rounded user-image">
                    <p class="image is-32x32">
                      <img :src="post.user.avatar" alt="" class="is-rounded" />
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content is-medium">
                      <div class="post-content">
                        <strong class="author">{{ post.user.name }}</strong>
                        <small class="post-time">{{
                          post.updatedAt | formatTime("LLL")
                        }}</small>
                        <br />
                        <p class="post-content-message">{{ post.text }}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
</template>

<script>
export default {
    props:{
        threads:{
            type: Array,
            required:true
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
  figure {
    margin-bottom: 0;
  }
}

.media-content {
  background-color: #f1f1f1;
  padding: 3px 20px;
  border-radius: 10px;
  margin-right: 40px;
  width: 100px;
}

.media-left.user-image {
  margin: 0;
  margin-right: 15px;
}

.media + .media { 
  border: none;
  margin-top: 0;
}
.post-content {
  margin: 0;
  &-message {
    font-size: 16px;
  }
  .author {
    font-size: 16px;
  }
  .post-time {
    font-size: 16px;
  }
}
.textarea-post {
  padding-bottom: 30px;
}
.post-craete {
  margin-bottom: 15px;
}


</style>