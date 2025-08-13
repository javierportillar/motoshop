import localforage from 'localforage';
import { 
  seedClientes, 
  seedVehiculos, 
  seedInventario, 
  seedOrdenes,
  seedLineasServicio,
  seedLineasRepuesto,
  seedRecordatorios 
} from '../data/seedData';

export async function initializeDatabase() {
  try {
    // Verificar si ya existe data
    const clientesStore = localforage.createInstance({
      name: 'MotorcycleWorkshop',
      storeName: 'clientes'
    });

    const existingClientes = await clientesStore.length();
    
    if (existingClientes === 0) {
      console.log('Inicializando base de datos con datos de prueba...');
      
      // Seed clientes
      for (const cliente of seedClientes) {
        await clientesStore.setItem(cliente.id, cliente);
      }

      // Seed vehículos
      const vehiculosStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'vehiculos'
      });

      for (const vehiculo of seedVehiculos) {
        await vehiculosStore.setItem(vehiculo.id, vehiculo);
      }

      // Seed inventario
      const inventarioStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'inventario'
      });

      for (const item of seedInventario) {
        await inventarioStore.setItem(item.id, item);
      }

      // Seed órdenes de trabajo
      const ordenesStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'ordenes_trabajo'
      });

      for (const orden of seedOrdenes) {
        await ordenesStore.setItem(orden.id, orden);
      }

      // Seed líneas de servicio
      const lineasServicioStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'lineas_servicio'
      });

      for (const linea of seedLineasServicio) {
        await lineasServicioStore.setItem(linea.id, linea);
      }

      // Seed líneas de repuesto
      const lineasRepuestoStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'lineas_repuesto'
      });

      for (const linea of seedLineasRepuesto) {
        await lineasRepuestoStore.setItem(linea.id, linea);
      }

      // Seed recordatorios
      const recordatoriosStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'recordatorios'
      });

      for (const recordatorio of seedRecordatorios) {
        await recordatoriosStore.setItem(recordatorio.id, recordatorio);
      }

      console.log('Base de datos inicializada correctamente');
    }
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
  }
}