const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const ranCityDirty = require('C:/Users/brm75/OneDrive/Desktop/or1/stations.json');

module.exports = {
    category: 's',
    data: new SlashCommandBuilder()
        .setName('weatherworldwide')
        .setDescription('Provides the weather for a random city, amazing!!!!!'),
    async execute(interaction) {
        try {
            const ranCity = ranCityDirty[Math.floor(Math.random() * ranCityDirty.length)];
            console.log(ranCity);

            const apiKey = '99d22c263009b3a45af1d7a4a5310465'; // API Key to access OWM API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ranCity}&APPID=${apiKey}`); /* ranCity is a random city chosen from over 70 thounsand cities(!) in stations.json,
            spaces in every city in stations.json are replaced by "%20" to be properly encoded to a url */
            const data = await response.json(); // response data returned by the API, try manually loading the url replacing the variables above and paste it into your search bar to see it for yourself!

            const tempKelvin = data.main.temp; // OWM returns temperatures in Kelvin...
            const tempFahrenheit = Math.round((tempKelvin - 273.15) * 1.8 + 32); // ...so we have to convert it to Fahrenheit
            const tempCelsius = Math.round((tempFahrenheit - 32) * 5/9 ) // hi craz!!1

            const feelsLikeKelvin = data.main.feels_like;
            const feelsLikeFahrenheit = Math.round((feelsLikeKelvin - 273.15) * 1.8 + 32);
            const feelslikeCelsius = Math.round((feelsLikeFahrenheit - 32) * 5/9 )

            const weatherDescription = data.weather[0].main;
            const weatherCondition = weatherDescription === 'Clouds' ? 'Cloudy' :
                                     weatherDescription === 'Rain' ? 'Rainy' : weatherDescription; // Dude. The sentince doesn't make any sence. Have u learned grammer like I said before?

            const temperatureFeel = tempFahrenheit > 105 ? 'and extremely hot' :
                                    tempFahrenheit >= 95 ? 'and sweltering' :
                                    tempFahrenheit >= 85 ? 'and hot' :
                                    tempFahrenheit >= 75 ? 'and warm' :
                                    tempFahrenheit >= 66 ? 'and balmy' :
                                    tempFahrenheit >= 55 ? 'and cool' :
                                    tempFahrenheit >= 46 ? 'and cold' :
                                    tempFahrenheit >= 33 ? 'yet very cold' :
                                    tempFahrenheit >= 15 ? 'and freezing' : 'yet extremely cold';

            const humidity = data.main.humidity;
            const dewPointFahrenheit = Math.round(tempFahrenheit - ((100 - humidity) / 5)); // not using that nws overcomplicated ass formula
            console.log(dewPointFahrenheit)
            const dewPointFeel = dewPointFahrenheit > 75 ? ', miserably humid,' :
                                 dewPointFahrenheit >= 70 ? ', oppressive,' :
                                 dewPointFahrenheit >= 65 ? ', muggy,' : '';

            const cityName = data.name;
            
            const message = tempFahrenheit === feelsLikeFahrenheit ?
                `${weatherCondition} ${temperatureFeel} with a temperature of ${tempFahrenheit}°F (${tempCelsius})°C at ${cityName}.` :
                `${weatherCondition}${dewPointFeel} ${temperatureFeel} with a temperature of ${tempFahrenheit}°F (${tempCelsius}°C) at ${cityName}. Feels like ${feelsLikeFahrenheit}°F (${feelslikeCelsius}°C).`;

            interaction.reply(message);
        } catch (error) {
            console.error(error);
            interaction.reply('FAIL!!!1');
        }
    }
};
