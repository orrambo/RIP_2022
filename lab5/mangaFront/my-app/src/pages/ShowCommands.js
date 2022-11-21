import {Link} from "react-router-dom";
import React from "react";

function ShowCommands(){
    return(
        <div>
            <a href={'././'}>Начало/</a>
            <a href={'./commands'}>Список команд</a>
            <h1>Список команд</h1>
            <li>
                <Link to="/mangas/getall" >Список всех манг</Link>
            </li>
        </div>

    )
}
export default ShowCommands;