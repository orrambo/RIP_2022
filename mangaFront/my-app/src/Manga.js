import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {manga_data} from  "./MangaDict";

function Manga() {
    // Кстати, это хороший пример деструктуризации массива в JavaScript
    const [mangas, setMangas] = useState(manga_data);

    useEffect(()=>{
        console.log('Этот код выполняется только на первом рендере компонента')
        // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
        setMangas(mangas=>[...mangas])
        }, [])

    return (
        <div>
            <Link to="/">Главная</Link>
            <h1>Манга</h1>
            {mangas.map((manga, index)=>{
                return (
                    <div>
                        <Link to={`/${manga.id}`}>{manga.name}</Link>
                    </div>
                )
            })}
        </div>
    );
}

export default Manga;