import React from 'react';
import { observer } from 'mobx-react';
import CategoryFilter from './CategoryFilter';


@observer
export default class ProductMenu extends React.Component {
  static propTypes = {
    uiStore: React.PropTypes.object,
    store: React.PropTypes.object,
  }

  toggleFilter(filterName) {
    const { uiStore } = this.props;
    uiStore.setSorting(uiStore.sorting !== filterName ? filterName : null);
  }

  render() {
    const { store, uiStore } = this.props;
    return <nav id="product-menu" className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className="flex justify-start">
          <div className="flex jusdtify-center self-center items-center mh2">
            <span className="ion-android-funnel" />
          </div>
          <div className="btn-group mb1" role="group" aria-label="Basic example">
            <button type="button" className={`btn btn-secondary pv1 ph2 fs-85r ${uiStore.sorting === 'byName' ? 'active' : ''}`} onClick={() => this.toggleFilter('byName')}>
              Названию
            </button>
            <button type="button" className={`btn btn-secondary pv1 ph2 fs-85r ${uiStore.sorting === 'byMinPrice' ? 'active' : ''}`} onClick={() => this.toggleFilter('byMinPrice')}>
              Мин. цене
            </button>
            <button type="button" className={`btn btn-secondary pv1 ph2 fs-85r ${uiStore.sorting === 'byMaxPrice' ? 'active' : ''}`} onClick={() => this.toggleFilter('byMaxPrice')}>
              Макс. цене
            </button>
          </div>
        </div>
        {/* <CategoryFilter store={store} uiStore={uiStore} /> */}
      </nav>
  }
}
