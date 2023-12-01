import React, { useEffect } from 'react';
import GameComponent from '../components/GameComponent';
import Head from 'next/head';

export default function Home() {

  useEffect(() => {

    if ('onbeforeinstallprompt' in window) {
      // Add an event listener to the beforeinstallprompt event
      console.log("beforeinstallprompt",window)
      
      window.addEventListener('onbeforeinstallprompt', (event) => {
        // Prevent the default behavior

        event.preventDefault();

        // Store the event for later use
        const deferredPrompt = event;

        // Show your custom "Add to Home Screen" button
        const addToHomeScreenButton = document.getElementsById('abc');
        console.log(addToHomeScreenButton)
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

  }
  )
  function addToHomeScreen() {
    // Add your logic to prompt user to add to home screen here
    console.log("Add to home screen clicked");
  }

  return (
    <div>
      <Head>
        <title>My Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="manifest" href="/assets/manifest.json" />
      </Head>

      <GameComponent />
    </div>
  );
}