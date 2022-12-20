import React from "react"
import "../styles/StartPage.css"
import "../styles/Navigation.css"
import logo from "../manga.svg";

function Navbar() {

    const unautorise = () =>{

        fetch("http://127.0.0.1:8000/rest-auth/logout/", {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                sessionStorage.removeItem('token')
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_login')
                window.location.replace("http://127.0.0.1:3000/login");
            })
            .catch(function (reason) {
                console.log(reason);
            })
    }

    return (
        <div className="navigation">
            <a className="nav_logo" src={logo} href="/">
                <img className="logo" src={logo}/>
            </a>
            <a className="nav_home" aria-current="page" href="/">Главная</a>
            <a className="nav_home " href="/mangas/getall">Манга</a>
            {
                sessionStorage.getItem('token') ?
                    <a className="nav_home" href="/mangas/cart">Корзина</a>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                sessionStorage.getItem('token') ?
                    <a className="nav_home" href="/purchase">Заказы</a>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                sessionStorage.getItem('token') ?
                    <div className={"nav_sign_in"}>
                        <div className="user_text">{localStorage.getItem('user_login')}</div>
                        <input className="nav_log_in"
                               id="buy_button3"
                               type="submit" value="Выйти"
                               onClick={unautorise}
                        />
                    </div>
                    :
                    <div className={"nav_sign_in"}>
                        <a href="http://127.0.0.1:3000/login">
                            <input className="nav_log_in"
                                   id="buy_button2"
                                   type="submit" value="Войти"
                            />
                        </a>
                    </div>
            }
        </div>
    );
}

export default Navbar;