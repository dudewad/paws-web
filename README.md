# Paws for a Beer Website

## Setup

You'll need to have NodeJS installed to work on this site.
You can download/install it here: [www.nodejs.org](www.nodejs.org)

Once Node is installed, setup is easy. In a terminal/command prompt, navigate to the project root directory and run:

`npm install` \<enter\>

This will download some things to your project directory.
That's it!

## Running the dev server

You won't really be able to do any work on the site without the dev server running. You need to navigate to the project root directory in a command prompt/terminal, and run the command `npm start` to get the local development server.

Once the module bundler (Webpack) finishes starting up, you can access the site by going to the URL it specifies in the terminal. It will say something like `Listening at http://127.0.0.1:3000`. Navigate to that URL to see the site. In the event that the address is `http://0.0.0.0:xxxx` where 0.0.0.0 is the host name, using that URL may not work. In that case, replace `0.0.0.0` with `127.0.0.1` or `localhost`

This webpack instance is configured to automatically refresh whenever file changes occur. You shouldn't need to refresh the browser as you work.