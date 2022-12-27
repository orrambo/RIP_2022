import React from "react"
import "../styles/StartPage.css"
import "../styles/Navigation.css"
import logo from "../manga.svg";
import {Link} from "react-router-dom";

function Navbar() {
    const unautorise = () => {

        fetch('/api/logout/')
            .then(res => {
                console.log(res);
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_login')
                localStorage.removeItem('is_staff')
                window.location.replace("http://127.0.0.1:3000/login");
            })
            .catch(function (reason) {
                console.log(reason);
            })
    }

    return (
        <div className="navigation">
            <Link to={`/`}>
                <img className="logo" src={logo}/>
            </Link>
            <Link to={`/`}>
                <div className="nav_home">Главная</div>
            </Link>
            <Link to={`/mangas/getall`}>
                <div className="nav_home">Манга</div>
            </Link>
            {
                localStorage.getItem('user_id') && localStorage.getItem('is_staff') === 'false' ?
                    <Link to={`/mangas/cart`}>
                        <div className="nav_home">Корзина</div>
                    </Link>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                localStorage.getItem('user_id')  ?
                        localStorage.getItem('is_staff') === 'true' ?
                            <Link to={`/manager_purchases`}>
                                <div className="nav_home">Заказы</div>
                            </Link>
                            :
                            <Link to={`/purchases`}>
                                <div className="nav_home">Заказы</div>
                            </Link>
                    :
                    <div className={"nav_home"}></div>
            }
            {
                localStorage.getItem('user_id') ?
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
                        <Link to={`/login`}>
                             <div>
                                <input className="nav_log_in"
                                       id="buy_button2"
                                       type="submit" value="Войти"
                                />
                            </div>
                        </Link>
                    </div>
            }
        </div>
    );
}

export default Navbar;