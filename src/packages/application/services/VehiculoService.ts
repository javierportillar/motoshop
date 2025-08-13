import { IVehiculoService } from '../interfaces/IVehiculoService';
import { VehiculoRepository } from '../../infra/repositories/VehiculoRepository';
import { Vehiculo, VehiculoCreate, VehiculoUpdate, VehiculoSchema } from '../../domain/entities/Vehiculo';

export class VehiculoService implements IVehiculoService {
  constructor(private vehiculoRepo: VehiculoRepository) {}

  async create(vehiculoData: VehiculoCreate): Promise<Vehiculo> {
    // Verificar que la placa no exista
    const existing = await this.vehiculoRepo.getByPlaca(vehiculoData.placa);
    if (existing) {
      throw new Error('Ya existe un vehículo con esta placa');
    }

    const validatedData = VehiculoSchema.omit({ id: true, fechaRegistro: true }).parse(vehiculoData);
    return await this.vehiculoRepo.create(validatedData);
  }

  async update(id: string, vehiculoData: VehiculoUpdate): Promise<Vehiculo> {
    return await this.vehiculoRepo.update(id, vehiculoData);
  }

  async delete(id: string): Promise<void> {
    await this.vehiculoRepo.delete(id);
  }

  async getById(id: string): Promise<Vehiculo | null> {
    return await this.vehiculoRepo.getById(id);
  }

  async getByPlaca(placa: string): Promise<Vehiculo | null> {
    return await this.vehiculoRepo.getByPlaca(placa);
  }

  async getByCliente(clienteId: string): Promise<Vehiculo[]> {
    return await this.vehiculoRepo.getByCliente(clienteId);
  }

  async setKm(id: string, km: number): Promise<void> {
    await this.vehiculoRepo.update(id, { kmActual: km });
  }

  async getAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepo.getAll();
  }
}