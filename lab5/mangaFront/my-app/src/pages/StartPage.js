import React from "react";
import {Link} from "react-router-dom";

function StartPage(){
    return(
        <div>
            <a href={`./`}>Начало</a>
            <li>
                <a href="/commands">Список команд</a>
            </li>
        </div>
    )
}
export default StartPage