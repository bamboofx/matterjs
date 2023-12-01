import '../styles/globals.css'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    if("serviceWorker" in navigator){
      navigator.serviceWorker
      .register("/assets/services/service-worker.js")
      .then((reg)=>console.log("service worker registered",reg.scope))
      .catch((err)=>console.log("service worker not registered",err))
    }
  })
  return <Component {...pageProps} />
}

export default MyApp