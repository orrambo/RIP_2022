import React from "react";
import {GetPurchases} from "../contexts/provider";
import "../styles/PurchasePage.css"


function PurchasePage(){
    const sell = GetPurchases(localStorage.getItem('user_id'))

    return (
        <div>
            <div className="cart_nav">
                <a href={`../`}>Главная/</a>
                <a href = {'/purchase'}>Заказы</a>
            </div>
            <div className="purchases_block">
                {sell.map(sell =>
                        <div key = {sell.id} className="">
                            <h1>Заказ №{sell.id}</h1>
                            <div>Статус заказа:
                                {
                                    sell.status == 1 ?
                                        <div>в ожидании</div>
                                        :
                                        <div>нет информации</div>
                                }
                            </div>
                        </div>
    )}
            </div>
        </div>
)};
export default PurchasePage;