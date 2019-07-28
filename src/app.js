const path = require('path')
const express = require('express');
const fs = require('fs')
const hbs = require('hbs')

const app = express();

//Define Paths for Express config
const dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);
  
//Setup Static directory to serve
app.use(express.static(dir))

app.get('', (req, res) => {
    // data = fs.readFileSync('../public/index.html')
    // console.log(data.toString())
    // // res.send('<h1>heppo</h1>')
    // res.write(data)
    // // res.send(data)
    // res.end()
    // console.log(req.query)
    // console.log("Importing Util")
    // const geocode = require('./utils/geocode')
    // console.log("Import Completed!")
    // let dat;
    // geocode("Delhi", (err, data) => {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log(data)
    //         dat = data;
    //         res.render('index', {
    //             name: "Today's",
    //             title: 'Weather',
    //             creater: dat.location
    //         })
    //     }
    // })
    res.render('index', {
        title: 'Weather',
        creater: "pv"
    })
    console.log("Working Nigga!!") 
});

app.post('', (req, res) => {
    // console.log(req)
    res.send("Responding to a Post Request!")
})


app.get('/hello', (req, res) => {
    console.log("Page Changed.")
    // res.send("<title>Serve JSON</title>")
    res.send([{
        a: "Nigga",
        b: "pv"
    },
    {
        pv: 'kk1',
        key: `efeqfef`
    }
])    
});

// app.get('/help', (req, res) => {
//     // console.log(req.connection)
//     // console.log(req.route.stack[0].handle)
//     console.log("help page")
//     fs.readFile('../public/help.html', (err, data) => {
//         res.write(data)
//         res.end()
//     })
// })  

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Working Again!!",
        Button: 'Working',
        message: 'Partials Working',
        creater: 'pv'
    })
})

app.get('/help/data', (req, res) => {
    res.send({
        working: true,
        data: "JSON"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help page not found",
        name: "Help err 404",
        link: "/help"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        creater: 'pranshu',
    })
})

// app.post('/hello1', (req, res) => {
//     console.log("Working!")
//     console.log(req)
// });

app.get('/weather', (req, res) => {

    if (!req.query.address){
        return res.send({
            err: "Please input an address to search."
        })
    }

    console.log('---------------------')
    //Query string is:
    // console.log(req.query)

    //Import the Utils.
    // console.log("Importing utils")
    const geocode = require('./utils/geocode')
    const forecast = require('./utils/forecast')
    // console.log("Import Completed!")
    
    //Run the geocode function
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err){
            return res.send({ err })
        }
        // console.log(longitude)
        // dat = data;
        // console.log("Calling the forecast now...")
        forecast(latitude, longitude, (err, {currently, daily}) => {
            if (err) {
                return res.send({ err })
            }
            console.log(currently.temperature)
            res.send({
                forecast:daily.data[0].summary,
                location: req.query.address,
                latitude,
                longitude,
                temperature: currently.temperature + '°C'
            })
        })
        
    }) 
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 The page does not exist",
        name: "Error404",
        link: "/"
    })
})


app.listen(1980, () => {
    console.log("Server is up on port 1980.")
})