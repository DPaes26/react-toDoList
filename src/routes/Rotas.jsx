import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../assets/pages/Login";
import Cadastro from "../assets/pages/Cadastro";
import NotFound from "../assets/pages/NotFound";
import Tarefas from "../assets/pages/Tarefas";

const Rotas = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/cadastro" element={<Cadastro />}/>
                <Route path="/*" element={<Tarefas />}/>
                <Route path="/*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default Rotas;