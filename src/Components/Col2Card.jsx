import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function Col2Card({ details, itr }) {
    return (
        <div className="card1 col-11 col-md-7 col-xl-5">
            <p>{details[itr - 1][0]}</p>
            <div class="card1__main">
                <h1>{details[itr - 1][1]} </h1>&nbsp;
                <span>{details[itr - 1][2]}</span>
            </div>
            {itr < 3 ? (
                itr === 1 ? (
                    <i class="bi bi-telegram"></i>
                ) : (
                    <ProgressBar
                        variant="warning"
                        now={details[itr - 1][1]}
                        className="prog"
                    />
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default Col2Card;
