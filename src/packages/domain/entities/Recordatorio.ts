import { z } from 'zod';

export const TipoDisparadorSchema = z.enum(['Fecha', 'Km']);
export const CanalSchema = z.enum(['WhatsApp', 'Email', 'SMS']);
export const EstadoRecordatorioSchema = z.enum(['Pendiente', 'Enviado', 'Hecho', 'Fallido']);

export type TipoDisparador = z.infer<typeof TipoDisparadorSchema>;
export type Canal = z.infer<typeof CanalSchema>;
export type EstadoRecordatorio = z.infer<typeof EstadoRecordatorioSchema>;

export const RecordatorioSchema = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  vehiculoId: z.string().uuid(),
  razon: z.string().min(1, 'Razón requerida'),
  descripcion: z.string().optional(),
  disparador: TipoDisparadorSchema,
  fechaProgramada: z.date().optional(),
  kmProgramado: z.number().int().positive().optional(),
  canal: CanalSchema,
  estado: EstadoRecordatorioSchema.default('Pendiente'),
  resultado: z.string().optional(),
  origenLineaServId: z.string().optional(),
  fechaEnvio: z.date().optional(),
});

export const RecordatorioCreateSchema = RecordatorioSchema.omit({ id: true, estado: true });
export const RecordatorioUpdateSchema = RecordatorioCreateSchema.partial();

export type Recordatorio = z.infer<typeof RecordatorioSchema>;
export type RecordatorioCreate = z.infer<typeof RecordatorioCreateSchema>;
export type RecordatorioUpdate = z.infer<typeof RecordatorioUpdateSchema>;