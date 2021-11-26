import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { StyledTableCell, StyledTableRow } from "./styles";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_MATERIA_URL } from "../../constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { MateriaContext } from "../../context";

const MateriasListagem = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  // const [materias, setMaterias] = useState([]);
  const {materias, setMaterias} = useContext(MateriaContext);

  useEffect(() => {  // construtor vazio da Lista de Materias
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_MATERIA_URL).then((response) => { //O .then serve para fazer uma importação assíncrona da API, ao resolver a requisição do axious ele altera a lista de materias, preenchendo-a
      setMaterias(response.data);
    });
  };

  const deletarMateria = (materia) => {
    axios
      .delete(API_MATERIA_URL, { data: materia })
      .then((response) => {
        MySwal.fire(<p>{response?.data?.message}</p>);
        
        const materiaIndex = materias.findIndex(
          (elemento) => elemento.id === materia.id
        );
        let newMaterias = [ ...materias ];
        newMaterias.splice(materiaIndex, 1);
        setMaterias(newMaterias);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  const editarMateria = (materia) => {
    navigate(`/editar-materias/${materia.id}`);
  };

  return (
    <Box sx={{ marginTop: "25px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell >Título</StyledTableCell>
              <StyledTableCell >Nome do Professor</StyledTableCell>
              <StyledTableCell > Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materias.map((materia) => (
              <StyledTableRow>
                <StyledTableCell>{materia.titulo}</StyledTableCell>
                <StyledTableCell>{materia.professor_nome}</StyledTableCell>
                <StyledTableCell>
                <Button onClick={() => editarMateria(materia)} variant="text">
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deletarMateria(materia)} variant="text">
                    <DeleteIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MateriasListagem;