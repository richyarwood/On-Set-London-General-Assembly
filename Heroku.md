To login

``````json
heroku login
``````

To remove node modules

``````json
rm -rf react-sms-translate/node_modules
``````

`cd` to chosen directory, eg `development`


``````json
mv CLASSWORK/react-sms-translate
``````
``````json
cd react-sms-translate
``````

`yarn` to reinstall node packages, this is neccessary otherwise the mode module paths would be wrong

``````json
git init
``````

``````json
git add .
``````

``````json
git commit -m "first init"
``````

`yarn run:server` & `yarn run:client` on two tabs

``````json
atom .
``````

`yarn build` this will only work if in the `package.json`, in the scripts `"build": "webpack -p"` is included.

in package.json, the scripts should look like this:
``````json
  "scripts": {
    "run:client": "webpack-dev-server",
    "run:server": "nodemon",
    "seed" : "node seeds",
    "build": "webpack -p",
    "start": "node index"
  },
``````
in the console, test the files locally with
``````json
yarn build
``````
``````json
yarn start
``````

`touch .gitignore` and add `dist`

in `index.js` add:
``````json
app.use(express.static(`${__dirname}/dist`)) // redirects the requests to the new `dist` folder
``````

``````json
git add .
``````

``````json
git commit -m "added build task"
``````

``````json
heroku create --region=eu sammii-sms-translate
``````

``````json
git push heroku master
``````

``````json
heroku open
``````

in the environment.js, add:
``````json
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/got-db'
``````
before we run the next command, first we should run:
``````json
heroku config
``````

the data in the .env file is not pushed to hero so in terminal we need to run 
``````json
heroku config:set accountSid="ACaf7dfa1776a5ac2b0eeeb61fce4ccbb1"
``````
or set the `secret` by:
``````json
heroku config:set SECRET="a6nq634nfoadk"
``````
and any other data we have stored

`heroku config` will display all the data stored in the `heroku config`

in `environment.js` preferably or `index.js` import port by:
``````json
const port = process.env.PORT || 4000
``````
to use the port asigned by heroku or port 4000 and update 4000 to `port` in the `app.listen`

``````json
app.listen(port, () => console.log(`Express is running on ${port}`))
``````

Once the db has been deployed, the db is dropped, so we need to `heroku run yarn seed`

As there is a race issue, and the users are being created at the same time as the db drop, we need to add the user create after the drop db in a then statement
``````json
mongoose.connect(dbUri, (err, db) => {
  // delete the database (yeah really we're doing that!)
  db.dropDatabase()
    .then(() => {
      // add some new data
      User.create({
        username: 'mickyginger',
        email: 'mike.hayden@ga.co',
        password: 'pass',
        passwordConfirmation: 'pass'
      })
    })
``````

it is important to add and commit files for every change before pushing to heroku master branch

`heroku logs --tail` logs all the errors

---
this line populates the createdBy object, but removes the email saved
``````json
.populate('createdBy', '-email')
``````
`.select` selects the keys to use, the `-` says dont select a certain object
``````json
.select('-modifiedBy') 
``````

to exclude ever sending a users password, within the User.js model, after password in the userSchema add: 

``````json
..., {
  toJSON: {
    transform(doc, json) {
      delete json.password
      delete json.__v
      return json
    }
  }
}
``````

to create a profile route, in auth.js add: 
``````json
function profileRoute(req, res) {
  res.json(req.currentUser)
}
`````` 
and remeber to include the profileRoute in the `module.exports`

then in routes.js, insert 
``````json
router.get('/me', secureRoute, authController.profile)
``````

in the User.js model, add:
``````json
userSchema.virtual('characters', {
  localField: '_id',
  forgeignField: 'createdBy',
  ref: 'Character' // if `_id` and `createdBy _id` match, when refercning the `Character` model, pull them in
})
``````

then within the User.js model, include
``````json
virtuals: true, // add virtuals to the JSON
``````
within the toJSON object.

At this point the characters will be null, until we change `profileRoute`
``````json
function profileRoute(req, res) {
  User.populate(req.currentUser, { path: 'characters' })
    .then(user => res.json(user))
}
``````

``````json

``````