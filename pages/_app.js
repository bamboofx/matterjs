import { env } from '../next.config'
import '../styles/globals.css'
import { useEffect, useState } from 'react'
function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  useEffect(() => {
    console.log("useEffect")
    setIsClient(true);
    const addToHomeScreenButton = document.getElementById('abc');
    addToHomeScreenButton.addEventListener('click', () => {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          alert("your app is added to home screen")
        } else {
          alert("You are rejected to add to home screen")
        }

        // Reset the deferredPrompt variable
        addToHomeScreenButton.style.display = 'none';
      });
    });
    if ('serviceWorker' in navigator) {
      console.log("serviceWorker in navigator")
      navigator.serviceWorker.register("./assets/services/service-worker.js")
        .then((registration) => {
          console.log('Service Worker registration successful:', registration);
          // Check if the beforeinstallprompt event is supported
          if ('onbeforeinstallprompt' in window) {
            console.log("onbeforeinstallprompt in window")
            // Add an event listener to the beforeinstallprompt event
            window.addEventListener('beforeinstallprompt', (event) => {
              // Prevent the default behavior
              console.log("beforeinstallprompt event")
              event.preventDefault();
              
              setDeferredPrompt(envt)

              // Show your custom "Add to Home Screen" button
              
              addToHomeScreenButton.style.display = 'block';

              // Add an event listener to the button

            });
          }
          else {
            alert("If you are using Safari, please use the share button at top right conner and select Add to Home Screen")
          }
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

  }, [])
  return <Component {...pageProps} />
}

export default MyApp