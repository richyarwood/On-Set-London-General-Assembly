const secret = process.env.SECRET || 'Zge{T*g._&;(gCaQ2mcn=-mR'
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/on-set-london'
const port = process.env.PORT || 4000
const mapAPI = process.env.MAPBOX_API_TOKEN

module.exports = { secret, dbUri, port, mapAPI }
