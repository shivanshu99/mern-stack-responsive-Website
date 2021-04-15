if('serviceWorker' in navigator){
   window.addEventListener('load',()=>{
       navigator.serviceWorker
       .register('../serviceWorker.js')
       .then(reg=>console.log("Service worker Reg"))
       .catch(err=>console.log(`Error: ${err}`));
   })
}
else{
    console.log("not support")
}