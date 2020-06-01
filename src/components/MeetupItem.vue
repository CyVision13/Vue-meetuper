<template>
    <div class="column is-one-third">
          <!-- <router-link :to="'/meetups/' + meetup._id" class="card large"> -->
          <router-link :to="{name:'PageMeetupDetail', params:{id:meetup._id}}" class="card large">
            <div class="card-image">
              <figure class="image is-4by3">
                  <img  :src="meetup.image" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="level m-b-md">
                <div class="media-left">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="title">{{meetup.startDate | formatTime('MMM')}}</p>
                      <p class="title">{{meetup.startDate | formatTime('D')}}</p>
                    </div>
                  </div>
                </div>
                <div class="media-content">
                    <p class="title is-4 no-padding is-marginless">{{meetup.title}}</p>
                       <span class="tag is-success">{{meetup.category.name}}</span>
                    <p class="subtitle is-7">{{meetup.location}}</p>
                </div>
              </div>
              <div class="content">
                  {{meetup.shortInfo}}
                  <div class="background-icon"><span class="icon-twitter"></span></div>
              </div>
            </div>
          </router-link>
        </div>
</template>
<script>
export default { 
    props:{
        meetup:{
            required:true,
            type:Object
        }
    }
}
</script>
<style  scoped>

</style>