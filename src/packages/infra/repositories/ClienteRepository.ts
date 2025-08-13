import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { BaseRepository } from './BaseRepository';
import { Cliente, ClienteCreate } from '../../domain/entities/Cliente';

export class ClienteRepository extends BaseRepository<Cliente> {
  protected tableName = 'clientes';

  constructor() {
    super();
    localforage.config({
      name: 'MotorcycleWorkshop',
      storeName: this.tableName
    });
  }

  async create(clienteData: ClienteCreate): Promise<Cliente> {
    const cliente: Cliente = {
      ...clienteData,
      id: uuidv4(),
      fechaRegistro: new Date(),
    };

    await localforage.setItem(cliente.id, cliente);
    return cliente;
  }

  async update(id: string, clienteData: Partial<Cliente>): Promise<Cliente> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Cliente no encontrado');
    }

    const updated = { ...existing, ...clienteData };
    await localforage.setItem(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await localforage.removeItem(id);
  }

  async getById(id: string): Promise<Cliente | null> {
    return await localforage.getItem<Cliente>(id);
  }

  async getAll(): Promise<Cliente[]> {
    const clientes: Cliente[] = [];
    await localforage.iterate<Cliente, void>((value) => {
      clientes.push(value);
    });
    return clientes.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  async searchByDocOrName(query: string): Promise<Cliente[]> {
    const clientes = await this.getAll();
    const searchTerm = query.toLowerCase();
    
    return clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(searchTerm) ||
      cliente.numeroDoc.includes(searchTerm)
    );
  }
}