<template>
  
  <div >
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section">
      <div class="m-b-lg">
        <h1 class="title is-inline">Featured Meetups in "Location"</h1>
        <AppDropdown />
        <router-link v-if="user" :to="{name : 'PageMeetupCreate'}" class="button is-primary is-pulled-right m-r-sm">Create Meetups</router-link>
        <router-link :to="{name : 'PageMeetupFind'}" class="button is-primary is-pulled-right m-r-sm">All</router-link>
        <!-- <h1>{{someOtherGetter}}</h1> -->
      </div>
      <div class="row columns is-multiline"  >
      <MeetupItem 
        v-for="meetup in meetups"
               :key="meetup._id"
               :meetup ="meetup"
      />

        
        
      </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div  class="columns cover is-multiline is-mobile">
          <!-- category -->
          
            <CategoryItem 
              v-for="category in categories"
               :key="category._id"
               :category ="category"
            />
            
          </div>
        </div>
      </section>
    </div>
    <div class="container" v-else>
      <AppSpinner/>
    </div>
  </div>
  
</template>

<script>
  import CategoryItem from '@/components/CategoryItem'
  import MeetupItem from '@/components/MeetupItem'
  import {mapActions,mapState , mapGetters} from 'vuex'
  import pageLoader from '@/mixins/pageLoader'
  export default {
    components:{
      CategoryItem,
      MeetupItem 
    },
   
    mixins:[pageLoader],
    computed:{
        ...mapGetters({
          'user':'auth/authUser'
        }),
        ...mapState({
        meetups:(state)=> state.meetups.items,
        categories:(state)=> state.categories.items
      }),
      ...mapGetters({
        someOtherGetter:'testingGetter'
      })
    },
    created(){
      Promise.all([this.fetchMeetups(),this.fetchCategories()])
        .then(()=> {
          this.pageLoader_resolveData()
        })
        .catch((err)=> {
          console.log(err);
          this.pageLoader_resolveData()
        })
      // this.fetchMeetups()
      //   .then(()=>{
      //     return this.fetchCategories()
      //   })
      //   .then(()=>{
      //      this.isDataLoaded = true
      //   }) 
     
    },
    methods:{
      ...mapActions('meetups',['fetchMeetups']),
      ...mapActions('categories',['fetchCategories'])
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>
