import { useState } from "react";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

import expStyles from "../ExpenseTracker/ExpenseTracker.module.css";
import { expenseFormKeys, categoryIcons } from "../../App";
import Button from "../utils/Button";

const EditTransactionModal = ({
    txn,
    _isModalOpen,
    _setIsModalOpen,
    setTransactions,
    setTotalExpenses,
    walletBalance,
    setWalletBalance
}) => {
    
    useEffect(() => {
        console.log("EditTransactionModal mounted... props :-");
        if (!txn) return;
        console.log(txn, _isModalOpen);
    }, []);
    
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data_obj = expenseFormKeys.reduce((prev, key, i) => {
            return { ...prev, [key]: formData.get(key) };
        }, {});

        data_obj["Price"] = Number(data_obj["Price"]); //// Just a failsafe...
        if (data_obj["Price"] <= 0) {
            enqueueSnackbar('Price has to be greater than 0.', {variant:'error'})
            return;
        }

        console.log(walletBalance)
        console.log(data_obj["Price"])
        const updatedPrice =  Number(data_obj["Price"]) - Number(txn["Price"]);
        if (updatedPrice > walletBalance) {
            enqueueSnackbar("Can't spend more than walletbalance", {variant: 'error'});
            return;
        }

        console.debug(data_obj["Date"]);
        data_obj["Date"] = new Date(data_obj["Date"]);

        console.log(data_obj);
        console.log(txn)
        const editedTxn = {...data_obj, id:txn.id};
        console.log(editedTxn);        

        setTransactions((txns) => {
            const index = txns.findIndex((val) => {
                console.debug(val, txn.id);
                return val.id === txn.id;
            });
            console.debug(index);


            let updatedTxnList = [...txns];
            updatedTxnList[index] = {...editedTxn};
            console.log(updatedTxnList);

            return updatedTxnList;
        });
        setTotalExpenses((exp) => exp + (Number(data_obj["Price"]) - Number(txn["Price"])));
        setWalletBalance((bal) => bal - (Number(data_obj["Price"]) - Number(txn["Price"])));
        _setIsModalOpen(false);
    };

    return (
        <>
            {txn && console.log(`${new Date(txn["Date"]).getFullYear()}-${new Date(txn["Date"]).getMonth() + 1}-${new Date(txn["Date"]).getDate()}`)}
            <ReactModal
                isOpen={_isModalOpen}
                onAfterOpen={() => {
                    enqueueSnackbar("Available balance is "+Number(walletBalance + Number(txn["Price"])) , {variant: 'info'})
                }}
                onRequestClose={() => {
                    _setIsModalOpen(false);
                }}
                overlayClassName={`${expStyles.modal__overlay}`}
                className={`${expStyles.modal__content}`}
            >
                <p className={`${expStyles.modal__title}`}>Edit Expense</p>
                <form
                    action=""
                    onSubmit={(e) => onSubmitHandler(e, "transaction")}
                    onClose={() => {
                        console.log("form closed");
                    }}
                >
                    <div className={`${expStyles.modal__grid__expense}`}>
                        {expenseFormKeys.map((key) => {
                            if (key === "Category") {
                                return (
                                    <select
                                        name={key}
                                        placeholder={key}
                                        id={key}
                                        required
                                        key={key}
                                        defaultValue={txn && txn[key]}
                                    >
                                        {Object.keys(categoryIcons).map(
                                            (categoryKey) => {
                                                console.log(categoryKey);
                                                return (
                                                    <option
                                                        key={categoryKey}
                                                        value={categoryKey}
                                                    >
                                                        {categoryKey}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                );
                            }
                            return (
                                <input
                                    key={key}
                                    type={
                                        key === "Date"
                                            ? "date"
                                            : key === "Price"
                                            ? "number"
                                            : "text"
                                    }
                                    placeholder={key}
                                    id={key}
                                    name={key}
                                    defaultValue={
                                        txn && (key==='Date' 
                                        ? `${new Date(txn["Date"]).getFullYear()}-${new Date(txn["Date"]).getMonth() + 1}-${new Date(txn["Date"]).getDate()}` 
                                        : txn[key]) 
                                    }
                                    required
                                />
                            );
                        })}

                        <Button
                            title="Edit Expense"
                            onClick={(e) => {
                                console.log("Can do validations here...");
                                return;
                            }}
                            btnClass="submitBtn"
                        ></Button>

                        <Button
                            title="Cancel"
                            onClick={(e) => {
                                _setIsModalOpen(false);
                            }}
                            btnClass="cancelBtn"
                            classes={`${expStyles.modal__cancel__expense}`}
                        ></Button>
                    </div>
                </form>
            </ReactModal>
        </>
    );
};

export default EditTransactionModal;
