import { createContext, useState } from "react";

export const AlunoContext = createContext();
export const AlunoProvider = ({children}) => {
  const [alunos, setAlunos] = useState([]); // informa o valor inicial do estado;

  return (
    <AlunoContext.Provider
      value={{
        alunos,
        setAlunos,
      }}
    >
      {children}
    </AlunoContext.Provider>
  );
};

export const MateriaContext = createContext();
export const MateriaProvider = ({children}) => {
  const [materias, setMaterias] = useState([]);

  return (
    <MateriaProvider
      value={{
        materias,
        setMaterias,
      }}
      >
        {children}
    </MateriaProvider>
  )
}