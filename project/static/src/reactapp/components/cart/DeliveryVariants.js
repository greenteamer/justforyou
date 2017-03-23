import React, { Component, PropTypes } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';


// @inject('store')
@observer
export default class DeliveryVariants extends Component {
  static propTypes = {
    variants: PropTypes.object,
    store: PropTypes.object,
  }

  handleOnSelectDeliveryVariant = (item, provider) => {
    const { store: { delivery } } = this.props;
    if (delivery.provider_name === provider && delivery.provider_type === item.type_name && delivery.price === item.price) {
      delivery.provider_name = '';
      delivery.provider_type = '';
      delivery.price = null;
      delivery.days = null;
    }
    else {
      delivery.provider_name = provider;
      delivery.provider_type = item.type_name;
      delivery.price = item.price;
      delivery.days = item.days;
    }
  }

  render() {
    console.log('DeliveryVariants store: ', this.props.store);
    const { store, variants } = this.props;
    const { delivery } = store;
    const providers = store.providers();
    // return <h3>DeliveryVariants</h3>;
    return <div>
      {variants &&
        Object.keys(toJS(variants)).map((key, index) => {
          return <div className="row" key={index}>
            <div className="col-xs-12">
              <h4 className="card-title">{providers.name}</h4>
            </div>
            {variants[key].map((item, index) => <div
              onClick={() => this.handleOnSelectDeliveryVariant(item, key)}
              className="col-xs-6 pointer"
              key={index}
            >
              <div
                className={`card ${item.type_name === delivery.provider_type && key === delivery.provider_name ? 'selected' : ''}`}
              >
                <div className="card-block pa2 flex flex-row justify-between">
                  <div className="">
                    <h4 className="card-title">{item.type_name}</h4>
                    <h5 className="card-title">Время доставки: {item.days} дней</h5>
                  </div>
                  <h3>{item.price} р.</h3>
                </div>
              </div>
            </div>)}
          </div>;
        })
      }
    </div>;
  }
}
