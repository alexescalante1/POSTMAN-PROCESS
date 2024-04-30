import React, { createContext, useReducer, useContext } from 'react';

// Definir el contexto global
const GlobalContext = createContext();

// Reductor para manejar las acciones y el estado global
const globalReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Proveedor del contexto que contendrá el estado y las funciones para actualizarlo
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {}); // Estado global vacío por defecto

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook personalizado para consumir el contexto en componentes hijos
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext debe ser usado dentro de un GlobalProvider');
  }
  return context;
};
