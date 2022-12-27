import React from "react";
import {GetPurchase, GetPurchases} from "../contexts/provider";
import "../styles/ManagerPurchasePage.css"
import {Link} from "react-router-dom";


function ManagerPurchasePage(){
    const sell = GetPurchase()
    const sells = GetPurchases()

    const accept_reject=(sell_id, status)=> {
        const ob = {
            id: sell_id,
            status: status
        }
        fetch('api/status/change', {
            method: "put",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.replace("/manager_purchases")
            })
    }

    return (
        <div>
            <div className="m_purchase_nav">
                <Link to={`../`}>
                    <a>Главная/</a>
                </Link>
                <Link to={'/manager_purchases'}>
                    <a>Заказы</a>
                </Link>
            </div>
            <div className="purchases_block">
                <div>
                    {sells.map(sells =>
                        <div>
                            {sells.status == 1 || sells.status == 2 ?
                                <div key={sells.id} className="m_purchase_row">
                                    <div className={"purchase"}>Заказ №{sells.id}</div>
                                    <div>Статус заказа:
                                        {
                                            sells.status == 1 ?
                                                <div className={"status"}>в ожидании</div>
                                                : sells.status == 2 ?
                                                    <div className={"status"}>в доставке</div>
                                                    : sells.status == 3 ?
                                                        <div className={"status"}>отклонен</div>
                                                        :
                                                        sells.status == 4 ?
                                                        <div className={"status"}>отменен</div>
                                                            :
                                                                <div className={"status"}>доставлен</div>
                                        }
                                    </div>
                                    <div className={"purchase_date"}>Дата последнего изменения: {sells.sell_date.split('.')[0].replace('T', ' ')}</div>
                                    <div className={"m_purchase_block"}>
                                        {sell.map(sell =>
                                            <div>
                                                {
                                                    sells.id == sell.sell ?
                                                        <div key={sell.sell} className="m_purchase_line">
                                                            <div className={"m_purchase_title_block"}>{sell.title}</div>
                                                            <div
                                                                className={"m_purchase_quantity_block"}>Количество: {sell.quantity} шт
                                                            </div>
                                                            <div
                                                                className={"m_purchase_price_block"}>Цена: {sell.price * sell.quantity} ₽
                                                            </div>
                                                        </div>
                                                        :
                                                        <div></div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {
                                            sells.status === 2 ?
                                            <button className="m_purchase_accept_button" onClick={() => {
                                                accept_reject(sells.id, 5)
                                            }}>Доставлен
                                            </button>
                                            :
                                            <button className="m_purchase_accept_button" onClick={() => {
                                                accept_reject(sells.id, 2)
                                            }}>Принять заказ
                                            </button>
                                        }
                                        {
                                            sells.status !== 2 &&
                                                <button className="m_purchase_reject_button" onClick={() => {
                                                    accept_reject(sells.id, 3)
                                                }}>Отклонить заказ
                                                </button>
                                        }
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )};
export default ManagerPurchasePage;