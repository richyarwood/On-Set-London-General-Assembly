// This is the base template
// Components are referenced within this.
// It is a classical component as we need a constructor
// Renders the map and includes the sidebar, add location button, register/login

import React from 'react'

import ReactMapboxGl, { Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_TOKEN
})

class Home extends React.Component{

  constructor(){
    super()

    this.state = {
      data: [
        {
          id: '1',
          name: 'Relay Building',
          image: 'http://www.orms.co.uk/wp-content/uploads/2016/05/Orms_Acry_Relay_Aldgate.jpg',
          areaOfLondon: 'City of London',
          streetAddress: '30 Hexham Road',
          postCode: 'SE27 9ED',
          coordinates: {
            lat: '-0.0721662',
            long: '51.515259'
          },
          films: [ // this is a separate model
            {
              id: '1',
              title: 'Da Vinci Code',
              sceneNotes: {
                locationId: '1',
                note: 'This is some text which describes the what happened in the film'
              }
            },
            {
              id: '2',
              title: 'Lawrence of Arabia',
              sceneNotes: {
                locationId: '2',
                note: 'This is some text which describes the what happened in the film'
              }
            }
          ]
        },{
          id: '2',
          name: 'Whitechapel Gallery',
          image: 'https://www.whitechapelgallery.org/wp-content/uploads/2015/01/Whitechapel-Gallery-Photo-Guy-Montagu-Pollock-at-Arcaid-Courtesy-Whitechapel-Gallery-2.jpg',
          coordinates: {
            lat: -0.072650,
            long: 51.513828
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        },{
          id: '3',
          name: 'Old Spitalfields Market',
          image: 'https://media.timeout.com/images/105172424/630/472/image.jpg',
          coordinates: {
            lat: -0.075336,
            long: 51.518581
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        },{
          id: '4',
          name: 'Whitechapel Station',
          image: 'http://cdn.ltstatic.com/2016/May/UI999599_942long.jpg',
          coordinates: {
            lat: '-0.060774',
            long: '51.520406'
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        },{
          id: '5',
          name: 'St Pauls Cathedral',
          image: 'https://d1wgio6yfhqlw1.cloudfront.net/sysimages/product/resized6/Interior_of_St_Pauls_Cathedral_2669_28622.jpg',
          coordinates: {
            lat: '-0.098360',
            long: '51.514359'
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        },{
          id: '6',
          name: 'Lambs Conduit Street',
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/9e/88/e4/lambs-conduit-street.jpg',
          coordinates: {
            lat: '-0.119054',
            long: '51.522867'
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        },{
          id: '7',
          name: 'Highgate Cemetery',
          image: 'https://secretldn.com/wp-content/uploads/2018/04/Highgate-Cemetery-Photo.jpg',
          coordinates: {
            lat: '-0.154380',
            long: '51.575196'
          },
          films: [
            {
              id: '1',
              title: 'Da Vinci Code'
            },
            {
              id: '2',
              title: 'Lawrence of Arabia'
            }
          ]
        }
      ],
      center: {
        lat: -0.070839,
        long: 51.515619
      }
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    const data = e.target.id.split(',')
    this.setState( { center: { lat: data[0], long: data[1] } } )
  }

  render() {
    console.log(this.state.data)
    return (
      <main>
        <div className="sidebar">
          {this.state.data.map(location =>
            <div key={location.id}>
              <div className="title is-6">{location.name}</div>
              <div className="location-image"
                id={[location.coordinates.lat, location.coordinates.long]}
                style={{ backgroundImage: `url(${location.image})` }} onClick={this.handleClick}>
              </div>
              {location.films.map(film =>
                <div key={film.id} className="film-title">{film.title}</div>)}
              <hr />
            </div>
          )}
        </div>
        <Map
          style='mapbox://styles/mapbox/streets-v9'
          center = {[ this.state.center.lat, this.state.center.long ]}
          zoom = {[14]}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>

          {this.state.data.map(marker =>
            <Marker key={marker.id}
              coordinates={[marker.coordinates.lat, marker.coordinates.long]}
              anchor="bottom">
              <img src='https://i.pinimg.com/originals/30/98/49/309849c5815761081926477e5e872f1e.png' width='30px'/>
            </Marker>
          )}

        </Map>
      </main>

    )
  }
}

export default Home
