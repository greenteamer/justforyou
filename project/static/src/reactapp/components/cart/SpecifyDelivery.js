import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { TextField } from '../ui';


@observer
export default class SpecifyDelivery extends Component {
  static propTypes = {
    delivery: PropTypes.object,
  }

  render() {
    const { delivery } = this.props;
    return <div className="mv3 bg-light-gray pa2 ba bd-1px bd-mild-gray2">
      <div className="row mb3">
        <div className="col-xs-9">
          <p className="mb1">Регион:</p>
          <TextField
            placeholder="Регион"
            value={delivery.region ? delivery.region : ''}
            onChange={(e) => {
              delivery.region = e.target.value;
            }}
          />
        </div>
        <div className="col-xs-3">
          <p className="mb1">Тип региона:</p>
          <TextField
            placeholder=""
            value={delivery.region_type ? delivery.region_type : ''}
            onChange={(e) => { delivery.region_type = e.target.value; }}
          />
        </div>
      </div>
      <div className=" mb3">
        <p className="mb1">Город:</p>
        <TextField
          placeholder="Город"
          value={delivery.city ? delivery.city : ''}
          onChange={(e) => { delivery.city = e.target.value; }}
        />
      </div>
      <div className="row mb3">
        <div className="col-xs-3">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.settlement_type ? delivery.settlement_type : ''}
            onChange={(e) => { delivery.settlement_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-9">
          <p className="mb1">Населенный пункт:</p>
          <TextField
            placeholder="Населенный пункт"
            value={delivery.settlement ? delivery.settlement : ''}
            onChange={(e) => { delivery.settlement = e.target.value; }}
          />
        </div>
      </div>
      <div className="row mb3">
        <div className="col-xs-3">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.street_type ? delivery.street_type : ''}
            onChange={(e) => { delivery.street_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-6">
          <p className="mb1">Улица:</p>
          <TextField
            placeholder="Улица"
            value={delivery.street ? delivery.street : ''}
            onChange={(e) => { delivery.street = e.target.value; }}
          />
        </div>
        <div className="col-xs-3">
          <p className="mb1">Индекс:</p>
          <TextField
            placeholder=""
            value={delivery.postal_code ? delivery.postal_code : ''}
            onChange={(e) => { delivery.postal_code = e.target.value; }}
          />
        </div>
      </div>
      <div className="row mb3">
        <div className="col-xs-4">
          <p className="mb1">Дом:</p>
          <TextField
            placeholder="Дом"
            value={delivery.house ? delivery.house : ''}
            onChange={(e) => { delivery.house = e.target.value; }}
          />
        </div>
        <div className="col-xs-2">
          <p className="mb1">Тип:</p>
          <TextField
            placeholder=""
            value={delivery.block_type ? delivery.block_type : ''}
            onChange={(e) => { delivery.block_type = e.target.value; }}
          />
        </div>
        <div className="col-xs-2">
          <p className="mb1">к/стр:</p>
          <TextField
            placeholder=""
            value={delivery.block ? delivery.block : ''}
            onChange={(e) => { delivery.block = e.target.value; }}
          />
        </div>
        <div className="col-xs-4">
          <p className="mb1">Квартира:</p>
          <TextField
            placeholder="Квартира"
            value={delivery.flat ? delivery.flat : ''}
            onChange={(e) => { delivery.flat = e.target.value; }}
          />
        </div>
      </div>
    </div>;
  }
}
