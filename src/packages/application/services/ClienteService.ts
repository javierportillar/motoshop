import { IClienteService } from '../interfaces/IClienteService';
import { ClienteRepository } from '../../infra/repositories/ClienteRepository';
import { Cliente, ClienteCreate, ClienteUpdate, ClienteSchema } from '../../domain/entities/Cliente';

export class ClienteService implements IClienteService {
  constructor(private clienteRepo: ClienteRepository) {}

  async create(clienteData: ClienteCreate): Promise<Cliente> {
    const validatedData = ClienteSchema.omit({ id: true, fechaRegistro: true }).parse(clienteData);
    return await this.clienteRepo.create(validatedData);
  }

  async update(id: string, clienteData: ClienteUpdate): Promise<Cliente> {
    return await this.clienteRepo.update(id, clienteData);
  }

  async delete(id: string): Promise<void> {
    await this.clienteRepo.delete(id);
  }

  async getById(id: string): Promise<Cliente | null> {
    return await this.clienteRepo.getById(id);
  }

  async searchByDocOrName(query: string): Promise<Cliente[]> {
    return await this.clienteRepo.searchByDocOrName(query);
  }

  async getAll(): Promise<Cliente[]> {
    return await this.clienteRepo.getAll();
  }
}