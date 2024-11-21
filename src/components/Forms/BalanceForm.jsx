import { useState } from "react";
import { useSnackbar } from 'notistack';
import { MdSettingsInputComponent } from "react-icons/md";

import Button from "../utils/Button";
import modalStyles from "../Modals/Modal.module.css";

const BalanceForm = ({ setIsModalOpen, setBalance }) => {
    const [income, setIncome] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleAddBalance = (e) => {
        e.preventDefault();
        if (Number(income) < 1) {
            enqueueSnackbar("Price has to be greater than 1.", {
                variant: "error",
            });
        } else {
            setBalance((b) => b + Number(income));
        }

        setIsModalOpen(false);
    };

    return (
        <div className={modalStyles.balanceForm}>
            <h3>Add Balance</h3>
            <form onSubmit={(e) => handleAddBalance(e)}>
                <input
                    type="number"
                    name="balance"
                    id="balance"
                    placeholder="balance"
                    required
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                />
                <Button
                    type="submit"
                    title="Add Balance"
                    onClick={(e) => {
                        console.log("Can do validations here...");
                        console.log(e.target.id);
                        // return;
                    }}
                    btnClass="submitBtn"
                />
                <Button
                    title="Cancel"
                    onClick={() => {
                        setIsModalOpen(false);
                    }}
                    btnClass="cancelBtn"
                />
            </form>
        </div>
    );
};

export default BalanceForm;
