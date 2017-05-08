import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
class AddToCart extends Component {
  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object,
  }

  render() {
    const { product } = this.props;
    if (product.activeCartitem) {
      return <div className="bg-mild-gray2 c-white tc br2 br--bottom pointer flex justify-between items-stretch min-h-50px">
        <div onClick={product.removeFromCart}
          className="btn btn-small btn-white bt-0px-i w-50px pa-0px justify-center fs-120r h-auto-i">
          <i className="ion-android-remove"></i>
        </div>
        <span className="count fs-120r pl-10px pr-10px b c-brown ttu self-center">{product.activeCartitem.count}</span>
        <div onClick={product.addToCart}
          className="btn btn-small btn-white bt-0px-i w-50px pa-0px justify-center fs-120r h-auto-i">
          <i className="ion-android-add"></i>
        </div>
      </div>;
    }
    return <div className="bg-mild-gray2 brown c-white pa-8px tc br2 br--bottom pointer min-h-50px flex justify-center items-center" onClick={product.addToCart}>
      <span className="b c-brown ion-bag fs-120r mr-10px" />
      <span className="b ff-b c-brown ttu">Добавить в корзину</span>
    </div>;
  }
}


@observer
class Property extends Component {

  static propTypes = {
    propObject: PropTypes.object,
    product: PropTypes.object,
  }

  setActiveProperty = () => {
    const { propObject, product } = this.props;
    product.setActiveProperty(propObject.id);
  }

  render() {
    const { propObject } = this.props;

    return <button
      className={`property btn btn-small rounded ${propObject.isActive ? 'active' : ''} ${propObject.inUse ? 'btn-brown' : 'btn-white'} mr-7px mt-5px`}
      onClick={this.setActiveProperty}>
      {propObject.value} {propObject.type.unit}
    </button>;

  }
}


@observer
class Product extends Component {

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object,
  }

  render() {
    const { product, store } = this.props;
    return <div className="product-container flex-auto flex flex-column">
      <div className="ba bg-warm-grey-5 bd-mild-gray2 pa-10px tc br2 br--top flex-auto">
        <img src={ product.images[0].croppedImage } alt="" className="max-h-150px" />
        <p className="fs-190r mb-20px">{product.activeProperty ? product.activeProperty.price : product.price}р.</p>
        <a href={ product.absoluteUrl } className="fs-150r product-name c-brown">{ product.name }</a>

          {product.properties &&
            <div className="pb-10px pt-10px">
              <div className="flex justify-center flex-wrap properties-extends">
                {product.properties.map((propObject, index) =>
                  <Property
                    propObject={propObject}
                    product={product}
                    key={index} /> )}
              </div>
            </div>
          }

      </div>
      <AddToCart product={product} store={store}/>
    </div>;
  }
}

export default Product;
