const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/64b0217e26f004e29478694e3c523736/' + latitude + ',' + longitude + "?units=si"

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', {})
        } else if (body.error) {
            callback('Unable to find location', {})
        } else {
            callback(undefined, body) //.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast