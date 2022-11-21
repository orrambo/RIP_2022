import {BrowserRouter, Route, Switch} from "react-router-dom";
import MangaPage from "./pages/MangaPage";
import ShowCommands from "./pages/ShowCommands";
import StartPage from "./pages/StartPage";
import React from "react";
import AllMangasPage from "./pages/AllMangasPage";
import './App.css'
import { MangasProvider } from "./contexts";

function App() {

    return (
        <BrowserRouter basename="/" >
            <Switch>
                <Route exact path="/">
                    <StartPage></StartPage>
                </Route>
                <Route path="/commands">
                    <ShowCommands></ShowCommands>
                </Route>
                <Route path="/mangas/getall">
                    <MangasProvider>
                        <AllMangasPage />
                    </MangasProvider>
                </Route>
                <Route path="/mangas/getbyid/:id">
                    <MangasProvider>
                        <MangaPage />
                    </MangasProvider>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;