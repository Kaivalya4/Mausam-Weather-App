import DataToImage from "../assets/data/DataToImage";
import Col2Card from "./Col2Card";

function Column2({ forecastTemp, details, changeunit, currentunit }) {
    function handle(val) {
        if (val !== currentunit) {
            changeunit(currentunit);
        }
    }

    return (
        <div className="col-md-9 sec2 g-0">
            <ul className="deg-choose">
                <li
                    onClick={() => {
                        handle(true);
                    }}
                >
                    &#8451;
                </li>
                <li onClick={() => handle(false)}>&#8457;</li>
            </ul>
            <div className="container-fluid container2">
                <div className="row justify-content-evenly">
                    {forecastTemp.map((eachday) => {
                        return (
                            <div className="col-9 col-sm-4 col-xl-2 card">
                                <p className="card__title">{eachday[4]}</p>
                                <img
                                    src={require(`../assets/images/${DataToImage.get(
                                        eachday[3]
                                    )}`)}
                                    alt=""
                                    className="img-fluid card-img"
                                />
                                <div className="card-temp">
                                    <div className="card-temp__child">
                                        <p>{eachday[2]}</p>
                                        &#8451;
                                    </div>
                                    <div className="card-temp__child">
                                        <p>{eachday[1]}</p>
                                        &#8451;
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <h1 className="highlight">Today's Highlights</h1>
                <div className="row2 row justify-content-between">
                    {details.length > 0 ? (
                        <Col2Card details={details} itr={1} />
                    ) : (
                        ""
                    )}
                    {details.length > 0 ? (
                        <Col2Card details={details} itr={2} />
                    ) : (
                        ""
                    )}
                </div>
                <div className="row2 row justify-content-between">
                    {details.length > 0 ? (
                        <Col2Card details={details} itr={3} />
                    ) : (
                        ""
                    )}
                    {details.length > 0 ? (
                        <Col2Card details={details} itr={4} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}

export default Column2;
