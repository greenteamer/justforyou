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
      return <div className="add-to-cart">
        <i className="ion-ios-minus" onClick={product.removeFromCart} />
        <span className="count">{product.activeCartitem.count}</span>
        <i className="ion-ios-plus" onClick={product.addToCart} />
      </div>;
    }
    return <div className="add-to-cart" onClick={product.addToCart}>
      <img width="22" src="/static/src/img/shopping-bag-4.png"
        srcSet="/static/src/img/shopping-bag-4.png 1x,
          /static/src/img/shopping-bag-4@2x.png 2x,
          /static/src/img/shopping-bag-4@3x.png 3x" />
      <span>Добавить в корзину</span>
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
      className={`btn btn-mini btn-success ${propObject.isActive ? 'active' : ''}`}
      onClick={this.setActiveProperty}>{propObject.value} {propObject.type.unit}</button>;
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
    return <div className="col-xs-3 product-item">
      <div className="product-container">
        <img src={product.images[0].image} alt="" />
        <p className="price">{product.activeProperty ? product.activeProperty.price : product.price}р.</p>
        <a href={`/products/${product.slug}/`} className="product-name">{product.name}</a>
        <div className="properties">
          {product.properties
          .map((propObject, index) =>
            <Property
              propObject={propObject}
              product={product}
              key={index} /> )}
        </div>
        <AddToCart product={product} store={store}/>
      </div>
    </div>;
  }
}

export default Product;
