import React, { useState, useEffect } from 'react';
import sun_icon from '../../assets/sun_icon.png';
import new_moon from '../../assets/new_moon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Accra');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetchWeatherData(city);
    }, []);

    const fetchWeatherData = (cityName) => {
        setLoading(true);
        setWeatherData(null); // Reset weather data
        setError(null); // Reset error

        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=b7519735a4b0f0da4be3e94776bb5ae0&units=metric`,
            options
        )

            .then((response) => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData(data);
            })
            .catch((err) => {
                setError(err.message);
                if (cityName !== 'Accra') {
                    fetchWeatherData('Accra'); // Fallback to London
                    setCity('Accra');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearch = () => {
        if (city.trim() !== '') {
            fetchWeatherData(city);
        } else {
            setError('Please enter a valid city name');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    

    const getWeatherIcon = () => {
        if (!weatherData || !weatherData.sys) return sun_icon; // Default to sun_icon

        const currentTime = weatherData.dt;
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;

        return currentTime >= sunrise && currentTime < sunset ? sun_icon : new_moon;
    };

    const fetchSuggestions = (query) => {
        if (query.trim() === '') {
            setSuggestions([]);
            return;
        }

        const options = { method: 'GET', headers: { accept: 'application/json' } };

        fetch(
            `https://api.locationiq.com/v1/autocomplete.php?key=YOUR_API_KEY&q=${query}`,
            options
        )
            .then((response) => response.json())
            .then((data) => {
                setSuggestions(data.map((item) => item.display_name));
            })
            .catch(() => setSuggestions([]));
    };

    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     setCity(value);
    //     fetchSuggestions(value);
    // }; 


    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => fetchWeatherData('London')}>Retry Default (London)</button>
            </div>
        );
    }

    const main = weatherData?.main || {};
    const wind = weatherData?.wind || {};
    const name = weatherData?.name || 'London';

    return (
        <div className='place-self-center p-36 rounded-md bg-gradient-to-r from-violet-800 to-fuchsia-800 flex flex-col items-center'>
            {/* City Name Input */}
            <div className='flex items-center gap-4 relative mb-8'>
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Enter city name'
                    className='h-8 border-0 rounded-2xl outline-none pl-4 text-slate-500 text-lg box-border border-solid'
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className='text-slate-200 text-xl cursor-pointer'
                    onClick={handleSearch}
                />
            </div>
            {loading && <div>Loading...</div> }

            {/* Weather Icon */}
            <img src={getWeatherIcon()} alt='weather icon' className='w-36 mt-8 mb-8' />

            {/* Current Temperature */}
            <p className='text-slate-200 text-7xl leading-4 mt-5 mb-6'>
                {main.temp !== undefined ? `${main.temp}°C` : 'No Data'}
            </p>

            {/* City Name */}
            <p className='text-slate-200 text-4xl mt-4'>{name}</p>

            {/* Additional Weather Details */}
            <div className='flex text-slate-200 mt-8 justify-between'>
                <div className='flex items-start gap-5 text-xl'>
                    <img
                        src='https://em-content.zobj.net/source/microsoft-teams/363/cloud-with-rain_1f327-fe0f.png'
                        alt='humidity'
                        className='w-12 mt-4'
                    />
                    <div>
                        <p>{main.humidity !== undefined ? `${main.humidity}%` : 'N/A'}</p>
                        <span className='block text-lg'>Humidity</span>
                    </div>
                </div>

                <div className='flex items-start gap-5 text-xl'>
                    <img
                        src='https://em-content.zobj.net/source/telegram/360/cloud-with-lightning_1f329-fe0f.webp'
                        alt='wind icon'
                        className='w-12 mt-4 ml-10'
                    />
                    <div>
                        <p>{wind.speed !== undefined ? `${wind.speed} Km/h` : 'N/A'}</p>
                        <span className='block text-lg'>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
