import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cliente } from '../packages/domain/entities/Cliente';
import { Vehiculo } from '../packages/domain/entities/Vehiculo';
import { OrdenTrabajo } from '../packages/domain/entities/OrdenTrabajo';

interface AppState {
  clientes: Cliente[];
  vehiculos: Vehiculo[];
  ordenes: OrdenTrabajo[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CLIENTES'; payload: Cliente[] }
  | { type: 'SET_VEHICULOS'; payload: Vehiculo[] }
  | { type: 'SET_ORDENES'; payload: OrdenTrabajo[] }
  | { type: 'ADD_CLIENTE'; payload: Cliente }
  | { type: 'UPDATE_CLIENTE'; payload: Cliente }
  | { type: 'DELETE_CLIENTE'; payload: string };

const initialState: AppState = {
  clientes: [],
  vehiculos: [],
  ordenes: [],
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CLIENTES':
      return { ...state, clientes: action.payload };
    case 'SET_VEHICULOS':
      return { ...state, vehiculos: action.payload };
    case 'SET_ORDENES':
      return { ...state, ordenes: action.payload };
    case 'ADD_CLIENTE':
      return { ...state, clientes: [...state.clientes, action.payload] };
    case 'UPDATE_CLIENTE':
      return {
        ...state,
        clientes: state.clientes.map(c => 
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case 'DELETE_CLIENTE':
      return {
        ...state,
        clientes: state.clientes.filter(c => c.id !== action.payload),
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}