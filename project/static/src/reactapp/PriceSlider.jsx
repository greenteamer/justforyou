import React from 'react';
import Slider from 'rc-slider';
import { observer } from 'mobx-react';


class CustomHandle extends React.Component {
  static propTypes = {
    value: React.PropTypes.any,
    offset: React.PropTypes.number,
  }

  render() {
    const { offset, value } = this.props;
    return <div style={{ left: `${offset}%` }} className='slider-point'>val: {value}</div>;
  }
}


@observer
export default class PriceSlider extends React.Component {

  onSliderChange = (value) => {
    const { uiStore } = this.props;
    uiStore.setPriceFilter(value);
  }

  render() {
    const { store, uiStore } = this.props;
    if (uiStore.isLoading) return null;
    return <Slider
      step={2}
      range={true}
      showTooltip={true}
      min={store.minProductPrice}
      max={store.maxProductPrice}
      defaultValue={[
        store.minProductPrice,
        store.maxProductPrice,
      ]}
      onChange={this.onSliderChange}
    />;
  }
}
