import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY="5f244ecf04e96dfdc6bdaaffaa62eab3";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        pressure: undefined,
        description: undefined,
        error: undefined
    }

    gettingWeaher = async (e) => {
        e.preventDefault();
        const city=e.target.elements.city.value;
        
        if(city) {
            const api_url = await 
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);
            const data = await api_url.json();

            if(data.cod === '404') {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    pressure: undefined,
                    description: undefined,
                    error: "Название города введено неверно. Попробуйте еще раз..."
                });
                return;
            }
        
            let sunset = data.sys.sunset;
            let dateS = new Date(sunset * 1000)
            let timeSunset = dateS.toLocaleTimeString();
            
            let sunrise = data.sys.sunrise;
            let dateR = new Date(sunrise * 1000)
            let timeSunrise = dateR.toLocaleTimeString();
            
            let pressure = data.main.pressure;
            let pressureMmHg = Math.floor(pressure*0.75006);

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                sunrise: timeSunrise,
                sunset: timeSunset,
                pressure: pressureMmHg,
                description: data.weather[0].description,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                sunrise: undefined,
                sunset: undefined,
                pressure: undefined,
                description: undefined,
                error: "Введите название города"
        });
    }
}

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeaher} />
                                <Weather {...this.state}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default App;