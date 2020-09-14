<template>
  <div class="meetup-create-form">
    <div class="current-step is-pulled-right">
      {{currentStep}} of {{allStepsCount}}
    </div>
    <!-- Form Steps -->
    <MeetupLocation v-if="currentStep===1" />
    <MeetupDetail v-if="currentStep===2"/>
    <MeetupDescription v-if="currentStep===3"/>
    <MeetupConfirmation v-if="currentStep===4"/>

    <progress class="progress" :value="100" max="100">100%</progress>
    <div class="controll-btns m-b-md">
      <button @click="moveToNextStep" class="button is-primary m-r-sm">Back</button>
      <button @click="moveToPrevStep" class="button is-primary">Next</button>
      <!-- Confirm Data -->
      <!-- <button v-else
              class="button is-primary">Confirm</button> -->
    </div>
    <!-- Just To See Data in the Form -->
    <pre><code>{{form}}</code></pre>
  </div>
</template>

<script>
  import MeetupLocation from './MeetupLocation'
  import MeetupDetail from './MeetupDetail'
  import MeetupDescription from './MeetupDescription'
  import MeetupConfirmation from './MeetupConfirmation'
  export default {
    components: {
      MeetupLocation,
      MeetupDetail,
      MeetupDescription,
      MeetupConfirmation
    },
    data () {
      
      return {
        currentStep:1,
        allStepsCount:4,
        form: {
          location: null,
          title: null,
          startDate: null,
          category: null,
          image: null,
          shortInfo: null,
          description: null,
          timeTo: null,
          timeFrom: null
        }
      }
    },
    methods:{
      moveToNextStep(){
        if(this.currentStep <= 4)
          this.currentStep++;
      },
      moveToPreStep(){
        if(this.currentStep >= 1)
          this.currentStep++;
      }
    }
  }
</script>

<style scoped>
  .meetup-create-form {
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 840px;
    padding: 24px 16px 8px;
    width: 100%;
  }
</style>