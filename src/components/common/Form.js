import React from 'react'
import Select from 'react-select'

const Form = ({handleChange, handleSubmit}) => {
  return(
    <div className="column">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input"
              name="name"
              type="text"
              placeholder="e.g. Relay Building"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input className="input"
              name="image"
              type="text"
              placeholder="e.g. www.hondo-enterprises.com/the-relay-building-entrance-all.jpg"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Film name</label>
          <div className="control">
            <Select options={
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Area of London</label>
          <div className="control">
            <input className="input"
              name="areaOfLondon"
              type="text"
              placeholder="e.g. East London"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Address</label>
          <div className="control">
            <input className="input"
              name="streetAddress"
              type="text"
              placeholder="114 Whitechapel High St"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input className="input"
              name="postCode"
              type="text"
              placeholder="E1 7PT"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Latitude</label>
          <div className="control">
            <input className="input"
              name="lat"
              type="text"
              placeholder="Lat"
              data-coordinates="coordinates"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Longitude</label>
          <div className="control">
            <input className="input"
              name="long"
              type="text"
              placeholder="Long"
              data-coordinates="coordinates"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Scene Notes</label>
          <div className="control">
            <input className="input"
              name="text"
              type="text"
              placeholder="text"
              data-scene-notes="text"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button is-info">Submit</button>
      </form>
    </div>
  )
}

export default Form



//   <input className="input"
//     name="title"
//     type="text"
//     placeholder="e.g. Relay Building"
//     data-film="film"
//     onChange={handleChange}
//   />
