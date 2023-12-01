import React, { useEffect } from 'react';
import GameComponent from '../components/GameComponent';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
 


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