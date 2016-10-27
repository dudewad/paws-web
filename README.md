# Paws for a Beer Website

## Setup

###Installing Dependencies

The project has some dependencies. They should be installed in the order below.

 - NodeJS
 - Grunt CLI

You'll need to have NodeJS installed to work on this site.
You can download/install it here: [www.nodejs.org](www.nodejs.org)

Once Node is installed, installing the actual project dependencies is easy. In a terminal/command prompt, navigate to the project root directory and run:

`npm install` \<enter\>

This will download a pile of dependencies to your project directory. You can now forget that this is even a thing, since you only have to do this once to set up the project.

One dependency that can't be automatically installed is the `grunt-cli` tool. If you don't have it (or don't know what it is, in which case, you don't have it), you'll need to install it. This one can be easily installed via NPM as well:

`npm install -g grunt-cli`

Congratulations. Your dependencies are ready to rock.

###Initial Setup

Now that all of the project dependencies are up and running, you'll also need to generate the "generated" files from the source you have. This is also easy!
In that same command window, run:

`grunt webfont` \<enter\>

That will generate a few font files that are needed for running the site, and stop errors from occurring when you're running the dev server.
Note, you will need to run this command if you ever decide to add new icons to the source font directory, since it's the command that builds the actual font and CSS styleshets to make the icon font usable.

That's it!

## Running the dev server

You won't really be able to do any work on the site without the dev server running. You need to navigate to the project root directory in a command prompt/terminal, and run the command `npm start` to get the local development server.

Once the module bundler (Webpack) finishes starting up, you can access the site by going to the URL it specifies in the terminal. It will say something like `Listening at http://127.0.0.1:3000`. Navigate to that URL to see the site. In the event that the address is `http://0.0.0.0:xxxx` where 0.0.0.0 is the host name, using that URL may not work. In that case, replace `0.0.0.0` with `127.0.0.1` or `localhost`

This webpack instance is configured to automatically refresh whenever file changes occur. You shouldn't need to refresh the browser as you work.

## Generating Production Code
Need production code? Easy!

In the root directory of the project, run the following in a command prompt/terminal:

`npm run build:prod`

This will generate compiled source files in the `/dist/` directory. All of these files should be uploaded to the server as-is. However, the `/dist/content/` directory may need to be uploaded to the `contents.pawsforabeer.com` subdomain separately depending on deployment procedure.