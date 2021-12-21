import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Producto, ProductoRelations, DetalleFactura} from '../models';
import {DetalleFacturaRepository} from './detalle-factura.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detalleFactura: BelongsToAccessor<DetalleFactura, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetalleFacturaRepository') protected detalleFacturaRepositoryGetter: Getter<DetalleFacturaRepository>,
  ) {
    super(Producto, dataSource);
    this.detalleFactura = this.createBelongsToAccessorFor('detalleFactura', detalleFacturaRepositoryGetter,);
    this.registerInclusionResolver('detalleFactura', this.detalleFactura.inclusionResolver);
  }
}
