const axios = require('axios')

let testObj = {

    getWeather: async (req, res) => {
        try {
          let {long, lat} = req.query;
          console.log(req.query)
          let weatherInfo = await axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${long}`)
          res.send(weatherInfo.data)
        } catch (error) {
          console.log('Error retrieving weather info', error)
          res.status(500).send(error)
        }
    }

}

module.exports = testObj;