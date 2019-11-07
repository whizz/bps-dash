# BitMEX Perpetual Swap Dashboard

This tool can be used to monitor your position when you are using BitMEX Perpetual Swap to hedge against Bitcoin price fluctuations.

It's fairly experimental, though I use it myself. I am a really bad developer, mind you.

## How to use

- Generate a read-only API key and secret on the BitMEX website.
- Because BitMEX does not allow by default access to their API with browsers (by not sending CORS headers), you need to find a suitable CORS proxy or run one yourself. If you have the source code of this project, you can run one by running:

  ```
  npm run proxy
  ```

  It will listen on port 8081 and settings are pre-filled with this proxy address. The proxy uses [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/), where you can find a lot more info.
- Go to the [settings page](settings) and enter the key and secret there.
- Return to the Dashboard and you should see your info pulled from BitMEX.
- Check the Javascript console in case it does not work.

## Author

Written by [Michal Taborsky](https://taborsky.cz/about).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
