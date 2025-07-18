import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactsService } from '../contacts/contacts.service';
import { ImagesService } from '../images/images.service';
import {
  CreateVehicleDto,
  HighlightVehicleDto,
  UpdateVehicleDto,
} from '../vehicles/dto/vehicle.dto';
import { VehiclesService } from '../vehicles/vehicles.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard) // Proteger todas las rutas del dashboard
export class DashboardController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly contactsService: ContactsService,
    private readonly imagesService: ImagesService,
  ) {}

  // === ESTADÍSTICAS DASHBOARD ===

  @Get('stats')
  @ApiOperation({
    summary: 'Obtener estadísticas del dashboard',
    description: 'Estadísticas generales para el panel de administración',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getDashboardStats() {
    return await this.vehiclesService.getStats();
  }

  // === GESTIÓN DE VEHÍCULOS (ADMIN) ===

  @Get('vehicles')
  @ApiOperation({
    summary: 'Obtener todos los vehículos (Admin)',
    description: 'Lista completa de vehículos para administración',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos obtenida exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getAllVehicles() {
    return await this.vehiclesService.findAll();
  }

  @Post('vehicles')
  @ApiOperation({
    summary: 'Crear nuevo vehículo (Admin)',
    description: 'Crea un nuevo vehículo en el sistema',
  })
  @ApiResponse({ status: 201, description: 'Vehículo creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehiclesService.create(createVehicleDto);
  }

  @Get('vehicles/:id')
  @ApiOperation({ summary: 'Obtener vehículo por ID (Admin)' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({ status: 200, description: 'Vehículo encontrado.' })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async getVehicle(@Param('id') id: string) {
    return await this.vehiclesService.findOne(id);
  }

  @Patch('vehicles/:id')
  @ApiOperation({ summary: 'Actualizar vehículo (Admin)' })
  @ApiParam({ name: 'id', description: 'ID del vehículo' })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado exitosamente.',
  })
  @ApiResponse({ status: 404, description: 'Vehículo no encontrado.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete('vehicles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteVehicle(@Param('id') id: string) {
    return await this.vehiclesService.remove(id);
  }

  @Patch('vehicles/:id/highlight')
  async highlightVehicle(
    @Param('id') id: string,
    @Body() highlightDto: HighlightVehicleDto,
  ) {
    return await this.vehiclesService.highlight(id, highlightDto.destacado);
  }

  // === GESTIÓN DE IMÁGENES ===

  @Post('vehicles/:id/images')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadImages(
    @Param('id') vehicleId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // Verificar que el vehículo existe
    await this.vehiclesService.findOne(vehicleId);

    // Subir cada imagen a Cloudinary y crear registros en la base de datos
    const imagePromises = files.map((file) =>
      this.imagesService.createFromFile(file, vehicleId),
    );

    return await Promise.all(imagePromises);
  }

  @Get('images')
  async getAllImages() {
    return await this.imagesService.findAll();
  }

  @Delete('images/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') id: string) {
    return await this.imagesService.remove(id);
  }

  // === GESTIÓN DE CONTACTOS (ADMIN) ===

  @Get('contacts')
  async getAllContacts() {
    return await this.contactsService.findAll();
  }

  @Get('contacts/:id')
  async getContact(@Param('id') id: string) {
    return await this.contactsService.findOne(id);
  }

  @Delete('contacts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteContact(@Param('id') id: string) {
    return await this.contactsService.remove(id);
  }
}
