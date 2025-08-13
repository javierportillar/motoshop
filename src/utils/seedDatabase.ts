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
        // Convertir fechas a objetos Date si vienen como strings
        const clienteWithDates = {
          ...cliente,
          fechaRegistro: new Date(cliente.fechaRegistro),
        };
        await clientesStore.setItem(cliente.id, clienteWithDates);
      }

      // Seed vehículos
      const vehiculosStore = localforage.createInstance({
        name: 'MotorcycleWorkshop',
        storeName: 'vehiculos'
      });

      for (const vehiculo of seedVehiculos) {
        // Convertir fechas a objetos Date si vienen como strings
        const vehiculoWithDates = {
          ...vehiculo,
          fechaRegistro: new Date(vehiculo.fechaRegistro),
          soatVence: vehiculo.soatVence ? new Date(vehiculo.soatVence) : undefined,
          tecnomecanicaVence: vehiculo.tecnomecanicaVence ? new Date(vehiculo.tecnomecanicaVence) : undefined,
        };
        await vehiculosStore.setItem(vehiculo.id, vehiculoWithDates);
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
        // Convertir fechas a objetos Date si vienen como strings
        const ordenWithDates = {
          ...orden,
          fechaIngreso: new Date(orden.fechaIngreso),
          fechaEstimadaEntrega: orden.fechaEstimadaEntrega ? new Date(orden.fechaEstimadaEntrega) : undefined,
          fechaEntregaReal: orden.fechaEntregaReal ? new Date(orden.fechaEntregaReal) : undefined,
        };
        await ordenesStore.setItem(orden.id, ordenWithDates);
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
        // Convertir fechas a objetos Date si vienen como strings
        const recordatorioWithDates = {
          ...recordatorio,
          fechaProgramada: recordatorio.fechaProgramada ? new Date(recordatorio.fechaProgramada) : undefined,
          fechaEnvio: recordatorio.fechaEnvio ? new Date(recordatorio.fechaEnvio) : undefined,
        };
        await recordatoriosStore.setItem(recordatorio.id, recordatorioWithDates);
      }

      console.log('Base de datos inicializada correctamente');
    }
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
  }
}