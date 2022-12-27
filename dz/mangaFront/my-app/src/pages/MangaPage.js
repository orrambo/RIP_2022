import {Link, useParams} from "react-router-dom";
import {GetManga} from "../contexts/provider";
import React, {useEffect, useState} from "react";
import '../styles/MangaPage.css'


function MangaPage() {

    const [active, setActive] = useState(false)
    const [nameid, setNameid] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()

    const [count, setCount] = useState(1)
    const params = useParams();
    const mangaId = params.id;
    const manga = GetManga(mangaId);

    const HandleClick = () => {
        const ob = {
            id: nameid,
            price: price
        }
        fetch('/api/price/change',{
            method : "put",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                window.location.reload()
            });
    };

    const buy=(quantity, manga)=> {
        const ob = {
            user: localStorage.getItem('user_id'),
            quantity: quantity,
            manga: manga
        }
        fetch("/api/cart/add", {
            method: "post",
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    return (
        <div>
            <div className={"bread"}>
                <Link to={`/`}>
                    <a>Главная/</a>
                </Link>
                <Link to={'/mangas/getall'}>
                    <a>Манги/</a>
                </Link>
                <Link to={'/mangas/getbyid/${mangaId}'}>
                    <a>{manga.title}/</a>
                </Link>
            </div>
            <div className={"single_manga_block"}>
                <div className={"single_manga_title"}>{manga.title}</div>
                <div className={"single_im_ds_block"}>
                    <img src={manga.image} className={"single_manga_image"}></img>
                    <div className={"single_manga_description"}>{manga.description}</div>
                </div>
                <div className={"single_pr_cart_block"}>
                    <div className={"single_manga_cart"}>
                        {
                            document.cookie.split("=")[1] && localStorage.getItem('is_staff') === 'false'?
                                <div>
                                    <input className={"single_manga_btn"} id="buy_button" type="submit" value="В корзину" onClick={()=>{buy(count, mangaId)}}/>
                                    <button className="plus_minus_btn" onClick={() => {
                                        if (count < 10) setCount(count + 1)
                                    }}>+</button>
                                    <button className="plus_minus_btn" onClick={() => {
                                        if (count > 1) setCount(count - 1)
                                    }}>-</button>
                                    <div >Количество: {count}</div>
                                </div>
                                :
                                <div className={"single_manga_btn"}></div>
                        }
                    </div>
                    <div className={"single_manga_price"}>Цена манги: {manga.price * count} ₽</div>
                    <div>
                        {
                            localStorage.getItem('is_staff') !== 'false' && localStorage.getItem('user_id') &&
                                <button className={"manga_change_btn"} onClick={() => {
                                setActive(true)
                                setNameid(manga.id)
                                setName(manga.title)
                                setPrice(manga.price)
                                }}>Изменить</button>
                            }
                    </div>
                </div>
                    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                        <div className="modal__content" onClick={e => e.stopPropagation()}>
                            <div className="modal_block">
                                    <label htmlFor="name" className="modal_title">{name}</label>
                                    <label htmlFor="size" className="modal_price">Цена</label>
                                <input
                                    type="size"
                                    onChange={(event) => setPrice(event.target.value)}
                                    value={price}
                                    className="input-block33"
                                />
                                <br/>
                                <button onClick={HandleClick} className={"manga_change_btn"} >Сохранить</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );

}

export default MangaPage;