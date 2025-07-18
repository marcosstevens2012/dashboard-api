import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario administrador
  const hashedPassword = await bcrypt.hash('dashboard123', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('✅ Usuario admin creado');

  // Crear algunos vehículos de ejemplo
  const vehicle1 = await prisma.vehicle.create({
    data: {
      nombre: 'Corolla XEI',
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2023,
      precio: 25000,
      descripcion:
        'Vehículo en excelente estado, con mantenimiento al día. Ideal para familia.',
      destacado: true,
      kilometraje: '15000',
      combustible: 'Nafta',
      cilindrada: '2.0',
      potencia: '177 CV',
      alimentacion: 'Inyección Electrónica',
      cilindros: 4,
      valvulas: 16,
      traccion: '4X2',
      transmision: 'CVT',
      velocidades: 'Automática CVT',
      neumaticos: 'R16',
      frenosDelanteros: 'Discos ventilados',
      frenosTraseros: 'Discos sólidos',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      tapizados: 'Tela',
      cierrePuertas: 'Centralizado con mando a distancia',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Delanteros y traseros',
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 7,
      equipoMusica: 'AM-FM-CD-MP3-USB',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      pantalla: true,
      sistemaNavegacionGPS: false,
      appleCarPlay: true,
      mirrorlink: true,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      nombre: 'Civic Si',
      marca: 'Honda',
      modelo: 'Civic',
      anio: 2022,
      precio: 28000,
      descripcion: 'Deportivo y elegante, con tecnología de última generación.',
      destacado: false,
      kilometraje: '8500',
      combustible: 'Nafta',
      cilindrada: '1.5',
      potencia: '174 CV',
      alimentacion: 'Inyección Directa Turbo',
      cilindros: 4,
      valvulas: 16,
      traccion: '4X2',
      transmision: 'Manual',
      velocidades: 'Caja de Sexta',
      neumaticos: 'R18',
      frenosDelanteros: 'Discos ventilados',
      frenosTraseros: 'Discos sólidos',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Eléctrica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      tapizados: 'Cuero y tela',
      cierrePuertas: 'Centralizado con mando a distancia',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Delanteros y traseros',
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 6,
      equipoMusica: 'AM-FM-CD-MP3-USB',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: true,
      appleCarPlay: true,
      mirrorlink: true,
    },
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      nombre: 'Hilux SRV',
      marca: 'Toyota',
      modelo: 'Hilux',
      anio: 2024,
      precio: 45000,
      descripcion:
        'Pickup robusta y confiable, perfecta para trabajo y aventura.',
      destacado: true,
      kilometraje: '2500',
      combustible: 'Diesel',
      cilindrada: '2.8',
      potencia: '204 CV',
      alimentacion: 'Inyección Directa Turbo',
      cilindros: 4,
      valvulas: 16,
      traccion: '4X4',
      transmision: 'Automática',
      velocidades: 'Automática de 6 velocidades',
      neumaticos: 'R17',
      frenosDelanteros: 'Discos ventilados',
      frenosTraseros: 'Discos sólidos',
      direccionAsistida: true,
      direccionAsistidaTipo: 'Hidráulica',
      aireAcondicionado: true,
      asientoDelanteroAjuste: true,
      volanteRegulable: true,
      asientosTraseros: 'Abatibles completamente',
      tapizados: 'Cuero',
      cierrePuertas: 'Centralizado con mando a distancia',
      vidriosDelanteros: 'Eléctricos',
      vidriosTraseros: 'Eléctricos',
      espejosExteriores: 'Eléctricos',
      farosAntiniebla: true,
      computadoraBordo: true,
      llantasAleacion: true,
      camaraEstacionamiento: true,
      asistenciaArranquePendientes: true,
      controlEconomiaCombustible: true,
      luzDiurna: true,
      abs: true,
      distribucionElectronicaFrenado: true,
      asistenciaFrenadaEmergencia: true,
      airbagsDelanteros: true,
      airbagsCortina: 'Delanteros y traseros',
      airbagRodillaConductor: true,
      airbagsLaterales: 'Delanteros',
      alarma: true,
      inmovilizadorMotor: true,
      anclajeAsientosInfantiles: true,
      autobloqueoPuertas: true,
      controlEstabilidad: true,
      controlTraccion: true,
      cantidadAirbags: 7,
      equipoMusica: 'AM-FM-CD-MP3-USB',
      comandosVolante: true,
      conexionAuxiliar: true,
      conexionUSB: true,
      interfazBluetooth: true,
      controlVozDispositivos: true,
      pantalla: true,
      sistemaNavegacionGPS: true,
      appleCarPlay: false,
      mirrorlink: false,
    },
  });

  // Crear algunas imágenes de ejemplo
  await prisma.image.createMany({
    data: [
      {
        url: '/uploads/example-1.jpg',
        vehicleId: vehicle1.id,
      },
      {
        url: '/uploads/example-2.jpg',
        vehicleId: vehicle1.id,
      },
      {
        url: '/uploads/example-3.jpg',
        vehicleId: vehicle2.id,
      },
      {
        url: '/uploads/example-4.jpg',
        vehicleId: vehicle3.id,
      },
    ],
  });

  // Crear algunos contactos de ejemplo
  await prisma.contact.createMany({
    data: [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        ciudad: 'Buenos Aires',
        provincia: 'Buenos Aires',
        telefono: '+54 11 1234-5678',
        email: 'juan.perez@example.com',
        mensaje: 'Estoy interesado en el Toyota Corolla. ¿Podrían contactarme?',
      },
      {
        nombre: 'María',
        apellido: 'González',
        ciudad: 'Córdoba',
        provincia: 'Córdoba',
        telefono: '+54 351 987-6543',
        email: 'maria.gonzalez@example.com',
        mensaje: 'Me gustaría agendar una cita para ver la Hilux.',
      },
      {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        ciudad: 'Rosario',
        provincia: 'Santa Fe',
        telefono: '+54 341 555-0123',
        email: 'carlos.rodriguez@example.com',
        mensaje: '¿Tienen financiamiento disponible para el Honda Civic?',
      },
    ],
  });

  console.log('🌱 Datos de prueba creados exitosamente!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
