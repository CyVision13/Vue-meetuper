<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Register</h3>
          <p class="subtitle has-text-grey">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
                <img src="https://placehold.it/128x128">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input v-model="form.username" 
                        @blur="$v.form.username.$touch()"
                        class="input is-large"
                         type="text"
                         placeholder="Username">
                         <div v-if="$v.form.username.$error" class="form-error">
                    <span v-if="!$v.form.username.required" class="help is-danger">
                      Username is Required
                    </span>  
                     
                  </div> 
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.name" 
                          @blur="$v.form.name.$touch()"
                          class="input is-large"
                         type="text"
                         placeholder="Name">
                         <div v-if="$v.form.name.$error" class="form-error">
                    <span v-if="!$v.form.name.required" class="help is-danger">
                      name is Required
                    </span>  
                      
                  </div> 
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.email"
                          @blur="$v.form.email.$touch()"
                         class="input is-large"
                         type="email"
                         placeholder="Your Email">
                         <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">
                      Email is Required
                    </span>  
                    <span v-if="!$v.form.email.email" class="help is-danger">
                      Email Address is not valid
                    </span>  
                  </div> 
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.avatar"
                          @blur="$v.form.avatar.$touch()"
                         class="input is-large"
                         type="text"
                         placeholder="Avatar"
                         autocomplete="">

                  <div v-if="$v.form.avatar.$error" class="form-error">
                    <span v-if="!$v.form.avatar.required" class="help is-danger">
                      avatar is Required
                    </span>  
                    
                    <span v-if="!$v.form.avatar.supportedFileType" class="help is-danger">
                      SELECTED FileType is not valid
                    </span> 
                  </div>

                          
                         
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.password"
                        @blur="$v.form.password.$touch()"
                         class="input is-large"
                         type="password"
                         placeholder="Your Password"
                         autocomplete="new-password">
                         <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">
                      password is Required
                    </span>  
                    <span v-if="!$v.form.password.minLength" class="help is-danger">
                      password minimum length is 6 letters
                    </span>  
                    
                  </div> 
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input v-model="form.passwordConfirmation"
                           @blur="$v.form.passwordConfirmation.$touch()"
                         class="input is-large"
                         type="password"
                         placeholder="Password Confirmation"
                         autocomplete="off">
                         <div v-if="$v.form.passwordConfirmation.$error" class="form-error">
                    <span v-if="!$v.form.passwordConfirmation.required" class="help is-danger">
                      passwordConfirmation is Required
                    </span>    
                    <span v-if="!$v.form.passwordConfirmation.sameAs" class="help is-danger">
                      passwordConfirmation should be the same as password
                    </span>    
                  </div> 
                </div>
              </div>
              <button @click.prevent="register" type="submit" class="button is-block is-info is-large is-fullwidth">Register</button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link :to="{name:'PageLogin'}"  >
                <strong>Login</strong>
            </router-link> &nbsp;·&nbsp;
            <router-link :to="{name:'PageRegister'}" >
                <strong>Sign up</strong>
            </router-link> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {required,email,minLength,url,sameAs} from 'vuelidate/lib/validators'
  import {supportedFileType} from '@/helpers/validators'
  export default {
    data(){
      return {
        form:{
          username:null,
          name:null,
          email:null,
          avatar:null,
          password:null,
          passwordConfirmation:null
        }
      }
    },
    validations:{
      form:{
        username:{},
          name:{},
          email:{email},
          avatar:{url,supportedFileType},
          password:{minLength:minLength(6)},
          passwordConfirmation:{sameAs:sameAs('password')}
      }
    },
    methods:{
      register(){
        this.$v.form.$touch()
        this.$store.dispatch('auth/registerUser',this.form)
          .then(()=> this.$router.push('/login'))
          .catch(errorMessage=>{
           
          this.$toasted.error(errorMessage, { duration: 5000 });
          })
      }
    }
  }
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  input {
    font-weight: 300;
  }
  p {
    font-weight: 700;
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>