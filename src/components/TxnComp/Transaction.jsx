// import React from 'react'
import { IconContext } from "react-icons";

// static imports
import txnStyles from "./Transaction.module.css";
import editTxn from "../../assets/edit_txn_icon.png";
import delTxn from "../../assets/del_txn_icon.svg";
import Button from "../utils/Button";

// close
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";

// pencil
import { CiEdit } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";

// default icon
import { IoMdRestaurant } from "react-icons/io";
import { IoRestaurantOutline } from "react-icons/io5";
import { useMemo } from "react";

const Transaction = ({
    categoryIcon = <IoRestaurantOutline />,
    title="Samosa",
    date=new Date('12/1/2023'),
    expense=150,
}) => {

    const formattedDate = useMemo(() => {
        return date.toDateString()
        .split(' ').splice(1).join(',')
        .replace(',', ' ').replace(',', ', ');
    }, [date])

    return (
        <IconContext.Provider value={{ className: "imageGlobalValue" }}>
            <div className={`${txnStyles.container} ${txnStyles.txnText}`}>
                <div className="child">
                    <div
                        style={{ backgroundColor: "#D9D9D9" }}
                        className={`${txnStyles.categoryIcon}`}
                    >
                        {categoryIcon}
                    </div>
                    <div>
                        <div style={{marginBottom: "8px"}}>{title}</div>
                        <div style={{color: '#9B9B9B'}}>{formattedDate}</div>
                    </div>
                </div>
                <div className="child">
                    <div className={`${txnStyles.txnAmount}`}>₹{expense}</div>
                    <button className={`${txnStyles.txnUpdateIcon} ${txnStyles.red}`}>
                        <RxCrossCircled />
                    </button>
                    <Button
                        btnClass="bg-#FF3E3E"
                        icon={
                            <IconContext.Provider value={{ className: "imageGlobalValue" }}>
                                <RxCrossCircled />
                            </IconContext.Provider>
                        }
                    ></Button>
                    <Button
                        btnClass="bg-#F4BB4A"
                        icon={<FiEdit2 />}
                    ></Button>
                    {/* <button className={`${txnStyles.txnUpdateIcon} ${txnStyles.yellow}`}>
                        <FiEdit2 />
                    </button> */}
                </div>
            </div>
        </IconContext.Provider>
    );
};

export default Transaction;
