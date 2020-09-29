export default {
    bind (el, binding){
        el.addEventListener('click',()=>{
            alert('Are you sure you want to continue ?')
        })
    },
    unbind(el){

    }
}