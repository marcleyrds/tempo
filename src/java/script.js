document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        document.querySelector('#weather').classList.remove('show');
        return showAlert('você precisa digitar uma cidade...');
    }
    const apiKey = `23eefa0b379c2a34eba75e7b9ba52255`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiUrl);
    const json = await results.json();


    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });

    } else {
        document.querySelector('#weather').classList.remove('show');

        showAlert(` 
    não foi possível localizar... 
    
    <img src="src/img/oi.svg"/>
    
    `)
    }
});

function showInfo(json) {
    showAlert('')

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;

    document.querySelector('#temp_description').innerHTML = `${json.description}`;

    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;

    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;

    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
}


function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}