import { z } from 'zod';

export const TipoMotivoSchema = z.enum(['Preventivo', 'Correctivo', 'Garantía', 'Instalación', 'Diagnóstico']);
export const CategoriaServicioSchema = z.enum([
  'Motor',
  'Transmisión',
  'Frenos',
  'Suspensión',
  'Eléctrico',
  'Llantas',
  'Carrocería',
  'RevisionGeneral',
  'PreViaje'
]);

export type TipoMotivo = z.infer<typeof TipoMotivoSchema>;
export type CategoriaServicio = z.infer<typeof CategoriaServicioSchema>;

export const LineaServicioSchema = z.object({
  id: z.string().uuid(),
  otId: z.string().uuid(),
  tipoMotivo: TipoMotivoSchema,
  categoria: CategoriaServicioSchema,
  descripcion: z.string().min(1, 'Descripción requerida'),
  tiempoMin: z.number().int().min(0).default(0),
  precioManoObra: z.number().min(0).default(0),
  intervaloKm: z.number().int().positive().optional(),
  intervaloMeses: z.number().int().positive().optional(),
  proximaFechaSugerida: z.date().optional(),
  proximoKmSugerido: z.number().int().positive().optional(),
  aprobado: z.boolean().default(false),
  tecnicoAsignado: z.string().optional(),
});

export const LineaServicioCreateSchema = LineaServicioSchema.omit({ id: true });
export const LineaServicioUpdateSchema = LineaServicioCreateSchema.partial();

export type LineaServicio = z.infer<typeof LineaServicioSchema>;
export type LineaServicioCreate = z.infer<typeof LineaServicioCreateSchema>;
export type LineaServicioUpdate = z.infer<typeof LineaServicioUpdateSchema>;