import React from "react";
import logo from "../manga.svg";

function StartPage(){
    return(
        <div>
            <a href={`./`}><img className="logo" src={logo}/></a>
            <li>
                <a href="/commands">Список команд</a>
            </li>
        </div>
    )
}
export default StartPage