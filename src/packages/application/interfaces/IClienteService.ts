import { Cliente, ClienteCreate, ClienteUpdate } from '../../domain/entities/Cliente';

export interface IClienteService {
  create(cliente: ClienteCreate): Promise<Cliente>;
  update(id: string, cliente: ClienteUpdate): Promise<Cliente>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Cliente | null>;
  searchByDocOrName(query: string): Promise<Cliente[]>;
  getAll(): Promise<Cliente[]>;
}