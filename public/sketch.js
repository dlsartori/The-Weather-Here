// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather, air, temp, description, pm2_5, lastUpdated
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      // console.log(json);
      temp = json.weather.main.temp.toString();
      description = json.weather.weather[0].description;
      pm2_5 = json.air_quality.list[0].components.pm2_5.toString();
      lastUpdated = Date(json.air_quality.list[0].dt);
      console.log(lastUpdated);
      document.getElementById('summary').textContent = description;
      document.getElementById('temp').textContent = temp;
      // document.getElementById('aq_parameter').textContent = air.parameter;
      document.getElementById('aq_value').textContent = pm2_5;
      // document.getElementById('aq_units').textContent = air.unit;
      document.getElementById('aq_date').textContent = lastUpdated;
    } catch (error) {
      console.error(error);
      air = { value: -1 };
      document.getElementById('aq_value').textContent = 'NO READING';
    }

    const data = { lat, lon,  temp, description, pm2_5, lastUpdated };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const db_response = await fetch('/api', options);
    const db_json = await db_response.json();
    // console.log(db_json);
  });
} else {
  console.log('geolocation not available');
}
