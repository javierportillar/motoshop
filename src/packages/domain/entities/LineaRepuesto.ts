import { z } from 'zod';

export const LineaRepuestoSchema = z.object({
  id: z.string().uuid(),
  otId: z.string().uuid(),
  sku: z.string().min(1, 'SKU requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  cantidad: z.number().int().min(1, 'Cantidad debe ser mayor a 0'),
  costoUnit: z.number().min(0).default(0),
  precioUnit: z.number().min(0),
  importe: z.number().min(0),
  almacen: z.string().optional(),
  loteSerie: z.string().optional(),
  aprobado: z.boolean().default(false),
});

export const LineaRepuestoCreateSchema = LineaRepuestoSchema.omit({ id: true, importe: true });
export const LineaRepuestoUpdateSchema = LineaRepuestoCreateSchema.partial();

export type LineaRepuesto = z.infer<typeof LineaRepuestoSchema>;
export type LineaRepuestoCreate = z.infer<typeof LineaRepuestoCreateSchema>;
export type LineaRepuestoUpdate = z.infer<typeof LineaRepuestoUpdateSchema>;