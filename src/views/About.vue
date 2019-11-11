<template>
  <v-container class="md-3">
    <h1>BitMEX Perpetual Swap Dashboard</h1>
    <p>This is an open-source project hosted at <a href="https://gitlab.com/whizz/bps-dash">gitlab.com/whizz/bps-dash</a>, feel free to fork it and submit improvements.
    <p>This tool can be used to monitor your position when you are using BitMEX Perpetual Swap to hedge against Bitcoin price fluctuations.</p>
    <p>It's fairly experimental, though I use it myself. I am a really bad developer, mind you.</p>
    <h2>How to use</h2>
    <ul>
      <li>Generate a read-only API key and secret on the BitMEX website.</li>
      <li>Because BitMEX does not allow by default access to their API with browsers (by not sending CORS headers), you need to find a suitable CORS proxy or run one yourself. If you have the source code of this project, you can run one by running:<br>
      <br><pre>npm run proxy</pre><br>
      It will listen on port 8081 and settings are pre-filled with this proxy address. The proxy uses <a href="https://github.com/Rob--W/cors-anywhere/">CORS Anywhere</a>, where you can find a lot more info.</li>
      <li>Go to the <a href="settings">settings page</a> and enter the key and secret there.</li>
      <li>Return to the Dashboard and you should see your info pulled from BitMEX.</li>
      <li>Check the Javascript console in case it does not work.</li>
    </ul>
    <h2>Author</h2>
    <p>
      Written by
      <a href="https://taborsky.cz/about">Michal Taborsky</a>.
    </p>
    <h2>License</h2>
    <p>Licensed under the MIT License</p>
    <p>Copyright 2019 Michal Taborsky</p>
    <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
    <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
    <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
  </v-container>
</template>
