



const customPlugin = {
    install: function(Vue, options){

        // 1. Add global method or property
        Vue.myGlobalMethod = function(){
            alert("I am global method!")
        }

        Vue.myGlobalProperty = 'I am Custom Property'

        // 2. Add global asset
        Vue.directive('blue-color',{
            bind (el,binding){
                el.style.color = 'blue'
            }
        })
        // 3. inject some component Options, mixins
        Vue.mixin({
            data(){
                return {
                    custom_message:'ROAAAAAAAAAAAAAR'
                }
            },
            created(){
                console.log('Custom mixin created');
            },
            methods:{
                scream(){
                    alert(this.custom_message)
                }
            }
        })
        // 4. Add an instance method or property
        Vue.prototype.$customMethod = function (){
            alert('I am custom instance method')
        }
    }
}