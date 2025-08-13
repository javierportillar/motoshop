import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { BaseRepository } from './BaseRepository';
import { Vehiculo, VehiculoCreate } from '../../domain/entities/Vehiculo';

export class VehiculoRepository extends BaseRepository<Vehiculo> {
  protected tableName = 'vehiculos';

  constructor() {
    super();
    localforage.config({
      name: 'MotorcycleWorkshop',
      storeName: this.tableName
    });
  }

  async create(vehiculoData: VehiculoCreate): Promise<Vehiculo> {
    const vehiculo: Vehiculo = {
      ...vehiculoData,
      id: uuidv4(),
      fechaRegistro: new Date(),
    };

    await localforage.setItem(vehiculo.id, vehiculo);
    return vehiculo;
  }

  async update(id: string, vehiculoData: Partial<Vehiculo>): Promise<Vehiculo> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Vehículo no encontrado');
    }

    const updated = { ...existing, ...vehiculoData };
    await localforage.setItem(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await localforage.removeItem(id);
  }

  async getById(id: string): Promise<Vehiculo | null> {
    return await localforage.getItem<Vehiculo>(id);
  }

  async getAll(): Promise<Vehiculo[]> {
    const vehiculos: Vehiculo[] = [];
    await localforage.iterate<Vehiculo, void>((value) => {
      vehiculos.push(value);
    });
    return vehiculos.sort((a, b) => a.placa.localeCompare(b.placa));
  }

  async getByPlaca(placa: string): Promise<Vehiculo | null> {
    const vehiculos = await this.getAll();
    return vehiculos.find(v => v.placa.toUpperCase() === placa.toUpperCase()) || null;
  }

  async getByCliente(clienteId: string): Promise<Vehiculo[]> {
    const vehiculos = await this.getAll();
    return vehiculos.filter(v => v.clienteId === clienteId);
  }
}