import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

const mapBoxToken = process.env.MAPBOX_API_TOKEN

const Map = ReactMapboxGl({
  accessToken: mapBoxToken
})

const MapShow = ({  data, scrollLocationOnMarkerClick, toggleSidebarClick, activeLocation, popUpShow, markerClick, toggleMarker, getFilms}) => {


  if (!data) return <h1>Loading...</h1>
  return (
    <div className="location">
      <Map
        style='mapbox://styles/mapbox/streets-v10'
        center={data.center}
        zoom={[15]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}>

        {data.locations.map(marker =>
          <Marker key={marker._id}
            coordinates={[marker.coordinates.lng, marker.coordinates.lat]}
            anchor="bottom">
            <img
              src={`/images/${toggleMarker(marker)}.png`}
              onClick={() => popUpShow(marker)}
              className= {toggleMarker(marker)}
            />
          </Marker>
        )}

        {markerClick &&
            <Popup
              coordinates={[
                activeLocation.coordinates.lng,
                activeLocation.coordinates.lat
              ]}
              onClick={() => {
                scrollLocationOnMarkerClick()
                if (data.toggleSidebar) {
                  toggleSidebarClick()
                }
              }}
              className="marker-popup"
              offset={{
                'bottom-left': [20, -38],
                'bottom': [0, -38],
                'bottom-right': [-20, -38]
              }}
            >
              <div className="marker-popup-content">

                <img src={activeLocation.image} alt={activeLocation.name}/>
                <div>
                  <div className="pop-up-title is-size-6">
                    <strong>{activeLocation.name}</strong>
                  </div>
                  <div className="pop-up-films"><strong>Films: </strong>
                    <ul>
                      {getFilms(activeLocation.films).slice(0, 2).map(film =>
                        <li key={film}>{film}</li>
                      )}
                    </ul>
                  </div>
                </div>

              </div>
            </Popup>}

      </Map>
    </div>
  )
}

export default MapShow
