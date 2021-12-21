import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DetalleFactura, DetalleFacturaRelations, Factura, Producto} from '../models';
import {FacturaRepository} from './factura.repository';
import {ProductoRepository} from './producto.repository';

export class DetalleFacturaRepository extends DefaultCrudRepository<
  DetalleFactura,
  typeof DetalleFactura.prototype.id,
  DetalleFacturaRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof DetalleFactura.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof DetalleFactura.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(DetalleFactura, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
