import React from "react";
import {Link} from "react-router-dom";
import {GetCart, GetMangas} from "../contexts/provider";
import "../styles/CartPage.css"


function CartPage(){
    const mangas = GetMangas()
    const cart = GetCart(localStorage.getItem('user_id'))

    const buy=()=> {
        let order;
        const se = {
            status: 1,
        }
        fetch('/api/sell/add', {
            method: "post",
            body: JSON.stringify(se)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                order = res[0]
            })

        setTimeout(() => {
            cart.map(cart => {
                const ob = {
                    sell: order,
                    quantity: cart.quantity,
                    manga: cart.manga,
                }
                fetch('/api/purchase/add', {
                    method: "post",
                    body: JSON.stringify(ob)
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                    })
                del(cart.id)
            })
        }, 500);
    }


    const del=(cart_id)=> {
        console.log(cart_id)
        const ob = {
            id:cart_id
        }
        fetch(`/api/manga/delete/`, {
            method: "DELETE",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                window.location.reload('/mangas/cart')
                console.log(res);
            })
}

    return (
        <div>
            <div className="cart_nav">
                <Link to={`../`}>
                    <a>Главная/</a>
                </Link>
                <Link to={'/mangas/cart'}>
                    <a>Корзина</a>
                </Link>
            </div>
            <div className="cart_block">
            {cart.map(cart =>
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
                            <div className="cart_quantity">
                                Количество: {cart.quantity}
                            </div>
                            <div className="cart_price">
                            {mangas[cart.manga - mangas[0].id].price * cart.quantity}  ₽
                            </div>
                        </div>
                        <div className="cart_delete_block">
                        <input id="buy_button" className="delete_button" type="submit" value="Удалить" onClick={()=>{del(cart.id)}}/>
                        </div>
                    </div>
                    <hr/>
                </div>)}
                <div className={"cart_buy_block"}>
                     <button className="cart_buy_button" onClick={()=>{buy()}}>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}
export default CartPage;