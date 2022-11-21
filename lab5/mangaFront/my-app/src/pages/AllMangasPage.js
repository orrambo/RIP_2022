import {Link} from "react-router-dom";
import {GetMangas} from "../contexts/provider";

function AllMangasPage(){

    return (
        <div>
            <a href = {'/'}>Начало/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <ul>
                {GetMangas().map(manga =>
                    <li key = {manga.id}>
                        <Link to={`/mangas/getbyid/${manga.id}`}>{manga.title}</Link>
                    </li>)}
            </ul>
        </div>
    );
}
export default AllMangasPage;

