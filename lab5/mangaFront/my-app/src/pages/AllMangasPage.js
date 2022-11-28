import {Link} from "react-router-dom";
import {GetMangas} from "../contexts/provider";
import "../styles/AllMangaPage.css"
import logo from "../manga.svg"

function AllMangasPage(){

    return (
        <div>
            <a href = {'/'}><img className="logo" src={logo}/>/</a>
            <a href={'/commands'}>Список команд/</a>
            <a href = {'/mangas/getall'}>Манги/</a>
            <div className="mangas_row">
                {GetMangas().map(manga =>
                    <div className="mangas_block" key = {manga.id}>
                        <img className="mangas_image"  src={manga.image}></img>
                        <Link className="mangas_link" to={`/mangas/getbyid/${manga.id}`}>{manga.title}</Link>
                    </div>)}
            </div>
        </div>
    );
}
export default AllMangasPage;

