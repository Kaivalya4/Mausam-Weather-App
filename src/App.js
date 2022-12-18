import { useEffect, useState } from "react";
import "./App.css";
import Column1 from "./Components/Column1";
import Column2 from "./Components/Column2";
import Col1_data from "./Context/Col1_data";
import Setcity from "./Context/Setcity";
import Col2Forecast from "./Context/Col2Forecast";

function App() {
    const [currentTemp, setcurrentTemp] = useState([]);
    const [forecastTemp, setforecastTemp] = useState([]);
    const [details, setdetails] = useState([]);
    const [city, setcity] = useState(["Deoghar", "Jharkhand", "IN"]);
    const [celcius, changecelcius] = useState(true);

    useEffect(() => {
        fetch(
            `https://api-proxy-server.onrender.com/weather/fore/${city[0]}/${city[1]}/${city[2]}`
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                let temporaryCurr = [];
                temporaryCurr.push(res.list[0].main.temp);
                temporaryCurr.push(res.list[0].weather[0].main);
                temporaryCurr.push(res.list[0].dt_txt.slice(0, 10));
                // console.log(temporaryCurr);

                let temporaryFore = [];
                temporaryFore.push(temporaryCurr);

                let ctr = 0;

                for (let itr of res.list) {
                    if (ctr == 0) {
                        ctr++;
                        continue;
                    } else if (
                        itr.dt_txt.slice(0, 10) === temporaryFore[ctr - 1][4]
                    ) {
                        continue;
                    } else {
                        let topush = [];
                        topush.push(itr.main.temp);
                        topush.push(itr.main.temp_min);
                        topush.push(itr.main.temp_max);
                        topush.push(itr.weather[0].main);
                        topush.push(itr.dt_txt.slice(0, 10));
                        temporaryFore.push(topush);
                        ctr++;
                    }
                }

                temporaryFore = temporaryFore.slice(2);
                setcurrentTemp(temporaryCurr);
                setforecastTemp(temporaryFore);

                let tempdetail = [];
                tempdetail.push([
                    "Wind Status",
                    res.list[0].wind.speed,
                    "mps",
                    res.list[0].wind.deg,
                ]);
                tempdetail.push(["Humidity", res.list[0].main.humidity, "%"]);
                tempdetail.push([
                    "Visibility",
                    res.list[0].visibility,
                    "metres",
                ]);
                tempdetail.push([
                    "Air Pressure",
                    res.list[0].main.pressure,
                    "mb",
                ]);

                setdetails(tempdetail);
            });
    }, [city]);

    return (
        <div className="container-fluid">
            <div className="row row1">
                <Setcity.Provider value={{ value1: [city, setcity] }}>
                    <Col1_data.Provider value={currentTemp}>
                        <Column1 />
                    </Col1_data.Provider>
                    <Col2Forecast.Provider value={details}>
                        <Column2
                            forecastTemp={forecastTemp}
                            details={details}
                            changeunit={changecelcius}
                            currentunit={celcius}
                        />
                    </Col2Forecast.Provider>
                </Setcity.Provider>
            </div>
        </div>
    );
}

export default App;
