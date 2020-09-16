<template>
  <form  @input="emitFormData">
    <div class="field">
      <label class="title m-b-sm">Choose Title</label>
      <input  v-model="form.title"
              @blur="$v.form.title.$touch()"
             class="input"
             type="text"
             placeholder="Enter Title">
      <div v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="help is-danger">Title is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">Starts Date</label>
      <datepicker
        @input="setDate" 
        :disabledDates="disabledDates"
        :value="form.startDate "
        :input-class="'input'"></datepicker>
      <jdp @input="setDate"   min="" :inputClass="'input'"></jdp>
      <div v-if="$v.form.startDate.$error">
        <span v-if="!$v.form.startDate.required" class="help is-danger">Starts at is required</span>
      </div>
    </div>
    <div class="field">
      <label class="title m-b-sm">From</label>
      <input v-model="form.timeFrom"
            @blur="$v.form.timeFrom.$touch()"
             class="input"
             type="text"
             placeholder="Time From">
    </div>
    <div class="field">
      <label class="title m-b-sm">To</label>
      <input v-model="form.timeTo"
            @blur="$v.form.timeTo.$touch()"
             class="input"
             type="text"
             placeholder="Time to">
    </div>
    <div class="field">
      <label class="title m-b-sm">Please Choose the Category.</label>
      <div class="m-b-lg">
        <div class="select">
          <!-- TODO: Get Here Categories -->
          <select v-model="form.category" 
            @blur="$v.form.category.$touch()"
          @change="emitFormData">
            <option v-for="category of categories"
                    :value="category"
                    :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div v-if="$v.form.category.$error">
          <span v-if="!$v.form.category.required" class="help is-danger">Category is required</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
  import moment from 'moment'
  import Datepicker from 'vuejs-datepicker'
  import { required } from 'vuelidate/lib/validators'
  export default {
    components:{
      Datepicker,
      jdp: VuePersianDatetimePicker
    },
    data () {
      return {
        disabledDates:{
          customPredictor:function(date){
            const today = new Date()
            const yesterday = today.setDate(today.getDate() -1)
            return date < yesterday
          }
        },
        today : new Date(),
        form: {
          title: null,
          startDate: new Date(),
          timeTo: null,
          timeFrom: null,
          category: null
        }
      }
    },
    validations: {
      form: {
        title: { required },
        startDate: { required },
        category: { required },
        timeTo: { required },
        timeFrom: { required }
      }
    },
    computed:{
      categories(){
        return this.$store.state.categories.items
      }
      
    },
    created(){
      this.emitFormData()
    },
    methods:{
      emitFormData(){
        this.$emit('stepUpdated',{data:this.form,isValid: !this.$v.$invalid})
      },
      setDate(date){
        
        this.form.startDate = moment(date).format()
        this.emitFormData()
      },
      setMin(){
        const today = new Date();
        return today;
      }
    }
  }
</script>

<style scoped>
  .time-picker {
    display: block;
  }
</style>