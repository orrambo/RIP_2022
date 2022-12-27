import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ReactSlider from "react-slider";
import "../styles/SearchPage.css"


function  SearchPage() {
    const [search_input, set_search_input] = useState(''); //значение для поиска, вводимое пользователем
    const [mangas, setMangas] = useState([]); //список моделей, которые отображаются на странице
    const [minPrice, setMinPrice] = useState(250); //значение текущей минимальной цены в фильтре
    const [maxPrice, setMaxPrice] = useState(500); //значение текущей максимальной цены в фильтре

    const [minrice, setMinrice] = useState(250);
    const [maxrice, setMaxrice] = useState(500);

    //запрос списка моделей с учётом фильтрации
    const getMangas = () => {
        fetch(`http://127.0.0.1:8000/manga/?name=${search_input}&price_min=${minPrice}&price_max=${maxPrice}`)
            .then(response => response.json())
            .then(data => {
                setMangas(data);
                GetFuckingprices();
            })
    }
    useEffect( () => {
        getMangas()
        GetFuckingprices()
    }, [])

    const GetFuckingprices = () => {
        fetch('/minmax/')
            .then(response => response.json())
            .then(data => {
                console.log (minrice)
                setMinrice(data[0].min)
                setMaxrice(data[0].max)
                setMinPrice(data[0].min)
                setMaxPrice(data[0].max)
                console.log (minrice)
            })
            .catch(function (reason) {
                console.log(reason)
                //window.location.replace("/login")
            })
    }


    const filteredMangas = mangas.filter(manga => {
        return manga.title.toLowerCase().includes(search_input.toLowerCase())
    })

    return (
        <div className={"search_body"}>
            <div className={"search_slider_block"}>
                <div className={"search_nav"}>
                    <Link to={`../`}>
                        <a>Главная/</a>
                    </Link>
                    <Link to={'/mangas/getall'}>
                        <a>Манги</a>
                    </Link>
                </div>
                <form className={"search_form"}>
                    <input type={"text"} placeholder={"Поиск"} className={"search_input"}
                           value={search_input}
                           onChange={(event) => set_search_input(event.target.value)}/>
                </form>

                <div className={'search_filter'}>
                    <ReactSlider
                        value={[minPrice, maxPrice]}
                        min={minrice} max={maxrice}
                        trackClassName="tracker"
                        minDistance={10}
                        step={10}
                        withTracks={true}
                        pearling={true}
                        renderThumb={(props) => {
                            return <div {...props} className="thumb"></div>;
                        }}
                        renderTrack={(props) => {
                            return <div {...props} className="track"></div>;
                        }}
                        onChange={([minPrice, maxPrice]) => {
                            setMinPrice(minPrice);
                            setMaxPrice(maxPrice);
                            const response = fetch(`http://127.0.0.1:8000/manga/?name=${search_input}&price_min=${minPrice}&price_max=${maxPrice}`)
                                .then(response => response.json())
                                .then(data => {
                                    setMangas(data);
                                })
                        }}
                    />
                    <div className={'values-wrapper'}>
                        <p>
                            Min:
                            <span> {minPrice} руб.</span>
                        </p>
                        <p>
                            Max:
                            <span> {maxPrice} руб.</span>
                        </p>
                    </div>
                </div>
                <p></p>
            </div>
            <div className="search_row">
                {filteredMangas.map(manga=>(
                    <div key = {manga.id} className="search_block">
                        <div >
                            <Link to={`/mangas/getbyid/${manga.id}`}>
                                <img className="search_image" src={`${manga.image}`} />
                            </Link>
                        </div>
                        <Link className="search_link" to={`/mangas/getbyid/${manga.id}`}>{manga.title} | {Number(manga.price)} ₽</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;