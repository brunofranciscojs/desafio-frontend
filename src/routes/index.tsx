import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "../pages/Menu/index.tsx";
import Contact from "../pages/Contact/index.tsx";
import Header from "../Header.tsx";

export default function Rotas(){
    return(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Menu/>}/>
            <Route index path="/Menu" element={<Menu/>}/>
            <Route path="/Contact" element={<Contact/>}/>
        </Routes>
    </BrowserRouter>
    )
}