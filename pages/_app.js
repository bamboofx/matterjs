import '../styles/globals.css'
import { useEffect,useState } from 'react'
function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    console.log("HOME")
    setIsClient(true)    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/assets/services/service-worker.js")
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
          console.log(document.getElementById("abc"))
          // Check if the beforeinstallprompt event is supported
          if ('onbeforeinstallprompt' in window) {
            // Add an event listener to the beforeinstallprompt event
            window.addEventListener('beforeinstallprompt', (event) => {
              // Prevent the default behavior
              event.preventDefault();

              // Store the event for later use
              const deferredPrompt = event;

              // Show your custom "Add to Home Screen" button
              const addToHomeScreenButton = document.getElementById('abc');
              addToHomeScreenButton.style.display = 'block';

              // Add an event listener to the button
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

  }
  )
  return <Component {...pageProps} />
}

export default MyApp