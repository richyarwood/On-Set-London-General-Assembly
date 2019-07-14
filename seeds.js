const mongoose = require('mongoose')
const Film = require('./models/Film')
const Location = require('./models/Location')
const User = require('./models/User')
const { dbUri } = require('./config/environment')

mongoose.connect(dbUri, (err, db) => {

  db.dropDatabase()
  return User.create({
    username: 'Mr User',
    email: 'email@email.com',
    password: 'pass',
    passwordConfirmation: 'pass'
  })
    .then(user => {
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
        },
        {
          title: 'The Day the Earth Caught Fire',
          image: 'https://images-na.ssl-images-amazon.com/images/I/516WAP63BBL._SY445_.jpg'
        },
        {
          title: 'Man Who Knew Too Much',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/The_Man_Who_Knew_Too_Much_%281956_film%29.jpg/220px-The_Man_Who_Knew_Too_Much_%281956_film%29.jpg'
        },
        {
          title: 'Four Weddings and a Funeral',
          image: 'http://t2.gstatic.com/images?q=tbn:ANd9GcQ0EyeiJvpPSe9al9KkATC9oumLrTib2-h9LyZOBnO07j2oPTsd'
        },
        {
          title: 'Bridget Jones Diary',
          image: 'https://images-na.ssl-images-amazon.com/images/I/51GAS3VCA2L._SY445_.jpg'
        },
        {
          title: 'East is East',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/23272/p23272_v_v8_aa.jpg'
        },
        {
          title: 'Golden Eye',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/17416/p17416_v_v8_aa.jpg'
        },
        {
          title: 'The Saint',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/19202/p19202_v_v8_ab.jpg'
        }, {
          title: 'Batman Begins',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/35903/p35903_v_v8_bb.jpg'
        }, {
          title: 'About a Boy',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/29150/p29150_v_v8_al.jpg'
        }, {
          title: 'Sliding Doors',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/20474/p20474_v_v8_ab.jpg'
        }, {
          title: 'The Avengers',
          image: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/theavengers_lob_crd_03.jpg'
        }, {
          title: 'Love Actually',
          image: 'http://t1.gstatic.com/images?q=tbn:ANd9GcR-yz1sgpd6sn0JuYHhl6JTUNZT6tpe0Jv8znAb7yn7yrGOD3lK'
        }, {
          title: 'Nineteen Eighty-Four',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/8582/p8582_v_v8_ab.jpg'
        }, {
          title: 'Shaun of the Dead',
          image: 'http://www.movienewsletters.net/photos/043445R1.jpg'
        }, {
          title: 'Clockwork Orange',
          image: 'http://t2.gstatic.com/images?q=tbn:ANd9GcTB-hK0IAfj71C5QASyaTIK-lGBenOwmkG-AjFJNAoRL1t-PO3h'
        }, {
          title: 'Stormbreaker',
          image: 'http://www.gstatic.com/tv/thumb/v22vodart/161382/p161382_v_v8_ab.jpg'
        },
        {
          title: 'American Assassin',
          image: 'https://www.cbsfilms.com/media/cache/62/93/62931f7e83c518aa9d092b3fea7e4dc4.jpg'
        },
        {
          title: 'Brazil',
          image: 'https://media.timeout.com/images/101619403/630/472/image.jpg'
        },
        {
          title: 'The Da Vinci Code',
          image: 'https://vignette.wikia.nocookie.net/davincicode/images/5/57/Da_Vinci_Code_characters_poster.jpg/revision/latest?cb=20150623230955'
        }
      ])
        .then(films => {

          const [ theElephantMan, laraCroft, vForVendetta, lawrenceOfArabia, greatExpectations, theWorldIsNotEnough, harryPotterPS, blackWindmill, earthCaughtFire, manTooMuch, fourWeddings, bDiary, eastEast, goldenEye, theSaint, batmanBegins, aboutABoy, slidingDoors, theAvengers, loveActually, nineteen84, shaunOTDead, clockworkOrange, stormBreaker, americanAssassin, brazil, theDaVinciCode ] = films

          return Location.create([{
            name: 'Drapers Hall',
            image: 'https://live.staticflickr.com/5526/9985638493_8d2bb544f2_b.jpg',
            coordinates: {
              lat: '51.515091',
              lng: '-0.086330'
            },
            films: [goldenEye],
            areaOfLondon: 'The City of London',
            streetAddress: 'Throgmorton Ave',
            postCode: 'EC2N 2DQ',
            sceneNotes: [
              {
                createdBy: user,
                text: 'The interior was St Petersburg council where Ourumov learns that Natalya has survived the Golden Eye detonation',
                film: goldenEye
              },
              {
                createdBy: user,
                text: 'HQ for the Moscow based Tretiak Oil and Gas Industries.',
                film: theSaint
              }
            ]
          },{
            name: 'Royal Exchange Buildings',
            image: 'https://www.movie-locations.com/movies/b/Bridget-Joness-Diary-Cornhill.jpg',
            coordinates: {
              lat: '51.513411',
              lng: '-0.087469'
            },
            films: [bDiary, eastEast],
            areaOfLondon: 'The City of London',
            streetAddress: 'Cornhill',
            postCode: 'EC3V 3LR',
            sceneNotes: [
              {
                createdBy: user,
                text: 'In the quaint buildings on the southwest corner, Mark Darcy (Colin Firth) buys a new diary and Bridget Jones finally gets her clinch in the snow.',
                film: bDiary
              },
              {
                createdBy: user,
                text: 'The shops are converted in to Nazir\'s boutique hat shop, "Le Beau Chapeau"',
                film: eastEast
              }
            ]
          },{
            name: 'Highbury Terrace',
            image: 'https://www.movie-locations.com/movies/f/Four-Weddings-And-A-Funeral-Highbury-Terrace.jpg',
            coordinates: {
              lat: '51.551492',
              lng: '-0.102187'
            },
            films: [fourWeddings],
            areaOfLondon: 'Northeast London',
            streetAddress: '22 Highbury Terrace',
            postCode: 'N5 1UP',
            sceneNotes: [{
              createdBy: user,
              text: 'Hugh Grant and Andie McDowell finally get together in the famous rain scene at the end of the film.',
              film: fourWeddings
            }]
          },{
            name: 'London Hilton',
            image: 'http://modernarchitecturelondon.com/photos/hilton-parklane-1.jpg',
            coordinates: {
              lat: '51.505611',
              lng: '-0.150720'
            },
            films: [manTooMuch],
            areaOfLondon: 'Central London',
            streetAddress: '22 Park Ln, Mayfair',
            postCode: 'W1K 1BE',
            sceneNotes: [{
              createdBy: user,
              text: 'Doris Day hosts a party in Hitchcock\'s remake of his own 1934 film.',
              film: manTooMuch
            }]
          },{
            name: 'Daily Express Building',
            image: 'https://i.dailymail.co.uk/1s/2018/08/23/13/wire-4046154-1535025840-355_634x422.jpg',
            coordinates: {
              lat: '51.514351',
              lng: '-0.105452'
            },
            films: [earthCaughtFire],
            areaOfLondon: 'Central London',
            streetAddress: '120 Fleet St',
            postCode: 'EC4A 2BE',
            sceneNotes: [{
              createdBy: user,
              text: 'Val Guest\'s semi-documentary about impending world apocalypse was filmed in this building',
              film: earthCaughtFire
            }]
          },{
            name: 'Liverpool Street Station',
            image: 'https://assets.londonist.com/uploads/2016/12/i875/liverpoolstreetstatoin.png',
            coordinates: {
              lat: '51.517855',
              lng: '-0.081744'
            },
            films: [theElephantMan],
            areaOfLondon: 'East London',
            streetAddress: 'Liverpool St',
            postCode: 'EC2M 7QH',
            sceneNotes: [{
              createdBy: user,
              text: 'This is where John Merrick (John Hurt) arrives back in London and is chased by an angry mob down in to the toilets. Merrick famously shouts, "I am not an animal. I am being human"',
              film: theElephantMan
            }]
          },{
            name: 'Dominion Theatre',
            image: 'https://www.westendtheatre.com/wp-content/uploads/2017/08/dominion-theatre-2017-001.jpg',
            coordinates: {
              lat: '51.516924',
              lng: '-0.129577'
            },
            films: [blackWindmill],
            areaOfLondon: 'Central London',
            streetAddress: 'Tottencourt Road',
            postCode: 'W1T 7AQ',
            sceneNotes: [{
              createdBy: user,
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
              createdBy: user,
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
            streetAddress: 'Gracechurch St',
            postCode: 'EC3V 1LT',
            sceneNotes: [{
              createdBy: user,
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
            streetAddress: '85 Albert Embankment, Vauxhall',
            postCode: 'SE1 7TW',
            sceneNotes: [{
              createdBy: user,
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
            streetAddress: 'St. Paul\'s Churchyard',
            postCode: 'EC4M 8AD',
            sceneNotes: [
              {
                createdBy: user,
                text: 'The film ends with a memorial service and characters are seen to be giving various opinions of TE Lawrence on the steps of the cathedral',
                film: lawrenceOfArabia
              },{
                createdBy: user,
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
            streetAddress: 'The Old Bailey',
            postCode: 'EC4M 7EH',
            sceneNotes: [{
              createdBy: user,
              text: 'The Old Bailey is blown up in the dramatic start of V for Vendetta. Masked terrorist V watches on to the sound of Tchaikovsky\'s 1812 Overture',
              film: vForVendetta
            }]
          }, {
            name: 'St Pancras International',
            image: 'https://cdn.theculturetrip.com/wp-content/uploads/2018/01/st-pancras-station.jpg',
            coordinates: {
              lat: '51.531421',
              lng: '-0.126090'
            },
            films: [batmanBegins],
            areaOfLondon: 'North Central London',
            streetAddress: 'Euston Rd, Kings Cross',
            postCode: 'N1C 4QP',
            sceneNotes: [{
              createdBy: user,
              text: 'The elaborate Gothic stairwell because the staircase of "Arkham Asylum", invaded by a SWAT team and a flock of CGI bats. You might recognise the same location from the first Spice Girls video, Wannabe',
              film: batmanBegins
            }]
          }, {
            name: 'Kings Cross Station',
            image: 'https://www.kingscross.co.uk/media/P_KXC_TPA_KXS_N761_kxweb-600x409.jpg',
            coordinates: {
              lat: '51.531685',
              lng: '-0.124446'
            },
            films: [harryPotterPS],
            areaOfLondon: 'North Central London',
            streetAddress: 'Euston Rd, Kings Cross',
            postCode: 'N1 9AL',
            sceneNotes: [{
              createdBy: user,
              text: 'The arched wall between platforms 4 and 5 was used as the magical entrance to "Platform 9 3/4", from which young Harry catches the Hogwarts Express',
              film: harryPotterPS
            }]
          }, {
            name: 'Oseney Crescent',
            image: 'https://www.movie-locations.com/movies/a/About-A-Boy_Oseney-Crescent.jpg',
            coordinates: {
              lat: '51.548032',
              lng: '-0.133737'
            },
            films: [aboutABoy],
            areaOfLondon: 'Northwest London',
            streetAddress: '31 Oseney Crescent, Kentish Town',
            postCode: 'NW5 2AT',
            sceneNotes: [{
              createdBy: user,
              text: 'Continuing on Caversham Road takes you into Oseney Crescent. Terminally depressed thrift-shop hippy Fiona and her son Marcus live in number 31, in About a Boy',
              film: aboutABoy
            }]
          }, {
            name: 'Primrose Gardens',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKXzkQSgQ4ogYDXoITu5uTiPTPGFKi4cG6PBtd1ndRTJvpZqw1Q',
            coordinates: {
              lat: '51.547164',
              lng: '-0.163306'
            },
            films: [slidingDoors],
            areaOfLondon: 'Northwest London',
            streetAddress: '25 Primrose Gardens',
            postCode: 'NW5 4TN',
            sceneNotes: [{
              createdBy: user,
              text: 'This is the house of Helen\'s friend Anna, where Helen stays after catching her boyfriend cheating on her',
              film: slidingDoors
            }]
          }, {
            name: 'Kingsway Tram Tunnel',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kingsway_tramway_subway_%286266160469%29.jpg/600px-Kingsway_tramway_subway_%286266160469%29.jpg',
            coordinates: {
              lat: '51.518392',
              lng: '-0.120738'
            },
            films: [theAvengers],
            areaOfLondon: 'West London',
            streetAddress: '16-36 Southampton Row, Holborn',
            postCode: 'WC1B 4AP',
            sceneNotes: [{
              createdBy: user,
              text: 'In the film the tunnel runs beneath the Thames to Greenwich. In reality, it emerges uner the arch of Waterloo Bridge, but has lain unused since the last tram ran in 1952',
              film: theAvengers
            }]
          }, {
            name: 'St Lukes Mews',
            image: 'https://s23514.pcdn.co/wp-content/uploads/2017/10/st_lukes_mews_notting_hill.jpg',
            coordinates: {
              lat: '51.517757',
              lng: '-0.203167'
            },
            films: [loveActually],
            areaOfLondon: 'West London',
            streetAddress: '27 St Lukes Mews Notting Hill',
            postCode: 'W11 1DF',
            sceneNotes: [{
              createdBy: user,
              text: 'This is the home of newlyweds Peter and Juliet, where sadly lovestruck Mark silently declares his love with cue cards. The original script called for him to carpet the mews with rose petals',
              film: loveActually
            }]
          }, {
            name: 'Alexandra Palace',
            image: 'https://cdn.londonandpartners.com/asset/alexandra-palace_ariel-view-of-alexandra-palace-image-courtesy-of-alexandra-palace_5da39c3871881d72c9c4be25267c13ba.jpg',
            coordinates: {
              lat: '51.594168',
              lng: '-0.130751'
            },
            films: [nineteen84],
            areaOfLondon: 'North London',
            streetAddress: 'Alexandra Palace Way, Muswell Hill',
            postCode: 'N22 7AY',
            sceneNotes: [{
              createdBy: user,
              text: 'While still a gutted ruin, the Palace\'s central Concert Hall became "Victory Square"',
              film: nineteen84
            }]
          }, {
            name: 'The Duke of Albany',
            image: 'https://www.movie-locations.com/movies/s/Shaun-Of-The-Dead-Monson-Road.jpg',
            coordinates: {
              lat: '51.478016',
              lng: '-0.047708'
            },
            films: [shaunOTDead],
            areaOfLondon: 'Southeast London',
            streetAddress: '39 Monson Rd, New Cross',
            postCode: 'SE14 5EQ',
            sceneNotes: [{
              createdBy: user,
              text: 'In the film, the pub is renamed "The Winchester Arms" and is Shaun\'s beloved local. This site has since been redeveloped and turned into flats',
              film: shaunOTDead
            }]
          }, {
            name: 'Trinity Road',
            image: 'https://s0.geograph.org.uk/geophotos/02/40/94/2409495_2555c695.jpg',
            coordinates: {
              lat: '51.462371',
              lng: '-0.185475'
            },
            films: [clockworkOrange],
            areaOfLondon: 'South Central London',
            streetAddress: 'Trinity Road, Wandsworth',
            postCode: 'SW18 1JT',
            sceneNotes: [{
              createdBy: user,
              text: 'The southern underpass beneath a huge circular advertising installation is where Alex and the "droogs" attack the Irish tramp at the begining of the film',
              film: clockworkOrange
            }]
          }, {
            name: 'Science Museum',
            image: 'https://cdn.londonandpartners.com/asset/8ee0b8e262ad8ef44167aab3b2e40563.jpg',
            coordinates: {
              lat: '51.497807',
              lng: '-0.174526'
            },
            films: [stormBreaker],
            areaOfLondon: 'Southwest London',
            streetAddress: 'Exhibition Rd, South Kensington',
            postCode: 'SW7 2DD',
            sceneNotes: [{
              createdBy: user,
              text: 'In the Museum\'s "Making the Modern World" gallery, Alex Rider thwarts the attempt by Darrius Sayles to get the Brisih PM to launch the virus-laden computer network',
              film: stormBreaker
            }]
          },
          {
            name: 'St George’s Walk',
            image: 'https://i2-prod.croydonadvertiser.co.uk/news/croydon-news/article492870.ece/ALTERNATES/s615b/American-Assassin-4JPG.jpg',
            coordinates: {
              lat: '51.3725237',
              lng: '-0.0985434'
            },
            films: [americanAssassin],
            areaOfLondon: 'South London',
            streetAddress: 'St George\'s Walk, Croydon',
            postCode: 'CR0 1YB',
            sceneNotes: [{

              text: 'St George’s Walk was dressed as an area of Istanbul. Dylan O’Brien walks through the bustle into a Turkish restaurant on the corner. Then the scene unfolds into an elaborate chase, with special operatives hoofing after him',
              film: americanAssassin
            }]
          },
          {
            name: 'Croydon B Power Station',
            image: 'https://lh5.googleusercontent.com/p/AF1QipO3Ra2Z7ZpoJKPUYjmQJG6SyA-g4uy61mNHBNmR=w424-h240-k-no',
            coordinates: {
              lat: '51.379884',
              lng: '-0.123879'
            },
            films: [brazil],
            areaOfLondon: 'South London',
            streetAddress: 'Valley Retail Park, Purley Way, Croydon',
            postCode: 'CR0 4UZ',
            sceneNotes: [{

              text: 'The power station was decommissioned in 1984, and it was used in a disused state in Terry Gilliam\'s 1985 film Brazil. The station was demolished in 1991 and an IKEA store was opened on the site. Two large chimneys were retained and remain a local landmark.',
              film: brazil
            }]
          },
          {
            name: 'Fairfield Halls Concert Hall',
            image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Fairfield_Halls_-_London.jpg',
            coordinates: {
              lat: '51.374010',
              lng: '-0.096840'
            },
            films: [theDaVinciCode],
            areaOfLondon: 'South London',
            streetAddress: 'Park Ln, London',
            postCode: 'CR9 1DG',
            sceneNotes: [{

              text: 'Robert Langdon (played by Tom Hanks) gives a lecture in our beloved Fairfield Halls Concert Hall.',
              film: theDaVinciCode
            }]
          }
          ])
        })

        .then(() => mongoose.connection.close())
        .catch(err => {
          console.log(err)
          mongoose.connection.close()
        })
    })
})
