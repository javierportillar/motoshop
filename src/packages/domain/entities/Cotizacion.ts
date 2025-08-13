import { z } from 'zod';

export const EstadoCotizacionSchema = z.enum(['Enviada', 'Aprobada', 'Rechazada', 'Vencida']);
export const MedioEnvioSchema = z.enum(['WhatsApp', 'Email', 'SMS']);

export type EstadoCotizacion = z.infer<typeof EstadoCotizacionSchema>;
export type MedioEnvio = z.infer<typeof MedioEnvioSchema>;

export const CotizacionSchema = z.object({
  id: z.string().uuid(),
  otId: z.string().uuid(),
  fechaEnvio: z.date().default(() => new Date()),
  estado: EstadoCotizacionSchema.default('Enviada'),
  subtotalManoObra: z.number().min(0).default(0),
  subtotalRepuestos: z.number().min(0).default(0),
  descuentos: z.number().min(0).default(0),
  impuestos: z.number().min(0).default(0),
  total: z.number().min(0).default(0),
  medioEnvio: MedioEnvioSchema,
  evidenciaAprobacion: z.string().optional(),
});

export const CotizacionCreateSchema = CotizacionSchema.omit({ 
  id: true, 
  fechaEnvio: true,
  estado: true,
  subtotalManoObra: true,
  subtotalRepuestos: true,
  total: true
});

export type Cotizacion = z.infer<typeof CotizacionSchema>;
export type CotizacionCreate = z.infer<typeof CotizacionCreateSchema>;