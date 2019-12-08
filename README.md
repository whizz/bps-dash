# BitMEX Perpetual Swap Dashboard

This tool can be used to monitor your position when you are using [BitMEX](https://www.bitmex.com/register/wJ5Z4a) Perpetual Swap to hedge against Bitcoin price fluctuations. For more details, [read my article](https://taborsky.cz/posts/2019/hedging-bitcoin-volatility/).

It's fairly experimental, though I use it myself. I am a really bad developer, mind you.

![Dashboard screenshot](bps-dash-screenshot.png)

## Security

The tool is inteded to be used locally, due to the sensitive nature of data it handles. Although it does not send anything anywhere other than the BitMEX API, you should not trust me on that. You should inspect the source code, ideally, so that you'll understand what it does.

## How to use

- Clone the repository to your drive.
- Install dependencies by running:
    ```
    npm install
    ```
- Launch the app:
    ```
    npm run serve
    ```
- Navigate to http://localhost:8080
- Generate a read-only API key and secret on the BitMEX website.
- Because BitMEX does not allow by default access to their API with browsers (by not sending CORS headers), you need to find a suitable CORS proxy or run one yourself. If you have the source code of this project, you can run one by running this in a separate terminal window:

  ```
  npm run proxy
  ```

  It will listen on port 8081 and settings are pre-filled with this proxy address. The proxy uses [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/), where you can find a lot more info.
- Go to the [settings page](settings) and enter the key and secret there.
- Return to the Dashboard, hit REFRESH and you should see your info pulled from BitMEX.
- Check the Javascript console in case it does not work.
- The dasboard will auto update every 30 seconds.

## Server deployment

If you wish to deploy on your personal server or for your friends, it can be done this way. The instructions assume you have node.js/npm installed on the machine, you run Apache and you are using a systemd init.

Download and build the most recent version:

```shell
cd /opt
git clone https://gitlab.com/whizz/bps-dash.git
cd bps-dash
npm install && npm run build
```

Next we'll setup the CORS Anywhere proxy to run on the server. Because we don't want to run an open proxy, we'll hide it behind a secret URL. I assume at this day and age you are running a HTTPS website. If not, stop right now and go fix that first.

We'll create systemd service for the proxy. Create a file `/etc/systemd/system/cors-proxy.service` with following content:

```ini
[Unit]
Description=CORS proxy
After=network.target

[Service]
User=root
Group=root
ExecStart=/bin/npm run proxy
WorkingDirectory=/opt/bps-dash

Restart=always
PrivateTmp=true
TimeoutStopSec=60s
TimeoutStartSec=2s
StartLimitInterval=120s
StartLimitBurst=5

[Install]
WantedBy=multi-user.target
```

Enable and start the proxy server:

```shell
systemctl enable cors-proxy
systemctl start cors-proxy
```

At last, we'll configure Apache. This is the Apache config file template. Replace YOURDOMAIN with your hostname and SECRET with a randomly generated alpahumeric string of sufficient length, such as "Kf6sy7Fvd0". Add the config to your Apache server and reload it.

```apache
<VirtualHost *:443>
    ServerName YOURDOMAIN
    CustomLog /var/log/httpd/YOURDOMAIN.log combined
    ErrorLog  /var/log/httpd/YOURDOMAIN-error.log
    DocumentRoot /opt-bps-dash
    <Directory /opt/bps-dash>
        AllowOverride All
        Require all granted
    </Directory>

   ProxyPass /proxy/SECRET/ http://localhost:8081/
   ProxyPassReverse /proxy/SECRET/ http://localhost:8081/

   ; Your SSL config probably also goes here

</VirtualHost>
```

After that, you can navigate to https://YOURDOMAIN and you should see the dashboard. Go to Settings, enter your API details and into the "CORS proxy" field, enter "https://YOURDOMAIN/proxy/SECRET/". When you return to the dashboard, the data should refresh and everything should work.

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
