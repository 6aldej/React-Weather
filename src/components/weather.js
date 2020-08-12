import React from "react";
import alert from '../img/alert.svg';
import loc from '../img/loc.svg';
import temp from '../img/temp.svg';
import pres from '../img/pres.svg';
import sunr from '../img/sunr.svg';
import suns from '../img/suns.svg';
import info from '../img/info.svg';

const Weather = props => (
    <div className="infoWeath">
        { props.city &&
            <div>
                <p><img src={loc} id="ico" alt="ico"/> Местоположение: {props.city}, {props.country}</p>
                <p><img src={info} id="ico" alt="ico"/> На улице: {props.description}</p>
                <p><img src={temp} id="ico" alt="ico"/> Температура: {props.temp} °С</p>
                <p><img src={pres} id="ico" alt="ico"/> Давление: {props.pressure} мм рт.ст.</p>
                <p><img src={sunr} id="ico" alt="ico"/> Восход солнца: {props.sunrise}</p>
                <p><img src={suns} id="ico" alt="ico"/> Заход солнца: {props.sunset}</p>
            </div>
        }
        { props.error &&
        <p className="error"><img src={alert} id="ico" alt="ico"/>{props.error}</p>
        }
    </div>
);

export default Weather;