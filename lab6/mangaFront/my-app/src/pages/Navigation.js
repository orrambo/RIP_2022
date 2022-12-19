import React, {useContext, useState} from "react"
import "../styles/StartPage.css"
import logo from "../manga.svg";

function Navbar() {

    const get_user=()=> {

        fetch(`http://127.0.0.1:8000/user/3`)
            .then(response => response.json())
            .then(data => {
                setUser(data.login)
                return(data.login)
            })
    }

    const [user, setUser] = useState(get_user)

    const autorise = () =>{
        if (localStorage.getItem('theme') == 'light'){
            localStorage.setItem('theme' , 'dark')
            window.location.replace("/");
        }else{
            get_user(1)
            localStorage.setItem('theme' , 'light')
            window.location.replace("/");

        }
    }
    return (
        <div className="navigation">
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
                <a className={`buy_button ${localStorage.getItem('theme')}`} href="/mangas/cart">Корзина</a>
            </div>
            <div className={"nav_log_in"}>
                <input id="buy_button2" className={`buy_button2 ${localStorage.getItem('theme')}`} type="submit" value="Войти" onClick={autorise}/>
                <input id="buy_button3" className={`buy_button3 ${localStorage.getItem('theme')}`} type="submit" value="Выйти" onClick={autorise}/>

            </div>
            <div className={"nav_user"}>
                <div className={`buy_button3 ${localStorage.getItem('theme')}`}>Пользователь: {user}</div>
            </div>
        </div>
    );
}

export default Navbar;