import React from "react";
import {Link} from "react-router-dom";
import {GetCart, GetMangas} from "../contexts/provider";
import "../styles/CartPage.css"


function Cart(){
    const mangas = GetMangas()

    const del=(id_manga)=> {
        console.log(id_manga)
        fetch(`http://127.0.0.1:8000/cart/${id_manga}`, {
            method: "DELETE",
        })
            .then(res => {
                if (res.ok) {
                    console.log("HTTP request successful");
                    window.location.reload();
                } else {
                    console.log("HTTP request unsuccessful");
                }
            })

    }

    return (
        <div>
            <div className="cart_nav">
                <a href={`../`}>Главная/</a>
                <a href = {'/models/cart'}>Корзина</a>
            </div>
            <div className="cart_block">
            {GetCart().map(cart =>
                <div>
                    <div key = {cart.manga} className="cart_line">
                        <div className="cart_image_block">
                            <Link to={`/mangas/getbyid/${mangas[cart.manga - mangas[0].id].id}`}>
                                <img className="cart_image" src={`${mangas[cart.manga - mangas[0].id].image}`} />
                            </Link>
                        </div>
                        <div className="cart_title_block">
                        <Link className="cart_title" to={`/mangas/getbyid/${mangas[cart.manga - mangas[0].id].id}`}>
                            {mangas[cart.manga - mangas[0].id].title}
                        </Link>
                        </div>
                        <div className="cart_price_block">
                            <div className="cart_price">
                            {mangas[cart.manga - mangas[0].id].price}  ₽
                            </div>
                        </div>
                        <div className="cart_delete_block">
                        <input id="buy_button" className="delete_button" type="submit" value="Удалить" onClick={()=>{del(cart.id)}}/>
                        </div>
                    </div>
                    <hr/>
                </div>)}

            {/*<button>Купить</button>*/}
            </div>
        </div>
    );
}
export default Cart;