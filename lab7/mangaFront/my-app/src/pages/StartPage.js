import React from "react";
import logo from "../manga.svg";

function StartPage(){

    return(
        <div>
            <a href={`./`}>Главная</a>
            <div className={`blocker ${localStorage.getItem('theme')}`}>
                <p className={`app ${localStorage.getItem('theme')}`}>Добро пожаловать</p>
            </div>
        </div>
    )
}
export default StartPage