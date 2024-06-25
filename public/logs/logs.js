const mymap = L.map('checkinMap').setView([0, 0], 1);
//const  mymap = L.map('checkinMap').setView([51.505, -0.09], 13);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for(item of data){
        L.marker([item.latitude, item.longitude]).addTo(mymap);
        /*const root = document.createElement('p');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const airdiv = document.createElement('div');
        const weatherdiv = document.createElement('div');

        geo.textContent = `Latitude: ${item.latitude}°, Longitude: ${item.longitude}°`;
        date.textContent = new Date(item.timestamp).toLocaleString();
        airdiv.textContent = `${item.air.value} ${item.air.unit}`;
        weatherdiv.textContent = item.weather.description;

        root.append(geo, date, airdiv, weatherdiv);
        document.body.append(root);*/
    }
}