import { useContext } from "react";
import Col1_data from "../Context/Col1_data";
import Setcity from "../Context/Setcity";

function Col1_sec2() {
    const arr = useContext(Col1_data);
    const { value1 } = useContext(Setcity);

    const [city, setCity] = value1;

    return (
        <div className="col1-sec2">
            <div>
                <span className="digit1">{arr[0]}</span>
                <span className="digit2">&#8451;</span>
            </div>
            <h2 className="descrip">{arr[1]}</h2>
            <div className="detail">
                <ul>
                    <li>Today</li>
                </ul>
                <ul>
                    <li>{arr[2]}</li>
                </ul>
            </div>
            <span className="location">
                <i className="bi bi-geo-alt-fill"></i>
                <span>{city[0]}</span>
            </span>
        </div>
    );
}

export default Col1_sec2;
