

export default {
    bind (el) {
        el.__AutoResizer__ = () =>{
            setTimeout(() => {
                el.style.cssText = 'height : auto'
                const hieght = el.scrollHeight +2
                el.style.cssText = 'height:' + hieght  + 'px'
            }, 0);
        }
        el.addEventListener('keydown',el.__AutoResizer__)
    },
    unbind(el){ 
        el.removeEventListener('keydown',el.__AutoResizer__)
    }
}