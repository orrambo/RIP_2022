import {useParams} from "react-router-dom";
import {GetManga} from "../contexts/provider";
import logo from "../manga.svg";


function MangaPage() {
    const params = useParams();
    const mangaId = params.id;
    const manga = GetManga(mangaId);
    return (
        <div>
            <a href = {'/'}><img className="logo" src={logo}/>/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <a href = {`/mangas/getbyid/${mangaId}`}>{manga.title}/</a>
            <div className="manga_block">
                <img src={manga.image}></img>
                <div>{manga.title}</div>
                <div>{manga.description}</div>
                <div>{manga.price}</div>
            </div>
        </div>
    );

}

export default MangaPage;
