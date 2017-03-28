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
      <span className="label">Сортировать по: </span>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={`btn btn-secondary ${uiStore.sorting === 'byName' ? 'active' : ''}`}
          onClick={() => this.toggleFilter('byName')}>Названию</button>
        <button
          type="button"
          className={`btn btn-secondary ${uiStore.sorting === 'byMinPrice' ? 'active' : ''}`}
          onClick={() => this.toggleFilter('byMinPrice')}>Мин. цене</button>
        <button
          type="button"
          className={`btn btn-secondary ${uiStore.sorting === 'byMaxPrice' ? 'active' : ''}`}
          onClick={() => this.toggleFilter('byMaxPrice')}>Макс. цене</button>
      </div>
      <CategoryFilter store={store} uiStore={uiStore} />
    </nav>;
  }
}
