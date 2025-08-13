import { OrdenTrabajo, OrdenTrabajoCreate, OrdenTrabajoUpdate, EstadoOT } from '../../domain/entities/OrdenTrabajo';
import { LineaServicio, LineaServicioCreate } from '../../domain/entities/LineaServicio';
import { LineaRepuesto, LineaRepuestoCreate } from '../../domain/entities/LineaRepuesto';

export interface IOrdenTrabajoService {
  create(orden: OrdenTrabajoCreate): Promise<OrdenTrabajo>;
  update(id: string, orden: OrdenTrabajoUpdate): Promise<OrdenTrabajo>;
  getById(id: string): Promise<OrdenTrabajo | null>;
  addLineaServicio(otId: string, linea: LineaServicioCreate): Promise<LineaServicio>;
  addLineaRepuesto(otId: string, linea: LineaRepuestoCreate): Promise<LineaRepuesto>;
  cambiarEstado(id: string, estado: EstadoOT): Promise<void>;
  listar(): Promise<OrdenTrabajo[]>;
  porEstado(estado: EstadoOT): Promise<OrdenTrabajo[]>;
  getByVehiculo(vehiculoId: string): Promise<OrdenTrabajo[]>;
  getLineasServicio(otId: string): Promise<LineaServicio[]>;
  getLineasRepuesto(otId: string): Promise<LineaRepuesto[]>;
}