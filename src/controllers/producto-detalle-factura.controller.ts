import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  DetalleFactura, Producto
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleFacturaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-factura', {
    responses: {
      '200': {
        description: 'DetalleFactura belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFactura)},
          },
        },
      },
    },
  })
  async getDetalleFactura(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<DetalleFactura> {
    return this.productoRepository.detalleFactura(id);
  }
}
