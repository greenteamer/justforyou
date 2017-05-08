import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import AddButton from './AddButton';
import RemoveButton from './RemoveButton';


@observer
class AddToCart extends Component {
  static propTypes = {
    product: PropTypes.object,
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
      className={`property btn btn-small mb2 rounded ${propObject.isActive ? 'active' : ''} ${propObject.inUse ? 'btn-brown' : 'btn-white'} mr-7px`}
      onClick={this.setActiveProperty}>
      {propObject.value} {propObject.type.unit}
    </button>;
  }
}


@observer
class ProductCardComponent extends Component {

  static propTypes = {
    product: PropTypes.object,
    store: PropTypes.object,
  }

  render() {
    const { product, store } = this.props;
    return <div className="">
      <div className="product-container">

        <p className="fs-300r lh-300r b">{product.activeProperty ? product.activeProperty.price : product.price}р.</p>

        <div className="ba bd-1px bd-mild-gray2">
          <div className="bg-light-gray pa-14px">
            <p className="fs-150r">Цена с доставкой</p>
            <ul className="list pl-0px">
              <li className="ion-android-car fs-125r">
                <a href="" className="fs-87r c-brown underline ml-16px">Доставка по Томску и области: </a>
                <span className="fs-113r c-brown b fr">400 р.</span>
              </li>
              <li className="ion-plane fs-125r">
                <a href="" className="fs-87r c-brown underline ml-16px">Доставка в другие регионы: </a>
                <span className="fs-113r c-brown b fr">от 450 р.</span>
              </li>
              <li className="ion-android-hand fs-125r">
                <a href="" className="fs-87r c-brown underline ml-16px">Самовывоз: </a>
                <span className="fs-113r c-brown fr">Бесплатно</span>
              </li>
            </ul>
          </div>
          <div className="pl-14px pr-14px pb-24px pt-24px">
            <div className="mb-0px flex justify-center flex-wrap">
              {product.properties
              .map((propObject, index) =>
                <Property
                  propObject={propObject}
                  product={product}
                  key={index} /> )}
            </div>
          </div>
        </div>

        <AddToCart product={product} store={store}/>
      </div>
    </div>;
  }
}


export default ProductCardComponent;
