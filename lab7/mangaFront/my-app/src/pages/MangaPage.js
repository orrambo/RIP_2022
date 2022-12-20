import {useParams} from "react-router-dom";
import {GetManga} from "../contexts/provider";
import {useEffect, useState} from "react";
import '../styles/MangaPage.css'


function MangaPage() {
    const params = useParams();
    const mangaId = params.id;
    const manga = GetManga(mangaId);

    const buy=(quantity, user, manga)=> {
        const ob = {
            quantity: quantity,
            user: user,
            manga: manga
        }
        fetch("http://127.0.0.1:8000/cart/", {
            method: "post",
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    const get_user=()=> {
        console.log()
        fetch(`http://127.0.0.1:8000/rest-auth/user/`, {
            headers: {
                "Authorization": `Token ${sessionStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.pk)
                setUser(data);
            })
    }

    const [user, setUser] = useState(
        {
            "pk": 1,
            "username": "",
            "email": "",
            "first_name": "",
            "last_name": ""
        }
    )

    useEffect( () => {
        get_user()
    }, [])

    return (
        <div>
            <div className={"bread"}>
            <a href = {'/'}>Главная/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <a href = {`/mangas/getbyid/${mangaId}`}>{manga.title}/</a>
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
                            sessionStorage.getItem('token') ?
                                <input className={"single_manga_btn"} id="buy_button" type="submit" value="В корзину" onClick={()=>{buy(1, user.pk, mangaId)}}/>
                                :
                                <div className={"single_manga_btn"}></div>
                        }
                    </div>
                    <div className={"single_manga_price"}>{manga.price} ₽</div>
                </div>
            </div>
        </div>
    );

}

export default MangaPage;