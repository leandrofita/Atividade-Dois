import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  ButtonCadastro,
  Form,
  InputCadastro,
} from "../../components/Cadastros";
import { API_URL } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";
import { AlunoContext } from "../../context";

const CadastrarAlunos = () => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const { alunos, setAlunos } = useContext(AlunoContext);

  const valorInicial = id ? "" : null;
  const [nome, setNome] = useState(valorInicial);
  const [idade, setIdade] = useState(valorInicial);
  const [cidade, setCidade] = useState(valorInicial);

  useEffect(() => {
    getAlunos();
  }, []);

  const SearchOnAlunosList = (listaAlunos) => {
    listaAlunos.forEach((aluno) => {
      if (aluno.id == id) {
        setNome(aluno.nome);
        setIdade(aluno.idade);
        setCidade(aluno.cidade);
      }
    });
  };

  const getAlunos = () => {
    if (alunos.length > 0) { // Verifica se os alunos já existem na lista
      
      SearchOnAlunosList(alunos);
    } else {
      axios.get(API_URL).then((response) => { // Faz a requisição dos Alunos na API
        setAlunos(response.data); // caso não encontre o aluno na lista, faz a requisição para a API
        SearchOnAlunosList(response.data);
      });
    }
  };

  const buscarAlunosNaAPI = () => { // Método que faz a requisição dos Alunos na API
    axios.get(API_URL).then((response) => {
      setAlunos(response.data);
    });
  };

  const cadastrarAlunos = () => {
    if (id) {
      axios
        .put(API_URL, {
          id,
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          if (response.status === 200) {
            buscarAlunosNaAPI();
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
        .post(API_URL, {
          nome,
          idade,
          cidade,
        })
        .then((response) => {
          if (response.status === 201) {
            MySwal.fire(<p>{response?.data?.message}</p>);
            limparCampos();
          }
        })
        .cath((error) => {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        });
    }
  };

  const limparCampos = () => {
    setNome("");
    setIdade("");
    setCidade("");
  };

  return (
    <Form>
      <InputCadastro
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <InputCadastro
        label="Idade"
        variant="outlined"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <InputCadastro
        label="Cidade"
        variant="outlined"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
      />

      <ButtonCadastro variant="contained" onClick={cadastrarAlunos}>
        {id ? "Editar" : "Cadastrar"}
      </ButtonCadastro>
    </Form>
  );
};

export default CadastrarAlunos;
