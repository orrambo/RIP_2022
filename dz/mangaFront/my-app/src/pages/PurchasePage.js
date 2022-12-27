import React from "react";
import {GetPurchase, GetPurchasesById} from "../contexts/provider";
import "../styles/PurchasePage.css"
import {Link} from "react-router-dom";


function PurchasePage(){
    const sell = GetPurchase()
    const sells = GetPurchasesById(localStorage.getItem('user_id'))

    const decline=(sell_id)=> {
        const ob = {
            id: sell_id,
            status: 228
        }
        fetch('api/status/change', {
            method: "put",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                window.location.replace("/purchases")
            })
    }

    return (
        <div>
            <div className="purchase_nav">
                <Link to={`../`}>
                    <a>Главная/</a>
                </Link>
                <Link to={'/purchases'}>
                    <a>Заказы</a>
                </Link>
            </div>
            <div className="purchases_block">
                <div>
                {sells.map(sells =>
                    <div key={sells.id} className="purchase_row">
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
                        <div className={"purchase_block"}>
                            {sell.map(sell =>
                                <div>
                                    {
                                        sells.id == sell.sell ?
                                            <div key={sell.sell} className="m_purchase_line">
                                                <div className="purchase_image_block">
                                                    <Link to={`/mangas/getbyid/${sell.manga}`}>
                                                        <img className="purchase_image"
                                                             src={`http://127.0.0.1:8000/media/${sell.image}`}/>
                                                    </Link>
                                                </div>
                                                <div className={"purchase_title_block"}>{sell.title}</div>
                                                <div
                                                    className={"purchase_quantity_block"}>Цена: {sell.price * sell.quantity} ₽
                                                </div>
                                                <div
                                                    className={"purchase_price_block"}>Количество: {sell.quantity} шт
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
                                sells.status === 1 ?
                                <button className="purchase_decline_button" onClick={() => {decline(sells.id)}}>Отменить заказ</button>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
)};
export default PurchasePage;