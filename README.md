# TipXMR - The Livestream Tip Bot for OBS

TipXMR is a web based application that let's you accept donations in your livestream.

## The Goal

We want to provide an open source, non-custodial service for streamers all around the world to accept [XMR](https://www.getmonero.org) in their live streams and display some information about the donor.

This will allow for a censorship resistant income source, independent of the big players like Twitch, YouTube, PornHub and the like. :speak_no_evil:

## How it works

The biggest issue in the beginning was how to make this whole thing non-custodial AND easy to use. Thanks to the awesome [monero-javascript](https://github.com/monero-ecosystem/monero-javascript) library of woodser that now includes a Monero WASM wallet, we are able to offer just that. WASM or WebAssembly basically means that you are running a full Monero wallet in your browser. You are the only one controlling the keys, they never leave your system. But we are able to create a nice userinterface, a dashboard with settings, and much more.

Of course the details are of no concern to the normal user. The streamer simply navigates to tipxmr.live, clicks to create a new account and the WASM wallet will generate a XMR seed on the clients machine. The streamer writes down the seed and chooses a username.

Then the streamer can log in using only their seed. We have a small database running on our server that checks the hash of the seed and logs the user in if it checks out. The streamer is then shown a dashboard where they have an overview of their usage. The dashboard also includes a wallet section where they can send/recieve XMR (for instance if they want to withdraw to a cold storage). Last but not least the streamer can change some settings, i.e. how donations should be displayed etc.

Every steamer has their own animation URL that they can point an [OBS](https://obsproject.com/) browser source to. Donation messages are displayed there, so if the browser source in OBS is active, they will overlay over the stream.

For donors the whole process is very easy as well: The streamer simply displays his donation URL (tipxmr.live/\$username). Depending on the streamers configuration a donor can enter a message and their name. Once they hit "submit" the donors browser will query the streamers browser over our backend for a subaddress. Once the subaddress is payed the animation site of the streamer is refreshed and the message is displayed.

Donors are shown the subaddress with XMR URI and the corresponding QR code to pay either via desktop or mobile wallet.

Donations are accepted on a 0-conf basis, meaning they will be queued up to display once they are seen in the mempool.

It is surprising how easy paying with Monero actually is. Much easier than paying with PayPal or a bank. Also, way more private and cheaper.

# Getting Started

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies for TipXMR.

```bash
git clone https://github.com/hundehausen/tipxmr.git
npm install
npm start
```

## Usage

For the donor the process is as follows:

- Navigate to the tip website of the streamer :eyes:
- Entering a name and a message :speech_balloon:
- Paying an XMR address displayed on the website :money_with_wings:
- Wait for your message in the stream :computer:

For the streamer the process is as follows:

- Register a new account with only your streamer name :black_nib:
- Tipxmr.live will generate a seed in your browser :clipboard:
- Go to the settings and enter your streaming URL :tv:
- Customize your other settings such as colors and donation goals :wrench:
- Use our animation URL that we provide and use it as browser input source in [OBS](https://obsproject.com/) :computer:
- Keep your browser open to recieve donations :money_with_wings:

## Who we are

We are two Monero enthusiasts that have been following the project since the beginning of 2017. Our values are privacy, sound money and individual souvereignty. Crypto in general and Monero in particular fulfill these values and are the tool of the future.

In the beginning of 2018 we created the MoneroMumble Podcast, a german-speaking, monthly podcast/roundtable to inform and engage the German community about developments concerning Monero. The roundtables take place on the second Sunday of every month on Jitsi and are livestreamed to YouTube.

It was in this setting that the idea of a livestream donation program based on Monero was born. Tipxmr.live is therefore aiming to fulfill our need and we are our own customers.

Grischa, aka [hundehausen](https://github.com/hundehausen), has contributed many times to the Monero community, most recently with an infographic about the workings of a Monero wallet. Grischa also wrote his bachelor thesis on the thought of "Monero as a currency for the masses" (thesis in German).

Alex, aka [AlexAnarcho](https://github.com/AlexAnarcho), has been involved in the early days of the Monero Outreach and is a well-known outspoken advocate for Monero in the German community. Alex has been working for various cryptocurrency magazines such as the BeInCrypto and BTC-ECHO. In August he quit his full-time job at BeInCrypto to dedicate himself to tipxmr.live.

[mghny](https://github.com/mghny) - who chooses to remain pseudonymous - has been a professional software-engineer for 5 years and has been coding for 8 years. They have been involved with tipxmr.live since the very beginning and keeps an eye on architecture, code and many more technical aspects. It cannot be overstated how beneficial an experienced engineer is in a project like ours, since it reduces complexity and makes the code easily reusable by other developers.

## License

:balance_scale: [AGPL-3.0 License](https://github.com/hundehausen/tipxmr/blob/master/LICENSE)
