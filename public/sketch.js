let latitude, longitude, air, weather;

if ("geolocation" in navigator) {
  console.log("geolocation available!");
  navigator.geolocation.getCurrentPosition(async (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.querySelector("#latitude").textContent = latitude;
    document.querySelector("#longitude").textContent = longitude;

    try{
      const weather_url = `/weather/${latitude},${longitude}`;
    
    const response = await fetch(weather_url);
    const json = await response.json();
    console.log(json);

    air = json.air_quality.results[0].measurements[0];
    weather = json.weather;

    document.querySelector('#summary').textContent = weather.description;
    document.querySelector('#temperature').textContent = weather.currentConditions.temp;
    document.querySelector('#aq_parameter').textContent = air.parameter;
    document.querySelector('#aq_value').textContent = air.value;
    document.querySelector('#aq_unit').textContent = air.unit;
    document.querySelector('#aq_date').textContent = air.lastUpdated;

    } catch(error){
       console.log('Error occured');
    }
    //const weather_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=V7FXW5ZAY9G9VTBHNT6JR5F9V`;
    
    const data = { latitude, longitude, air, weather };
    console.log(data);
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
    
  });
} else {
  console.log("geolocation not available!");
}