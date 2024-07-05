import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../pages/Menu/index.tsx";
import Contact from "../pages/Contact/index.tsx";
import Header from "../Header.tsx";
import { Fragment } from "react";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Header />
            <Fragment>
                <Routes>
                    <Route path="/Menu" element={<Menu />} />
                    <Route path="/" element={<Menu />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="*" element={<Menu />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}
