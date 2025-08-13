import { z } from 'zod';

export const TipoDocumentoSchema = z.enum(['CC', 'NIT', 'CE', 'PP']);
export type TipoDocumento = z.infer<typeof TipoDocumentoSchema>;

export const ClienteSchema = z.object({
  id: z.string().uuid(),
  tipoDoc: TipoDocumentoSchema,
  numeroDoc: z.string().min(1, 'Número de documento requerido'),
  nombre: z.string().min(1, 'Nombre requerido'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  email: z.string().email('Email inválido').optional(),
  direccion: z.string().optional(),
  consentimientoComunicaciones: z.boolean().default(true),
  fechaRegistro: z.date().default(() => new Date()),
});

export const ClienteCreateSchema = ClienteSchema.omit({ id: true, fechaRegistro: true });
export const ClienteUpdateSchema = ClienteCreateSchema.partial();

export type Cliente = z.infer<typeof ClienteSchema>;
export type ClienteCreate = z.infer<typeof ClienteCreateSchema>;
export type ClienteUpdate = z.infer<typeof ClienteUpdateSchema>;