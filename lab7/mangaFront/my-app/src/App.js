import {BrowserRouter, Route, Switch} from "react-router-dom";
import MangaPage from "./pages/MangaPage";
import StartPage from "./pages/StartPage";
import React from "react";
import AllMangasPage from "./pages/AllMangasPage";
import './App.css'
import { MangasProvider } from "./contexts";
import Navigation from "./pages/Navigation";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import {LoginPage} from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {

    return (
        <BrowserRouter basename="/" >
                    <Navigation/>
            <Switch>
                <Route exact path="/">
                    <StartPage></StartPage>
                </Route>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/registration">
                    <RegistrationPage/>
                </Route>
                <Route path="/mangas/cart">
                    <CartPage/>
                </Route>
                <Route path="/mangas/getall">
                    <MangasProvider>
                        <SearchPage/>
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