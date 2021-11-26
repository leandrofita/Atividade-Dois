import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export default function NavBar() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/home-page">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              Home
            </IconButton>
          </Link>
          <Link to="/alunos">
            <Button color="inherit">Alunos</Button>
          </Link>
          <Link to="/cadastrar-alunos">
            <Button color="inherit">Cadastro de Aluno</Button>
          </Link>
          <Link to="/materias">
            <Button color="inherit">Matérias</Button>
          </Link>
          <Link to="/cadastrar-materias">
            <Button color="inherit">Cadastrar Matérias</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
