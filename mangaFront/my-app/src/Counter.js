import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Count() {
        // Объявление новой переменной состояния «count»
    const [count, setCount] = useState(0);
    return (
            <div>
                <Link to="/">Главная</Link>/<Link to="/counter">Счетчик</Link><br></br>
                <button onClick={()=>setCount(count + 1)}>{count}</button>

            </div>
    )
}

export default Count;