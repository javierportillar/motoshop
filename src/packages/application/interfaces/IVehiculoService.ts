import { Vehiculo, VehiculoCreate, VehiculoUpdate } from '../../domain/entities/Vehiculo';

export interface IVehiculoService {
  create(vehiculo: VehiculoCreate): Promise<Vehiculo>;
  update(id: string, vehiculo: VehiculoUpdate): Promise<Vehiculo>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Vehiculo | null>;
  getByPlaca(placa: string): Promise<Vehiculo | null>;
  getByCliente(clienteId: string): Promise<Vehiculo[]>;
  setKm(id: string, km: number): Promise<void>;
  getAll(): Promise<Vehiculo[]>;
}