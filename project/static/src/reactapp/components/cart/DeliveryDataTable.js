import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';


@observer
export default class DeliveryDataTable extends Component {
  static propTypes = {
    delivery: PropTypes.object,
  }

  render() {
    const { delivery } = this.props;
    return <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Индекс</td>
          <td>{delivery.postal_code}</td>
        </tr>
        <tr>
          <td>Регион</td>
          <td>{delivery.region} {delivery.region_type}</td>
        </tr>
        <tr>
          <td>Город</td>
          <td>{delivery.city_type} {delivery.city}</td>
        </tr>
        <tr>
          <td>Населенный пункт</td>
          <td>{delivery.settlement_type} {delivery.settlement}</td>
        </tr>
        <tr>
          <td>Адрес</td>
          <td>{delivery.street_type} {delivery.street}, {delivery.house_type} {delivery.house}, {delivery.flat_type} {delivery.flat}</td>
        </tr>
      </tbody>
    </table>;
  }
}
