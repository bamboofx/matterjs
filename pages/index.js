import React, { useEffect } from 'react';
import GameComponent from '../components/GameComponent';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
    console.log("HOME")
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register("/assets/services/service-worker.js")
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

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
                    console.log('User accepted the A2HS prompt');
                  } else {
                    console.log('User dismissed the A2HS prompt');
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


  return (
    <div>
      <Head>
        <title>My Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="manifest" href="/assets/manifest.json" />
        <link rel="icon" href="/assets/images/micon.jpg" type="image/png"></link>
      </Head>

      <GameComponent />
    </div>
  );
}