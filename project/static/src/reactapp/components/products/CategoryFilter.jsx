import React from 'react';
import { observer } from 'mobx-react';


@observer
export default class CategoryFilter extends React.Component {
  render() {
    const { store, uiStore } = this.props;
    return <div className="btn-group mb1">
      <button type="button" className="btn btn-secondary pa1">Фильтр</button>
      <button type="button" className="btn btn-secondary pa1 dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className="dropdown-menu">
        {store.categories
          .map((category, index) => <button
            key={index}
            className="dropdown-item"
            onClick={() => uiStore.setCatalogFilter(category.id)}>{category.name}</button>)}
      </div>
    </div>;
  }
}
