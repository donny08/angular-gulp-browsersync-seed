# angular-gulp-browsersync-seed

This is a basic starter project to initialize your project using [AngularJS](http://angularjs.org/) and [Gulp](http://gulpjs.com/). It follows MVC architecture and uses the perfect app structure to enhance productivity. This seed contains a sample AngularJS application with useable Gulp tasks which comes in handy for the build process. This app also uses [Bower](https://bower.io/) as the client-side package manager.

### Prerequisites

You must have [Git](http://git-scm.com/) and node.js and its package manager [npm](http://nodejs.org/) installed.

### Getting Started

To get you started you can simply clone the angular-gulp-browsersync-seed repository and install the dependencies:

Clone the angular-gulp-browsersync-seed repository using the command and change the directory to the root folder.

```
git clone https://github.com/donny08/angular-gulp-browsersync-seed.git
cd angular-gulp-seed
```

For installing dependencies in this project which would install the core packages using node and the angular packages using bower

I have set pre-install script which installs bower too. Run this command to install the dependencies.

```
npm install
```
After completing this command, run the following command to install the bower components which would install them in `app/bower_components`. This folder is predefined in `.bowerrc` file in the root folder.

```
bower install
```

### Using Gulp

I have written some useful tasks in gulp to manage the build and for development web server.

For serving the app locally, Use

```
gulp
```

The above task uses [BrowserSync](https://www.browsersync.io/) which enables hosting and also implements live-reloading (Which basically means, the hosted app reloads everytime you save any changes in code). You would be redirected to the app at `http://localhost:3000`.

For Building the production version which would make your app ready for deployment use the following command.

```
gulp build
```

The above command minifies the js and css files and concatenates them too. The vendor and user js and css files are seperated into different files. All the production file can be found in `dist/` folder. 


### Directory Layout

```
app/                    --> all of the source files for the application
  bower_components/     --> all the angular components and the custom dependencies would be found here  
  modules/           		--> all the app specific javascript files
    login/
      	index.js             	--> Main JavaScript file      	
      	login.controllers.js 	--> All the app controllers are written in this file
      	login.directives.js  	--> Custom directives are implemented in this file
      	login.filters.js     	--> custom filters are implemented in this file
        login.service.js    --> All the app services are written in this file
      	login.view.html 		--> the partial template
  css/                	--> The user defined Stylesheets are in here
    main.css                --> The main CSS file 
  config.js              --> to store the configuration
  app.js                --> Angular configuration file
  index.html            --> app layout file (the main html template file of the app)
dist/                   --> The build would be found here which could be pushed to production
```

### Contribute 

As this my first open source project please have a look at this and suggest feedbacks, better contribute. 

### Troubleshooting

For Error: watch /home/xyz/projects/angular-gulp-seed/app/modules/register/ ENOSPC

soln: Run on cmd: echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p 
