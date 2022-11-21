import {useParams} from "react-router-dom";
import {GetManga} from "../contexts/provider";


function MangaPage() {
    const params = useParams();
    const mangaId = params.id;
    const manga = GetManga(mangaId);
    return (
        <div>
            <a href = {'/'}>Начало/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <a href = {`/mangas/getbyid/${mangaId}`}>{manga.title}/</a>
            <div>
                <img src={manga.image}></img>
                <div>{manga.title}</div>
                <div>{manga.price}</div>
            </div>
        </div>
    );

}

export default MangaPage;