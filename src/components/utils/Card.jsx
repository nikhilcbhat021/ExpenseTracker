// import React from 'react'
import cardStyles from "./Card.module.css";
import Button from "./Button";
import { GenIcon, IconContext } from "react-icons";
import { AiFillBook } from "react-icons/ai";

const Card = ({
    title = "Expenses",
    number = 500,
    btnTitle = "Add Expenses",
    btnClickHandler = () => {
        console.log("card btn clicked");
    },
}) => {
    return (
        <div className={`${cardStyles.card}`}>
            <div className={cardStyles.title}>
                {title}: <span>₹{number}</span>
            </div>
            <IconContext.Provider value={{ className: "imageGlobalValue" }}>
                <div className={cardStyles.modal}>
                    <Button
                        title={btnTitle}
                        btnClass="incomeBtn"
                        icon={<AiFillBook />}
                        onClick={btnClickHandler}
                    ></Button>
                </div>
            </IconContext.Provider>
        </div>
    );
};

export default Card;
