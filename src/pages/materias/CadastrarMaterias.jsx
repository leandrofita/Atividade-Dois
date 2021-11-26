import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  InputCadastro,
  ButtonCadastro,
  Form,
} from "../../styles/Cadastros";
import { API_MATERIA_URL } from "../../constants";
import {useParams} from "react-router-dom";
import { MateriaContext } from "../../context";

const CadastarMaterias = () => {
  const MySwal = withReactContent(Swal); // CRIAÇÃO DO ELEMENTO DE MENSAGEM TIPO POP-UP
  const { id } = useParams();
  const {materias, setMaterias} = useContext(MateriaContext);

  const valorIncial = id ? "" : null;
  const [titulo, setTitulo] = useState(valorIncial);
  const [professor_nome, setProfessorNome] = useState(valorIncial);

  useEffect(() => {
    getMaterias();
  }, []);

  const SearchOnMateriasList = (listaMaterias) => {
    listaMaterias.forEach((materia) => {
      if (materia.id == id) {
        setTitulo(materia.titulo);
        setProfessorNome(materia.professor_nome);
      }
    })
  }

  const buscarMateriasNaAPI = () => {
    axios.get(API_MATERIA_URL).then((response) =>{
      setMaterias(response.data)
    })
  }

  const getMaterias = () => {
    if(materias.length > 0) {
      SearchOnMateriasList(materias);
    } else {

      axios.get(API_MATERIA_URL).then((response) => {
        setMaterias(response.data)
        SearchOnMateriasList(response.data);    
      });
    }
  };

  const cadastrarMaterias = () => {
    if (id) {
      axios
        .put(API_MATERIA_URL, {
          id,
          titulo,
          professor_nome,
        })
        .then((response) => {
          if (response.status === 200) {
            buscarMateriasNaAPI();
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    } else {
      axios
        .post(API_MATERIA_URL, {
          titulo,
          professor_nome,
        })
        .then((response) => {
          if (response.status === 201) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .catch((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    }
  };

  const limparCampos = () => {
    setTitulo("");
    setProfessorNome("");
  };

  return (
    <Form>
      <InputCadastro
        label="Título"
        variant="outlined"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <InputCadastro
        label="Nome do Professor"
        variant="outlined"
        value={professor_nome}
        onChange={(e) => setProfessorNome(e.target.value)}
      />
      ;
      <ButtonCadastro variant="contained" onClick={cadastrarMaterias}>
      {id ? 'Editar' : 'Cadastrar'}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastarMaterias;
