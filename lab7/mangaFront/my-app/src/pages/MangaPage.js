import {useParams} from "react-router-dom";
import {GetManga} from "../contexts/provider";
import logo from "../manga.svg";


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
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ob)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    return (
        <div>
            <a href = {'/'}>Главная/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <a href = {`/mangas/getbyid/${mangaId}`}>{manga.title}/</a>
            <div>
                <img src={manga.image}></img>
                <div>{manga.title}</div>
                <div>{manga.price}</div>
                <input id="buy_button" className={`buy_button ${localStorage.getItem('theme')}`} type="submit"
                       value="В корзину" onClick={()=>{buy(1, 3, mangaId)}}/>
            </div>
        </div>
    );

}

export default MangaPage;