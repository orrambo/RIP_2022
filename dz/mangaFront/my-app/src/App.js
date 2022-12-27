import {BrowserRouter, Route, Switch} from "react-router-dom";
import MangaPage from "./pages/MangaPage";
import StartPage from "./pages/StartPage";
import React from "react";
import './App.css'
import { MangasProvider } from "./contexts";
import Navigation from "./pages/Navigation";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import {LoginPage} from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PurchasePage from "./pages/PurchasePage";
import ManagerPurchasePage from "./pages/ManagerPurchasePage";

function App() {

    return (
        <BrowserRouter basename="/" >
            <Route>
                <Route exact path="/">
                    <Navigation/>
                    <StartPage></StartPage>
                </Route>
                <Route path="/login">
                    <Navigation/>
                    <LoginPage/>
                </Route>
                <Route path="/purchases">
                    <Navigation/>
                    <PurchasePage/>
                </Route>
                <Route path="/manager_purchases">
                    <Navigation/>
                    <ManagerPurchasePage/>
                </Route>
                <Route path="/registration">
                    <Navigation/>
                    <RegistrationPage/>
                </Route>
                <Route path="/mangas/cart">
                    <Navigation/>
                    <CartPage/>
                </Route>
                <Route path="/mangas/getall">
                    <MangasProvider>
                        <Navigation/>
                        <SearchPage/>
                    </MangasProvider>
                </Route>
                <Route path="/mangas/getbyid/:id">
                    <MangasProvider>
                        <Navigation/>
                        <MangaPage />
                    </MangasProvider>
                </Route>
            </Route>
        </BrowserRouter>
    );
}

export default App;