# Paws for a Beer Website

## Setup

###Installing Dependencies

The project has some dependencies. They should be installed in the order below.

 - NodeJS
 - Grunt CLI

You'll need to have NodeJS installed to work on this site.
You can download/install it here: [www.nodejs.org](www.nodejs.org)

Once Node is installed, installing the actual project dependencies is easy. In a terminal/command prompt, navigate to the project root directory and run:

`npm install`

This will download a pile of dependencies to your project directory. You can now forget that this is even a thing, since you only have to do this once to set up the project.

One dependency that can't be automatically installed is the `grunt-cli` tool. If you don't have it (or don't know what it is, in which case, you don't have it), you'll need to install it. This one can be easily installed via NPM as well:

`npm install -g grunt-cli`

Congratulations. Your dependencies are ready to rock.

###Initial Setup

Now that all of the project dependencies are up and running, you'll also need to generate the "generated" files from the source you have. This is also easy!
In that same command window, run:

`grunt build:dev`

That will generate a few font files that are needed for running the site, and stop errors from occurring when you're running the dev server.
Note, you will need to run this command if you ever decide to add new icons to the source font directory, since it's the command that builds the actual font and CSS styleshets to make the icon font usable.

That's it!

## Running the dev server

You won't really be able to do any work on the site without the dev server running. You need to navigate to the project root directory in a command prompt/terminal, and run the command `npm start` to get the local development server.

Once the module bundler (Webpack) finishes starting up, you can access the site by going to the URL it specifies in the terminal. It will say something like `Listening at http://127.0.0.1:3000`. Navigate to that URL to see the site. In the event that the address is `http://0.0.0.0:xxxx` where 0.0.0.0 is the host name, using that URL may not work. In that case, replace `0.0.0.0` with `127.0.0.1` or `localhost`

This webpack instance is configured to automatically refresh whenever file changes occur. You shouldn't need to refresh the browser as you work.

## Generating Staging and Production Code
Need staging or production code? Easy!

**Note: Always run a staging build and upload it to the server _first_**. This will help eliminate any mistakes, it's the entire point of the staging environment.

In the root directory of the project, run the appropriate of the following two sets of commands in a command prompt/terminal:

### Build for staging:
`grunt build:staging`
`npm run build:staging`

### Build for Prod:
`grunt build:prod`
`npm run build:prod`

This will generate compiled source files in the `/dist/staging/` or `/dist/prod/` directory, depending on which build you ran. 

The items in your respective `/site/` directory should all be uploaded to the root directory for your target environment. For example, all `/dist/staging/site/` items should be uploaded to the root directory for `staging.pawsforabeer.com`.

The items in your respective `/asset/` directory should all be uploaded to the root directory for the target environment's asset root. For example, all `/dist/prod/asset/` items should be uploaded to the root director for `asset.pawsforabeer.com`.

## Image Creation

Responsive image support:

Breakpoints are at the following size ranges:

 - "xs": 000px -> 480px
 - "sm": 481px -> 768px
 - "md": 769px -> 992px
 - "lg": 993px -> 1200px
 - "xl": 1201px -> up

When authoring images, don't make an image wider than the maximum size for it's size. For instance, an image intended for mobile should never be larger than 480px wide. Since this is responsive design, the heigh is irrelevant - only widths matter.

