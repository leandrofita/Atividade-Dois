import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  InputCadastro,
  ButtonCadastro,
  Form,
} from "../../components/Cadastros";
import { API_MATERIA_URL } from "../../constants";
import {useParams} from "react-router-dom";

const CadastarMaterias = () => {
  const MySwal = withReactContent(Swal); // CRIAÇÃO DO ELEMENTO DE MENSAGEM TIPO POP-UP
  const { id } = useParams();

  const valorIncial = id ? "" : null;
  const [titulo, setTitulo] = useState(valorIncial);
  const [professor_nome, setProfessorNome] = useState(valorIncial);

  useEffect(() => {
    getMaterias();
  }, []);

  const getMaterias = () => {
    axios.get(API_MATERIA_URL).then((response) => {
      response.data.forEach((materia) => {
        // eslint-disable-next-line
        if (materia.id == id) {
          setTitulo(materia.titulo);
          setProfessorNome(materia.professor_nome);
        }
      });
    });
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
