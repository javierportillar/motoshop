import { z } from 'zod';

export const InventarioSchema = z.object({
  id: z.string().uuid(),
  sku: z.string().min(1, 'SKU requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  categoriaProducto: z.string().min(1, 'Categoría requerida'),
  stock: z.number().int().min(0).default(0),
  stockMin: z.number().int().min(0).default(0),
  costoProm: z.number().min(0).default(0),
  precioVenta: z.number().min(0).default(0),
  proveedor: z.string().optional(),
  ubicacion: z.string().optional(),
  activo: z.boolean().default(true),
});

export const InventarioCreateSchema = InventarioSchema.omit({ id: true });
export const InventarioUpdateSchema = InventarioCreateSchema.partial();

export type Inventario = z.infer<typeof InventarioSchema>;
export type InventarioCreate = z.infer<typeof InventarioCreateSchema>;
export type InventarioUpdate = z.infer<typeof InventarioUpdateSchema>;