export default {
    bind (el, binding){
        const message = binding.value ||  'Are you sure you want to continue ?'
        el.__withWarning__ = ()=>{
            alert(message)
        }

        el.addEventListener('click',el.__withWarning__)
        // el.addEventListener('click',()=>{
        //     alert('Are you sure you want to continue ?')
        // })

        // el.__AnnoyingInterval = setInterval(()=>{

        //     console.log('I am annoying message');
        // },1000)
    },
    unbind(el){
        // clearInterval(el.__AnnoyingInterval)
    }
}