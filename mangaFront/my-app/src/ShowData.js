import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const data = [
    'Берсерк',
    'ДжоДжо',
    'Ван-Пис',
    'Бродяга',
    'Монстр',
    'Стальной алхимик',
    'Слэм-данк',
    'Спокойной ночи, Пунпун',
    'Необъятный океан',
    'Сага о Винланде',
]

function ShowData() {

    // В функциональных компонентах для работы с состоянием можно использовать хук useState()
    // Он возвращает кортеж из двух элементов:
    // 1 элемент - объект состояния
    // 2 элемент - метод который позволит нам обновить состояние
    const [randomName, setRandomName] = useState();

    // Кстати, это хороший пример деструктуризации массива в JavaScript
    const [names, setNames] = useState(data);

    const [showNames, setShowNames] = useState(false);

    // В данном хендлере мы изменяем состояние на какое-то конкретное
    const handleShowNames = () =>{
        setShowNames(true)
    }

    // В данном хендлере мы изменяем состояние на какое-то конкретное
    const handleHideNames = () =>{
        setShowNames(false)
    }

    // В данном хендлере мы изменяем состояние в зависимости от его прошлого значения
    const handleSwitch = () =>{
        // метод из useState может принимать как определенное значение, так и метод,
        // принимающий прошлое значение и возвращающий новое
        setShowNames(state => !state)
    }

    // useEffect(()=>{
    //     console.log('Этот код выполняется только на первом рендере компонента')
    //     // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
    //     setNames(names=>[...names, 'Бедный студент'])
    //
    //     return () => {
    //         console.log('Этот код выполняется, когда компонент будет размонтирован')
    //     }
    // },[])

    useEffect(()=>{
        console.log('Этот код выполняется каждый раз, когда изменится состояние showNames ')
        setRandomName(names[Math.floor(Math.random()*names.length)])
    },[showNames])


    return (
        <div>
            <Link to="/">Главная</Link>/<Link to="/random_manga">Случайная манга</Link>
            <h3>Случайное манга из списка: {randomName}</h3>
            {/*Универсальная кнопка*/}
            <button onClick={handleSwitch}>{showNames ? 'Хочу скрыть список манги' :'Хочу увидеть список манги' }</button>

            {/*React отрисует список только если showNames будет равен true, boolean значения игнорируются при отрисовке*/}
            {showNames && <ul>
                {/*Рекомендую почитать про прекрасные встроенные методы массивов в JavaScript    */}
                {names.map((name, index)=>{
                    return (
                        <li key={index}>
                            <span>{name}</span>
                        </li>
                    )
                })}
            </ul>
            }
        </div>
    );
}

export default ShowData;