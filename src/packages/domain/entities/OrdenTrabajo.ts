import { z } from 'zod';

export const EstadoOTSchema = z.enum([
  'Recepción',
  'Diagnóstico', 
  'Cotizado',
  'Aprobado',
  'EnProceso',
  'Pruebas',
  'Listo',
  'Entregado',
  'Cerrado'
]);

export type EstadoOT = z.infer<typeof EstadoOTSchema>;

export const OrdenTrabajoSchema = z.object({
  id: z.string().uuid(),
  vehiculoId: z.string().uuid(),
  fechaIngreso: z.date().default(() => new Date()),
  estado: EstadoOTSchema.default('Recepción'),
  odometroIngreso: z.number().int().min(0),
  nivelCombustible: z.string().min(1, 'Nivel de combustible requerido'),
  observaciones: z.string().optional(),
  fechaEstimadaEntrega: z.date().optional(),
  fechaEntregaReal: z.date().optional(),
  firmaClienteUrl: z.string().optional(),
  fotosUrl: z.array(z.string()).default([]),
});

export const OrdenTrabajoCreateSchema = OrdenTrabajoSchema.omit({ 
  id: true, 
  fechaIngreso: true,
  estado: true,
  fotosUrl: true 
});

export const OrdenTrabajoUpdateSchema = OrdenTrabajoCreateSchema.partial();

export type OrdenTrabajo = z.infer<typeof OrdenTrabajoSchema>;
export type OrdenTrabajoCreate = z.infer<typeof OrdenTrabajoCreateSchema>;
export type OrdenTrabajoUpdate = z.infer<typeof OrdenTrabajoUpdateSchema>;