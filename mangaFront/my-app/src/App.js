import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import ShowData from "./ShowData";
import Count from "./Counter";
import Manga from "./Manga";
import {manga_data} from  "./MangaDict";
import { MangaList } from "./MangaList";


function App() {

    return (
        <BrowserRouter basename="/" >
            <div>
                <ul>
                    <li>
                        <Link to="/">Каталог Манги</Link>
                    </li>
                    <li>
                        <Link to="/random_manga">Случайная манга</Link>
                    </li>
                    <li>
                        <Link to="/click">Кликер</Link>
                    </li>
                </ul>
                <hr/>
                <Switch>
                    <Route exact path="/">
                        <Manga></Manga>
                    </Route>
                    <Route path="/random_manga">
                        <ShowData></ShowData>
                    </Route>
                    <Route path="/click">
                        <Count></Count>
                    </Route>
                    <Route path="/:id">
                        <MangaList mangas={manga_data}></MangaList>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;