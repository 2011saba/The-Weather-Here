const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

console.log(process.env);

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('listening at 3000');
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const logsDatabase = new Datastore('logsDatabase.db');
logsDatabase.loadDatabase();

app.post('/api', (request, response)=>{
     const data = request.body; console.log(data);
     const timestamp = Date.now();
     data.timestamp = timestamp;
     logsDatabase.insert(data);
     response.json(data);
});

app.get('/api', (request, response) =>{
    logsDatabase.find({}, (err, data)=>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

app.get('/weather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');

    const api_key = process.env.API_KEY;
    const weather_response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latlon[0]},${latlon[1]}?key=${api_key}`);
    const weather_data = await weather_response.json();
    
    const aq_response = await fetch(`https://api.openaq.org/v1/latest?coordinates=${latlon[0]},${latlon[1]}`);
    const aq_data = await aq_response.json();  
    
    const data = {
        weather: weather_data,
        air_quality: aq_data,
    };

    response.json(data);


});
