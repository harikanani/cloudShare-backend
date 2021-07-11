# cloudShare Backend

    An API to share files with friends, family, students, teachers, groups, etc. <br>
    You can use this project to implement your front-end project for file sharing API.
## Features
- Transfer files online to anyone.
- Send an Email to the Recipient
- Share file link to Recipient


---
## Requirements

For development, you will only need Node.js and a node global package, Yarn,<br> installed in your environment.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with the ```apt install```, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/harikanani/cloudShare-backend.git
    $ cd cloudShare-backend
    $ yarn install
            or
    $ npm install

## Configure app

Open the`.env.example` file and then edit it with your settings. You will need:

- An account on [sendinblue](https://www.sendinblue.com/) for sending email;
- An account on [MongoDB atlas](https://cloud.mongodb.com/) for database;

## Running the project

    $ yarn start
            or
    $ npm run start

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Support
    star 🌟 this project

Credit goes to `Codersgyan` YouTube channel 
