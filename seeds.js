const mongoose = require('mongoose')
const Film = require('./models/Film')
const Location = require('./models/Location')
const { dbUri } = require('./config/environment')

mongoose.connect(dbUri, (err, db) => {

  db.dropDatabase()
    .then(() => {
      return Film.create([
        {
          title: 'The Elephant Man',
          image: 'https://m.media-amazon.com/images/M/MV5BMDVjNjIwOGItNDE3Ny00OThjLWE0NzQtZTU3YjMzZTZjMzhkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        {
          title: 'Lara Croft Tomb Raider',
          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Lara_Croft_film.jpg/220px-Lara_Croft_film.jpg'
        },
        {
          title: 'V for Vendetta',
          image: 'https://static.tvtropes.org/pmwiki/pub/images/2006_v_for_vendetta_poster_004_7457.jpg'
        },
        {
          title: 'Lawrence of Arabia',
          image: 'https://fbwebsitedefaultstorage.blob.core.windows.net/film/6436/uk/lawrence-of-arabia-poster.jpg'
        },
        {
          title: 'Great Expectations',
          image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Great_expectations.jpg/220px-Great_expectations.jpg'
        },
        {
          title: 'The World Is Not Enough',
          image: 'https://www.dvdsreleasedates.com/posters/800/T/The-World-Is-Not-Enough-movie-poster.jpg'
        },
        {
          title: 'Harry Potter and the Philosopher\'s Stone',
          image: 'https://images-na.ssl-images-amazon.com/images/I/514TVV6S1ML._SY445_.jpg'
        },
        {
          title: 'The Black Windmill',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51LuzkNGZvL._SY445_.jpg'
        }
      ])
    })
    .then(films => {

      const [ theElephantMan, laraCroft, vForVendetta, lawrenceOfArabia, greatExpectations, theWorldIsNotEnough, harryPotterPS, blackWindmill ] = films

      return Location.create([{
        name: 'Liverpool Street Station',
        image: 'https://cdn.networkrail.co.uk/wp-content/uploads/2017/04/Liverpool-street-station.jpg',
        coordinates: {
          lat: '51.523350',
          lng: '-0.077440'
        },
        films: [theElephantMan],
        areaOfLondon: 'East London',
        streetAddress: 'Liverpool St, London',
        postCode: 'EC2M 7QH',
        sceneNotes: [{
          text: 'This is where John Merrick (John Hurt) arrives back in London and is chased by an angry mob down in to the toilets. Merrick famously shouts, "I am not an animal. I am being human"',
          film: theElephantMan
        }]
      },{
        name: 'Dominion Theatre',
        image: 'http://www.arthurlloyd.co.uk/DominionTheatre/Bat.jpg',
        coordinates: {
          lat: '51.516924',
          lng: '-0.129577'
        },
        films: [blackWindmill],
        areaOfLondon: 'Central London',
        streetAddress: 'Tottencourt Road, London',
        postCode: 'W1T 7AQ',
        sceneNotes: [{
          text: 'Michael Caine plays on-the-run agent who is trying to track down his missing son. He meets his wife, played by Janet Suzman, outside the Dominion Theatre',
          film: blackWindmill
        }]
      },{
        name: 'The Glass House',
        image: 'https://www.movie-locations.com/movies/h/Harry-Potter-1-Leaky-Cauldron.jpg',
        coordinates: {
          lat: '51.512490',
          lng: '-0.084150'
        },
        films: [harryPotterPS],
        areaOfLondon: 'The City of London',
        streetAddress: '42 Bulls Head Passage',
        postCode: 'EC3V 1LU',
        sceneNotes: [{
          text: 'The doorway of the Leaky Cauldron, which contains the entrance to Daigon Alley.',
          film: harryPotterPS
        }]
      },{
        name: 'Leadenhall Market',
        image: 'https://media.timeout.com/images/72169/630/472/image.jpg',
        coordinates: {
          lat: '51.512840',
          lng: '-0.083720'
        },
        films: [laraCroft],
        areaOfLondon: 'The City of London',
        streetAddress: 'Gracechurch St, London',
        postCode: 'EC3V 1LT',
        sceneNotes: [{
          text: 'Lara Croft zooms through the market on a motorbike',
          film: laraCroft
        }]
      },{
        name: 'SIS Building',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/SIS_building_%2826327425611%29.jpg',
        coordinates: {
          lat: '51.490760',
          lng: '-0.122460'
        },
        films: [theWorldIsNotEnough],
        areaOfLondon: 'East London',
        streetAddress: '85 Albert Embankment, Vauxhall, London',
        postCode: 'SE1 7TW',
        sceneNotes: [{
          text: 'The headquarters of MI6 is revealed in The World is Not Enough and we get to see Judy Dench as M for the first time',
          film: theWorldIsNotEnough
        }]
      },{
        name: 'St Paul\'s Cathedral',
        image: 'https://blog.londonpass.com/wp-content/uploads/2017/03/st-pauls-facts-3.jpg',
        coordinates: {
          lat: '51.513704',
          lng: '-0.098399'
        },
        films: [lawrenceOfArabia, greatExpectations],
        areaOfLondon: 'The City of London',
        streetAddress: 'St. Paul\'s Churchyard, London',
        postCode: 'EC4M 8AD',
        sceneNotes: [
          {
            text: 'The film ends with a memorial service and characters are seen to be giving various opinions of TE Lawrence on the steps of the cathedral',
            film: lawrenceOfArabia
          },{
            text: 'Pip arrives in London and sits on the steps of the Cathedral',
            film: greatExpectations
          }
        ]
      },{
        name: 'The Old Bailey',
        image: 'https://www.barleystudio.co.uk/wp-content/uploads/2018/01/oldbailey1.jpg',
        coordinates: {
          lat: '51.515483',
          lng: '-0.101822'
        },
        films: [vForVendetta],
        areaOfLondon: 'The City of London',
        streetAddress: 'The Old Bailey, London',
        postCode: 'EC4M 7EH',
        sceneNotes: [{
          text: 'The Old Bailey is blown up in the dramatic start of V for Vendetta. Masked terrorist V watches on to the sound of Tchaikovsky\'s 1812 Overture',
          film: vForVendetta
        }]
      }])
    })
    .then(() => mongoose.connection.close())
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
    })
})
