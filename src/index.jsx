import React, {useContext} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import AlunosListagem from "./pages/alunos/AlunosListagem";
import NavBar from "./components/navBar";
import Container from "@mui/material/Container";
import CadastrarAlunos from "./pages/alunos/CadastrarAlunos";
import MateriasListagem from "./pages/materias/MateriaLista";
import CadastrarMaterias from "./pages/materias/CadastrarMaterias.jsx";
import HomePage from "./pages/home-page";
import { AlunoProvider, MateriaProvider } from "./context";


const Routes = () => {
  const routes = useRoutes([
    { path: "/home-page", element: <HomePage /> },
    { path: "/alunos", element: <AlunosListagem /> },
    { path: "/cadastrar-alunos", element: <CadastrarAlunos /> },
    { path: "/editar-alunos/:id", element: <CadastrarAlunos /> },
    { path: "/materias", element: <MateriasListagem /> },
    { path: "/cadastrar-materias", element: <CadastrarMaterias /> },
    { path: "/editar-materias/:id", element: <CadastrarMaterias /> },
  ]);

  return routes;
};

ReactDOM.render(
  
  <MateriaProvider>
    <AlunoProvider>
      <React.StrictMode>
        <BrowserRouter>
          <NavBar />
          <Container maxWidth="md">
            <Routes />
          </Container>
        </BrowserRouter>
      </React.StrictMode>
    </AlunoProvider>
  </MateriaProvider>,
  document.getElementById("root")
);
