<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="'/'">
        <h1 class="title is-4">VueMeetuper</h1>
      </router-link >
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="'/'" class="navbar-item">
          Home
        </router-link>

        <router-link  :to="{name:'PageMeetupFind'}" class="navbar-item">
          Find
        </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <router-link :to="'/'" class="navbar-link">
            More
          </router-link>

          <div class="navbar-dropdown">
            <router-link :to="'/about'" class="navbar-item">
              About
            </router-link>
            <router-link :to="'/jobs'" class="navbar-item">
              Jobs
            </router-link>
            <router-link :to="'/contact'" class="navbar-item">
              Contact
            </router-link>
            <hr class="navbar-divider">
            <router-link :to="'/report'" class="navbar-item">
              Report an issue
            </router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <!-- <div v-if="user" class="navbar-item">
          Welcome<span> &nbsp </span> <span class="button is-primary">{{user.name}}</span>
        </div> -->
        <div class="navbar-item">
          <div v-if="user">
            Welcome {{user.name}}
          </div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
              Account
          </a>
          <div class="navbar-dropdown">
            <a href="#" class="navbar-item">
                Profile
            </a>
            <hr class="navbar-divider">
            <a @click.prevent="Logout" class="navbar-item">
                Logout
            </a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown ">
          <div class="buttons">
            <router-link :to="{name: 'PageRegister'}" class="button is-primary">
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{name: 'PageLogin'}" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
        
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters({
        'user':'auth/authUser'
      })
    },
    methods:{
      Logout(){
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

<style scoped>
</style>
