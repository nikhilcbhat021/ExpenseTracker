import expStyles from "./ExpenseTracker.module.css";
import Card from "../utils/Card";
import PieChart from "../Visuals/PieChart";
import Button from "../utils/Button";
import Transaction from "../TxnComp/Transaction";
// import { __delete__, __editTxn__, categoryIcons } from "../../App";

import { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";


const ExpenseTracker = ({onTxnAdded}) => {
    const [walletBalance, setWalletBalance] = useState(
        Number(localStorage.getItem("walletBalance"))
    );
    const [totalExpenses, setTotalExpenses] = useState(
        Number(localStorage.getItem("totalExpenses"))
    );

    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isWalletModalVisible, setIsWalletModalVisible] = useState(false);

    useEffect(() => {
        console.log(walletBalance, totalExpenses);
        localStorage.setItem("walletBalance", walletBalance);
        localStorage.setItem("totalExpenses", totalExpenses);

    }, [totalExpenses, walletBalance]);

    const expenseFormKeys = ['Title', 'Price', 'Category', 'Date'];
    const balanceFormKeys = ['Amount'];

    const transactionReplacer = (key, value) => {
        if (key.toLowerCase().includes('handler')) {
            return value.toString();
        }
        return value;
    }

    const onSubmitHandler = (e, formKeys, localStorageKey) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data_obj = formKeys.reduce((prev, key, i) => {
            return {...prev, [key]: formData.get(key)}
        }, {})
        
        if (localStorageKey === "transaction") {    
            // add handlers to data_obj if its a transaction...
            // add data_obj to txnList (state & localStrg)
            // update totalExpenses (state & localStrg)

            // data_obj["onDeleteHandler"] = __delete__;
            // data_obj["onEditHandler"] = __editTxn__;
            data_obj["Price"] = Number(data_obj["Price"]); //// Just a failsafe...
            data_obj["Date"] = new Date(data_obj["Date"]);
            data_obj["id"] = crypto.randomUUID();
            // onAltTxnAdded((txns) => ([...txns, data_obj]));

            console.log(data_obj);
            const allTxns = localStorage.getItem("allTransactions");
            localStorage.setItem("allTransactions", [...allTxns, JSON.stringify(data_obj, transactionReplacer)]);

            setTotalExpenses((exp) => (exp + Number(data_obj["Price"])));
            // localStorage.setItem("totalExpenses", totalExpenses + Number(data_obj["Price"]));

            setWalletBalance((bal) => (bal - Number(data_obj["Price"])));
            // localStorage.setItem("walletBalance", walletBalance - Number(data_obj["Price"]));

            // transactions will have the category icon and not the text...
            // data_obj["Category"] = categoryIcons[data_obj["Category"]];
            // data_obj["onDeleteHandler"] = __delete__;
            // data_obj["onEditHandler"] = __editTxn__;
            onTxnAdded((trxns) => ([...trxns, data_obj]));


            /**
             * 
             */
        } else if (localStorageKey === "walletBalance") {
            // update walletBalance (state , localStrg)
            console.log(data_obj)
            if (data_obj[formKeys[0]] > 0) {
                setWalletBalance((bal) => (bal + Number(data_obj[formKeys[0]])));
                console.log(walletBalance);
                localStorage.setItem("walletBalance", walletBalance);
            } else {
                alert("Invalid income added!");
            }
        }
        setIsExpenseModalVisible(false);
        setIsWalletModalVisible(false);
        return;
        // (formData.get(formKeys[0]))
    }

    // const _onSubmitHandler = (e, formKeys, localStorageKey) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);

    //     const data_obj = formKeys.reduce((prev, key, i) => {
    //         return {...prev, [key]: formData.get(key)}
    //     }, {})

    //     if (localStorageKey === "transaction") {
    //         // add handlers to data_obj if its a transaction...
    //         // add data_obj to txnList (state & localStrg)
    //         // update totalExpenses (state & localStrg)

    //         data_obj["onDeleteHandler"] = __delete__.toString();
    //         data_obj["onEditHandler"] = __editTxn__.toString();
    //         data_obj["Date"] = new Date(data_obj["Date"]);
    //         data_obj["id"] = crypto.randomUUID();

    //         console.log(data_obj);
    //         const allTxns = localStorage.getItem("allTransactions");
    //         localStorage.setItem("allTransactions", [...allTxns, JSON.stringify(data_obj)]);

    //         setTotalExpenses((exp) => (exp + Number(data_obj["Price"])));
    //         // localStorage.setItem("totalExpenses", totalExpenses + Number(data_obj["Price"]));

    //         setWalletBalance((bal) => (bal - Number(data_obj["Price"])));
    //         // localStorage.setItem("walletBalance", walletBalance - Number(data_obj["Price"]));

    //         // transactions will have the category icon and not the text...
    //         // data_obj["Category"] = categoryIcons[data_obj["Category"]];
    //         data_obj["onDeleteHandler"] = __delete__;
    //         data_obj["onEditHandler"] = __editTxn__;
    //         onTxnAdded((trxns) => ([...trxns, 
    //             (<Transaction
    //                 txn={{...data_obj, id: data_obj["Date"].toDateString()}}
    //                 setTransactions={onTxnAdded}
    //             ></Transaction>)
    //         ]));

    //         // onAltTxnAdded((txns) => ([...txns, {...data_obj, id: crypto.randomUUID()}]));

    //         /**
    //          * 
    //          */
    // }

    return (
        <>
            <p className={`${expStyles.title}`}>ExpenseTracker</p>
            <div className={`${expStyles.container}`}>
                <div className={`${expStyles.cardContainer}`}>
                    <Card
                        title="Wallet Balance "
                        number={walletBalance}
                        numberColor="#9DFF5B"
                        btnTitle="+ Add Income"
                        btnClickHandler={() => {
                            // show modal
                            // get the new balance, update if after proper validations.
                            // setWalletBalance(3000);
                            setIsWalletModalVisible(true);
                            console.log(
                                "card btn clicked. From ExpenseTracker"
                            );
                        }}
                    ></Card>
                </div>
                <div className={`${expStyles.cardContainer}`}>
                    <Card
                        title="Expenses "
                        number={totalExpenses}
                        numberColor="#F4BB4A"
                        btnTitle="+ Add Expense"
                        btnClickHandler={() => {
                            // show modal
                            // get the new txn here and subtract its expense from the existing balance.
                            // do proper checks..
                            // setTotalExpenses(2000);
                            setIsExpenseModalVisible(true);
                            console.log(
                                "card btn clicked. From ExpenseTracker"
                            );
                        }}
                    ></Card>
                </div>

                <div className={`${expStyles.pieContainer}`}>
                    <PieChart></PieChart>
                </div>

                <ReactModal
                    isOpen={isExpenseModalVisible}
                    onRequestClose={() => {
                        setIsExpenseModalVisible(false);
                    }}
                    overlayClassName={`${expStyles.modal__overlay}`}
                    className={`${expStyles.modal__content}`}
                >
                    <p className={`${expStyles.modal__title}`}>Add Expenses</p>
                    <form action="" onSubmit={(e) => onSubmitHandler(e, expenseFormKeys, "transaction")} onClose={() => {console.log("form closed")}}>
                        <div className={`${expStyles.modal__grid__expense}`}>
                            {
                                expenseFormKeys.map((key) => {
                                    return (
                                        <input
                                            key={key}
                                            type={key==='Date' ? "date" : (key==='Price' ? "number" : "text")}
                                            placeholder={key}
                                            id={key}
                                            name={key}
                                            required
                                        />  
                                    )
                                })
                            }

                            <Button
                                title="Add Expense"
                                onClick={(e) => {
                                    console.log("Can do validations here...");
                                    return;
                                }}
                                btnClass="submitBtn"
                            ></Button>

                            <Button
                                title="Cancel"
                                onClick={(e) => {
                                    setIsExpenseModalVisible(false);
                                }}
                                btnClass="cancelBtn"
                                classes={`${expStyles.modal__cancel__expense}`}
                            ></Button>
                        </div>
                    </form>
                </ReactModal>

                <ReactModal
                    isOpen={isWalletModalVisible}
                    onRequestClose={() => {
                        setIsWalletModalVisible(false);
                    }}
                    overlayClassName={`${expStyles.modal__overlay}`}
                    className={`${expStyles.modal__content}`}
                >
                    <p className={`${expStyles.modal__title}`}>Add Balance</p>
                    <form action="" onSubmit={(e) => onSubmitHandler(e, balanceFormKeys, "walletBalance")}>
                        <div className={`${expStyles.modal__grid__balance}`}>
                            {
                                balanceFormKeys.map((key) => {
                                    return (
                                        <input
                                            key={key}
                                            type={key!=='Date' ? "text" : "date"}
                                            placeholder={key}
                                            id={key}
                                            name={key}
                                            required
                                        />  
                                    )
                                })
                            }
                            <Button
                                title="Add Balance"
                                onClick={(e) => {
                                    console.log("Can do validations here...");
                                    // return;
                                }}
                                btnClass="submitBtn"
                            ></Button>
                            <Button
                                title="Cancel"
                                onClick={() => {
                                    setIsWalletModalVisible(false);
                                }}
                                btnClass="cancelBtn"
                            ></Button>
                        </div>
                    </form>
                </ReactModal>
            </div>
        </>
    );
};

export default ExpenseTracker;
