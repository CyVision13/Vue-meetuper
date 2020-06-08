<template>
  <div class="container">
      <ErrorView :title="'Ooooops, Page you are Trying to access doesn\'t exist'"
                 :status="'404'" 
                 :navigateToPage="'PageHome'" 
                 :navigateToText="'Navigate Back Home'">

      </ErrorView>
  </div>
</template>

<script>
    import ErrorView from    '@/components/ErrorView'
  export default {
      components:{
          ErrorView
      }
  }
</script>

<style scoped>
  
</style>