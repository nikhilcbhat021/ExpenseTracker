import btnStyles from "./Button.module.css";
import vite from '/vite.svg';
import { IconContext } from "react-icons";

const Button = ({ title="", btnClass = "transparent", classes, icon, onClick}) => {
    console.log(btnClass);
    let bgColor="";

    if (btnClass.includes('-'))
        bgColor = btnClass.split('-')[1];

    console.log(bgColor);
    return (
        <button 
                style={!!bgColor ? {backgroundColor: bgColor}: null}
                className={`${btnStyles.btn} ${btnStyles[btnClass]} ${!!icon && btnStyles.iconBtn} ${!!title && btnStyles.titleBtn} ${classes}`}
                onClick={onClick}
                >
                    {!!icon && icon} {!!title && title}
            </button>
    );
};

export default Button;
