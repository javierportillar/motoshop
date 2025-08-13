import { z } from 'zod';

export const VehiculoSchema = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  placa: z.string().min(1, 'Placa requerida').toUpperCase(),
  vin: z.string().optional(),
  marca: z.string().min(1, 'Marca requerida'),
  lineaModelo: z.string().min(1, 'Línea/Modelo requerido'),
  anio: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  cilindrajeCc: z.number().int().min(1, 'Cilindraje requerido'),
  color: z.string().min(1, 'Color requerido'),
  kmActual: z.number().int().min(0).default(0),
  soatVence: z.date().nullable().optional(),
  tecnomecanicaVence: z.date().nullable().optional(),
  fechaRegistro: z.date().default(() => new Date()),
});

export const VehiculoCreateSchema = VehiculoSchema.omit({ id: true, fechaRegistro: true });
export const VehiculoUpdateSchema = VehiculoCreateSchema.partial();

export type Vehiculo = z.infer<typeof VehiculoSchema>;
export type VehiculoCreate = z.infer<typeof VehiculoCreateSchema>;
export type VehiculoUpdate = z.infer<typeof VehiculoUpdateSchema>;