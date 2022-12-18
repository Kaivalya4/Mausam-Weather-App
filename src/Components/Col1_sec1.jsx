import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { useEffect } from "react";
import Setcity from "../Context/Setcity";
import { useContext } from "react";
import Col1_data from "../Context/Col1_data";
import DataToImage from "../assets/data/DataToImage";

function Col1_sec1() {
    const [show, setShow] = useState(false);
    const [searchdata, setsearchdata] = useState();
    const [finalsearch, setfinalsearch] = useState("");
    const [result, setresult] = useState([]);

    const arr = useContext(Col1_data);

    const { value1 } = useContext(Setcity);
    const [city, setcity] = value1;

    const handleClose = () => {
        setresult([]);
        setfinalsearch("");
        setShow(false);
    };

    const handleShow = () => setShow(true);

    function keeptrack(event) {
        setsearchdata(event.target.value);
    }

    function onSearch() {
        setfinalsearch(
            searchdata.charAt(0).toUpperCase() + searchdata.slice(1)
        );
    }

    function getlocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let long = position.coords.longitude;
                    console.log(lat, long);
                    fetch(
                        `https://api-proxy-server.onrender.com/weather/getlocation/${lat}/${long}`
                    )
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            setcity([
                                data.results[0].components.city,
                                data.results[0].components.state,
                                data.results[0].components.country_code.toUpperCase(),
                            ]);
                        })
                        .catch((error) => {
                            alert("Unable to access the location !!!");
                        });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("user denied the request for Geolocation!!!");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("location error!!!");
                            break;
                        case error.TIMEOUT:
                            alert("Request Time out !!!");
                            break;
                        default:
                            alert("Can't able to access the location!!!");
                            break;
                    }
                }
            );
        } else {
            alert("Geolocation is not supported on your device or browser!!!!");
        }
    }

    useEffect(() => {
        if (finalsearch !== "") {
            fetch(
                `https://api-proxy-server.onrender.com/weather/list/${finalsearch}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setresult(data);
                });
        }
    }, [finalsearch]);

    return (
        <div className="col1-sec1">
            <div className="layer">
                <div className="place-parent">
                    <Button className="place" onClick={handleShow}>
                        Search For Places
                    </Button>
                    <i
                        className="bi bi-geo-fill"
                        onClick={() => getlocation()}
                    ></i>
                </div>
                {arr.length == 0 ? (
                    <img
                        src={require(`../assets/images/Clear.png`)}
                        alt=""
                        className="main-img"
                    />
                ) : (
                    <img
                        src={require(`../assets/images/${DataToImage.get(
                            arr[1]
                        )}`)}
                        alt=""
                        className="main-img"
                    />
                )}

                <Offcanvas
                    show={show}
                    onHide={handleClose}
                    className="offcanvas offcanvas-start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="row justify-content-evenly g-3">
                            <div className="col-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search for Places.."
                                    maxLength="40"
                                    onChange={keeptrack}
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                    onClick={onSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="list">
                            {result
                                .map((eachcity) => {
                                    return (
                                        <div
                                            className="list-item"
                                            onClick={() => {
                                                setcity([
                                                    eachcity.name,
                                                    eachcity.state,
                                                    eachcity.country,
                                                ]);
                                                handleClose();
                                            }}
                                        >
                                            {eachcity.name +
                                                " ( " +
                                                eachcity.state +
                                                " ) "}

                                            <i className="bi bi-chevron-right "></i>
                                        </div>
                                    );
                                })
                                .slice(0, 3)}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </div>
    );
}

export default Col1_sec1;
