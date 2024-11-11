// import React from 'react'
import { IconContext } from "react-icons";

// static imports
import txnStyles from "./Transaction.module.css";
import Button from "../utils/Button";
import { categoryIcons } from '../../App';

// close
import { RxCrossCircled } from "react-icons/rx";
import { AiOutlineCloseCircle } from "react-icons/ai";

// pencil
import { CiEdit } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";

// default icon
import { IoMdRestaurant } from "react-icons/io";
import { useMemo, useEffect } from "react";
const Transaction = ({txn, onDeleteHandler, onEditHandler}) => {

    // const { Category, Title, Date, Price, onDeleteHandler, onEditHandler, id } = txn;
    const { Category, Title, Date, Price, id } = txn;

    const formattedDate = useMemo(() => {
        console.log(Date);
        return Date.toDateString()
        .split(' ').splice(1).join(',')
        .replace(',', ' ').replace(',', ', ');
    }, [Date])

    useEffect(() => {
      console.log("Transaction");
      console.log(txn);
    }, [])
    
    return (
        <IconContext.Provider value={{ className: "imageGlobalValue" }}>
            <div className={`${txnStyles.container} ${txnStyles.txnText}`}>
                <div className="child">
                    <div
                        style={{ backgroundColor: "#D9D9D9" }}
                        className={`${txnStyles.categoryIcon}`}
                    >
                        <IconContext.Provider value={{ className: "imageGlobalValue" }}>
                            {/* <FiEdit2 /> */}
                            {categoryIcons[`${Category}`]}
                        </IconContext.Provider>
                    </div>
                    <div>
                        <div style={{marginBottom: "8px", color: '#000000'}}>{Title}</div>
                        <div style={{color: '#9B9B9B'}}>{formattedDate}</div>
                    </div>
                </div>
                <div className="child">
                    <div className={`${txnStyles.txnAmount}`}>₹{Price}</div>
                    <Button
                        btnClass="bg-#FF3E3E"
                        icon={
                            <IconContext.Provider value={{ className: "imageGlobalValue" }}>
                                <RxCrossCircled />
                            </IconContext.Provider>
                        }
                        onClick={() => onDeleteHandler(id)}
                    />
                    <Button
                        btnClass="bg-#F4BB4A"
                        icon={
                            <IconContext.Provider value={{ className: "imageGlobalValue" }}>
                                <FiEdit2 />
                            </IconContext.Provider>
                        }
                        onClick={() => onEditHandler(id)}
                    />
                    {/* <button className={`${txnStyles.txnUpdateIcon} ${txnStyles.yellow}`}>
                        <FiEdit2 />
                    </button> */}
                </div>
            </div>
        </IconContext.Provider>
    );
};

export default Transaction;
