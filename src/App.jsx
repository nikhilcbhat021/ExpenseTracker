import { useState, useEffect, useCallback } from "react";

import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiCoffeeDuotone } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { MdPets } from "react-icons/md";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdOutlineLocalHospital } from "react-icons/md";

import { IconContext } from "react-icons";
import ReactModal from "react-modal";
import { v1, v3, v4, v5, v6, v7, stringify } from "uuid";
import { enqueueSnackbar } from "notistack";
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
import EditTransactionModal from "./components/Modals/EditTransactionModal";
import { useRef } from "react";

export const categoryIcons = {
    'Others': <MdOutlineCategory />,
    'Restaurant': <IoRestaurantOutline />,
    'Groceries': <MdOutlineLocalGroceryStore />,
    'Coffee': <PiCoffeeDuotone/>,
    'Gym': <CgGym/>,
    'Pet': <MdPets/>,
    'Game': <IoLogoGameControllerB />,
    'Emergency': <MdOutlineLocalHospital />,
};
export const expenseFormKeys = ['Title', 'Price', 'Category', 'Date'];
export const balanceFormKeys = ['Amount'];
export const storage__walletBalance="walletBalance";
export const storage__totalExpenses="totalExpenses";
export const storage_allTransactions = "allTransactions";

function usePurelyOnRender(func, deps) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current === true) {
            console.log("calling update storage");
            func();
        } else {
            console.log("First mount... not rerender");
            didMountRef.current = true;
        }
    }, deps);
}

function App() {
    const [transactions, setTransactions] = useState([]);
    const [txnToBeEdited, setTxnToBeEdited] = useState(null);
    const [_isEditTxnModalOpen, _setEditTxnIsModalOpen] = useState(false);

    const [walletBalance, setWalletBalance] = useState(
        Number(localStorage.getItem(storage__walletBalance))
    );
    const [totalExpenses, setTotalExpenses] = useState(
        Number(localStorage.getItem(storage__totalExpenses))
    );

    const __delete__ = useCallback((id) => {
        console.log(id);
    
        setTransactions((txns) => {
            const index = txns.findIndex((val)=>{
                console.debug(val, id)
                return val.id === id;
            })
            console.debug(index);
            const updatedTxnList = [...txns.slice(0, index), ...txns.slice(index + 1, txns.length)];
            return updatedTxnList;
        });
    });

    const __editTxn__ = useCallback((txn) => {
        console.log("Inside Edit Transaction callback");
        console.log(txn);
        
        // Opening the modal here.
        _setEditTxnIsModalOpen(true);
        setTxnToBeEdited(txn);
    });


    const transactionObjectJSONparser = (key, value) => {
        console.log(key, value);
        if (key === 'Date') {
            return new Date(value);
        }
        return value;
    }

    // update storage, whenever the state changes...
    usePurelyOnRender(() => {
        const jsonified = JSON.stringify(transactions.map(txn => JSON.stringify(txn)));
        console.log(jsonified);
        localStorage.setItem(storage_allTransactions, jsonified);
    }, [transactions])

    usePurelyOnRender(() => {
        localStorage.setItem(storage__walletBalance, walletBalance);
        if (walletBalance === 0)
            enqueueSnackbar("There is no available balance in your wallet. Please add money.", {variant: 'warning'})

    }, [walletBalance])
    
    usePurelyOnRender(() => {
        localStorage.setItem(storage__totalExpenses, totalExpenses);
    }, [totalExpenses])

    useEffect(() => {
        ReactModal.setAppElement("#root");
        const allTxns = JSON.parse(localStorage.getItem(storage_allTransactions));
        console.log(allTxns);
        let objTransactions = [];
        if (allTxns && allTxns.length !== 0) {
            console.log("Setting the transactions here...");
            objTransactions = allTxns.map(txn => JSON.parse(txn, transactionObjectJSONparser));
            setTransactions(objTransactions);
        } else {
            console.log("No transactions in localStorage");
        }
    }, []);

    return (
        <>
            <div className="landingPage">
                <div className="expenseTracker">
                    <ExpenseTracker onTxnAdded={setTransactions}
                        walletBalance={walletBalance}
                        setWalletBalance={setWalletBalance}
                        totalExpenses={totalExpenses}
                        setTotalExpenses={setTotalExpenses}
                    />
                </div>
                <div className="txnList">
                    <TxnList transactions={transactions} onDeleteHandler={(id) => __delete__(id)} onEditHandler={(txn) => __editTxn__(txn)} />
                </div>
                <div className="trending">
                    <TrendingTxns />
                </div>
                <EditTransactionModal 
                    txn={txnToBeEdited} 
                    _isModalOpen={_isEditTxnModalOpen} 
                    _setIsModalOpen={_setEditTxnIsModalOpen} 
                    setTransactions={setTransactions} 
                    setTotalExpenses={setTotalExpenses} 
                    walletBalance={walletBalance}
                    setWalletBalance={setWalletBalance}
                />
            </div>
        </>
    );
}


export default App;
