import {useParams} from 'react-router';
import {Link} from "react-router-dom";

export const MangaList = ({mangas}) =>{
    const {id} = useParams()
    const manga = mangas.filter(manga=>manga.id === id)
    return (
        manga[0] ?
            <div>
                <Link to="/">Главная</Link>/<Link to={`/${manga[0].id}`}>{manga[0].name}</Link>
                <p>Название: {manga[0].name}</p>
                <p>Описание: {manga[0].description}</p>
                <p>Цена: {manga[0].price}</p>
            </div>:
            <h1>Такой манги нет</h1>
    );
}