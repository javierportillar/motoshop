import { IOrdenTrabajoService } from '../interfaces/IOrdenTrabajoService';
import { OrdenTrabajoRepository } from '../../infra/repositories/OrdenTrabajoRepository';
import { OrdenTrabajo, OrdenTrabajoCreate, OrdenTrabajoUpdate, EstadoOT, OrdenTrabajoSchema } from '../../domain/entities/OrdenTrabajo';
import { LineaServicio, LineaServicioCreate, LineaServicioSchema } from '../../domain/entities/LineaServicio';
import { LineaRepuesto, LineaRepuestoCreate, LineaRepuestoSchema } from '../../domain/entities/LineaRepuesto';

export class OrdenTrabajoService implements IOrdenTrabajoService {
  constructor(private otRepo: OrdenTrabajoRepository) {}

  async create(ordenData: OrdenTrabajoCreate): Promise<OrdenTrabajo> {
    const validatedData = OrdenTrabajoSchema.omit({ 
      id: true, 
      fechaIngreso: true,
      estado: true,
      fotosUrl: true 
    }).parse(ordenData);
    
    return await this.otRepo.create(validatedData);
  }

  async update(id: string, ordenData: OrdenTrabajoUpdate): Promise<OrdenTrabajo> {
    return await this.otRepo.update(id, ordenData);
  }

  async getById(id: string): Promise<OrdenTrabajo | null> {
    return await this.otRepo.getById(id);
  }

  async addLineaServicio(otId: string, lineaData: LineaServicioCreate): Promise<LineaServicio> {
    const validatedData = LineaServicioSchema.omit({ id: true }).parse(lineaData);
    return await this.otRepo.addLineaServicio(otId, validatedData);
  }

  async addLineaRepuesto(otId: string, lineaData: LineaRepuestoCreate): Promise<LineaRepuesto> {
    const validatedData = LineaRepuestoSchema.omit({ id: true, importe: true }).parse(lineaData);
    return await this.otRepo.addLineaRepuesto(otId, validatedData);
  }

  async cambiarEstado(id: string, estado: EstadoOT): Promise<void> {
    await this.otRepo.update(id, { estado });
  }

  async listar(): Promise<OrdenTrabajo[]> {
    return await this.otRepo.getAll();
  }

  async porEstado(estado: EstadoOT): Promise<OrdenTrabajo[]> {
    return await this.otRepo.porEstado(estado);
  }

  async getByVehiculo(vehiculoId: string): Promise<OrdenTrabajo[]> {
    return await this.otRepo.getByVehiculo(vehiculoId);
  }

  async getLineasServicio(otId: string): Promise<LineaServicio[]> {
    return await this.otRepo.getLineasServicio(otId);
  }

  async getLineasRepuesto(otId: string): Promise<LineaRepuesto[]> {
    return await this.otRepo.getLineasRepuesto(otId);
  }
}