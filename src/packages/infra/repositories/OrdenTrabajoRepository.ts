import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { BaseRepository } from './BaseRepository';
import { OrdenTrabajo, OrdenTrabajoCreate, EstadoOT } from '../../domain/entities/OrdenTrabajo';
import { LineaServicio, LineaServicioCreate } from '../../domain/entities/LineaServicio';
import { LineaRepuesto, LineaRepuestoCreate } from '../../domain/entities/LineaRepuesto';

export class OrdenTrabajoRepository extends BaseRepository<OrdenTrabajo> {
  protected tableName = 'ordenes_trabajo';
  private lineasServicioStore = localforage.createInstance({
    name: 'MotorcycleWorkshop',
    storeName: 'lineas_servicio'
  });
  private lineasRepuestoStore = localforage.createInstance({
    name: 'MotorcycleWorkshop',
    storeName: 'lineas_repuesto'
  });

  constructor() {
    super();
    localforage.config({
      name: 'MotorcycleWorkshop',
      storeName: this.tableName
    });
  }

  async create(ordenData: OrdenTrabajoCreate): Promise<OrdenTrabajo> {
    // Generar ID único para la orden
    const currentYear = new Date().getFullYear();
    const ordersCount = (await this.getAll()).length + 1;
    const otId = `OT-${currentYear}-${ordersCount.toString().padStart(3, '0')}`;
    
    const orden: OrdenTrabajo = {
      ...ordenData,
      id: otId,
      fechaIngreso: new Date(),
      estado: 'Recepción',
      fotosUrl: [],
    };

    await localforage.setItem(orden.id, orden);
    return orden;
  }

  async update(id: string, ordenData: Partial<OrdenTrabajo>): Promise<OrdenTrabajo> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Orden de trabajo no encontrada');
    }

    const updated = { ...existing, ...ordenData };
    await localforage.setItem(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    await localforage.removeItem(id);
  }

  async getById(id: string): Promise<OrdenTrabajo | null> {
    return await localforage.getItem<OrdenTrabajo>(id);
  }

  async getAll(): Promise<OrdenTrabajo[]> {
    const ordenes: OrdenTrabajo[] = [];
    await localforage.iterate<OrdenTrabajo, void>((value) => {
      ordenes.push(value);
    });
    return ordenes.sort((a, b) => b.fechaIngreso.getTime() - a.fechaIngreso.getTime());
  }

  async porEstado(estado: EstadoOT): Promise<OrdenTrabajo[]> {
    const ordenes = await this.getAll();
    return ordenes.filter(o => o.estado === estado);
  }

  async getByVehiculo(vehiculoId: string): Promise<OrdenTrabajo[]> {
    const ordenes = await this.getAll();
    return ordenes.filter(o => o.vehiculoId === vehiculoId);
  }

  async addLineaServicio(otId: string, lineaData: LineaServicioCreate): Promise<LineaServicio> {
    const linea: LineaServicio = {
      ...lineaData,
      id: uuidv4(),
      otId,
    };

    await this.lineasServicioStore.setItem(linea.id, linea);
    return linea;
  }

  async addLineaRepuesto(otId: string, lineaData: LineaRepuestoCreate): Promise<LineaRepuesto> {
    const linea: LineaRepuesto = {
      ...lineaData,
      id: uuidv4(),
      otId,
      importe: lineaData.cantidad * lineaData.precioUnit,
    };

    await this.lineasRepuestoStore.setItem(linea.id, linea);
    return linea;
  }

  async getLineasServicio(otId: string): Promise<LineaServicio[]> {
    const lineas: LineaServicio[] = [];
    await this.lineasServicioStore.iterate<LineaServicio, void>((value) => {
      if (value.otId === otId) {
        lineas.push(value);
      }
    });
    return lineas;
  }

  async getLineasRepuesto(otId: string): Promise<LineaRepuesto[]> {
    const lineas: LineaRepuesto[] = [];
    await this.lineasRepuestoStore.iterate<LineaRepuesto, void>((value) => {
      if (value.otId === otId) {
        lineas.push(value);
      }
    });
    return lineas;
  }
}