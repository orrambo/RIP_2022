import React, {useContext, useState} from "react"
import "../styles/StartPage.css"
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
            <div className="nav_block">
                <a className="nav_logo" href="/">
                    <img className="logo" src={logo}/>
                </a>
                <div className="nav_home">
                    <a className="" aria-current="page" href="/">Главная</a>
                </div>
                <div className="nav_manga">
                    <a className="" href="/mangas/getall">Манга</a>
                </div>
                <div className="nav_cart">
                    {
                        sessionStorage.getItem('token') ?
                            <a className="nav-link" href="/mangas/cart">Корзина</a>
                            :
                            <div></div>
                    }
                </div>
                <div className={"nav_log_in"}>
                    {
                        sessionStorage.getItem('token') ?
                            <input
                                id="buy_button3"
                                type="submit" value="Выйти"
                                onClick={unautorise}
                            />
                            :
                            <a href="http://127.0.0.1:3000/login">
                                <input
                                    id="buy_button2"
                                    type="submit" value="Войти"
                                />
                            </a>


                    }

                </div>
            </div>
        </div>
    );
}

export default Navbar;