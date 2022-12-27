import React from "react";
import '../styles/StartPage.css'

function StartPage(){

    return(
        <div>
            {
                document.cookie.split("=")[1] ?
                    <div className={"start_page"}>Добро пожаловать {localStorage.getItem('user_login')}</div>
                    :
                    <div className={"start_page"}>Войдите в аккаунт</div>
            }
        </div>
    )
}
export default StartPage