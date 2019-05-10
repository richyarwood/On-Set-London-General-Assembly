const mongoose = require('mongoose')
const Film = require('./models/Film')
const Location = require('./models/Location')




mongoose.connect('mongodb://localhost:27017/on-set-london', (err, db) => {

  db.dropDatabase()
    .then(() => {
      return Film.create([{
        title: 'Da Vinci Code'
      },
      {
        title: 'Lawrence of Arabia'
      }])
    })
    .then(films => {

      const [ daVinciCode, lawrenceOfArabia ] = films

      return Location.create([{
        name: 'Whitechapel Gallery',
        image: 'https://www.whitechapelgallery.org/wp-content/uploads/2015/01/Whitechapel-Gallery-Photo-Guy-Montagu-Pollock-at-Arcaid-Courtesy-Whitechapel-Gallery-2.jpg',
        coordinates: {
          lat: '-0.072650',
          long: '51.513828'
        },
        films: [daVinciCode, lawrenceOfArabia],
        areaOfLondon: 'East London',
        streetAddress: '77-82 Whitechapel High St, Shadwell, London',
        postCode: 'E1 7QX',
        sceneNotes: [{
          text: 'This is some text which describes the what happened in the film',
          film: daVinciCode
        }]
      },{
        name: 'Old Spitalfields Market',
        image: 'https://media.timeout.com/images/105172424/630/472/image.jpg',
        coordinates: {
          lat: '-0.075336',
          long: '51.518581'
        },
        films: [daVinciCode, lawrenceOfArabia],
        areaOfLondon: 'East London',
        streetAddress: '77-82 Whitechapel High St, Shadwell, London',
        postCode: 'E1 7QX',
        sceneNotes: [{
          text: 'This is some text which describes the what happened in the film',
          film: lawrenceOfArabia
        }]
      }])
    })
    .then(() => mongoose.connection.close())
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
    })
})
