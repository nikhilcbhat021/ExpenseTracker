import { useState, useEffect, useCallback } from "react";

import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";

import { IconContext } from "react-icons";
import ReactModal from "react-modal";
import { v1, v3, v4, v5, v6, v7, stringify } from "uuid";
// import {  } from 'uuid';
//styles
import "./App.css";

//components
import Transaction from "./components/TxnComp/Transaction";
import Card from "./components/utils/Card";
import Pagination from "./components/utils/Pagination";
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import TxnList from "./components/TxnList/TxnList";
import TrendingTxns from "./components/Visuals/TrendingTxns";
import PieChart from "./components/Visuals/PieChart";

function App() {
    const [transactions, setTransactions] = useState([]);

    const __delete__ = useCallback((id) => {
        console.log(id);
    
        setTransactions((txns) => {
            const index = txns.findIndex((val)=>{
                console.log(val, id)
                return val.id === id;
            })
            console.log(index);
            return [...txns.slice(0, index), ...txns.slice(index + 1, txns.length)];
        });
    });

    const __editTxn__ = useCallback((txn) => {
        console.log("Inside Edit Transaction callback");
        // Open the modal here.
    });
    
    // Mocking Data -- START
    const singleTxn = {
        Category: 'restaurant',
        Title: "Samosa",
        Date: new Date("12/1/2023"),
        Price: 150,
    };

    const txns = [...Array(13)].map((_, i) => {return {...singleTxn, id: crypto.randomUUID()}});
    // const txns = [...Array(13)].fill((<Transaction key={i} txn={{...singleTxn, id:i}} txns={transactions}></Transaction>),0,13)
    // Mocking Data -- END

    useEffect(() => {
        setTransactions(txns);
        ReactModal.setAppElement("#root");
        // const txns = JSON.parse(localStorage.getItem("allTransactions"), transactionsReviver)
    }, []);

    useEffect(() => {
        console.log(transactions);
    }, [transactions]);

    return (
        <>
            <div className="landingPage">
                <div className="expenseTracker">
                    <ExpenseTracker onTxnAdded={setTransactions} />
                </div>
                <div className="txnList">
                    <TxnList transactions={transactions} onDeleteHandler={(id) => __delete__(id)} onEditHandler={(txn) => __editTxn__(txn)} />
                </div>
                <div className="trending">
                    <TrendingTxns />
                </div>
            </div>
        </>
    );
}

const transactionsReviver = (key, value) => {
    if (key.toLowerCase().includes('hander')) {
        return 
    }
}

export const categoryIcons = {
    'restaurant': <IoRestaurantOutline />,
    'others': <MdOutlineCategory />,
};

export default App;
