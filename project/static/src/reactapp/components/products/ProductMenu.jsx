import React from 'react';
import { observer } from 'mobx-react';
import CategoryFilter from './CategoryFilter';


@observer
export default class ProductMenu extends React.Component {

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

  // render() {
  //   const { store, uiStore } = this.props;
  //   return <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
  //     <a className="navbar-brand" href="#">Navbar</a>
  //     {/* <div className="collapse navbar-collapse" id="navbarNavDropdown"> */}
  //       <ul className="navbar-nav">
  //         <li className="nav-item active">
  //           <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
  //         </li>
  //         <li className="nav-item">
  //           <a className="nav-link" href="#">Features</a>
  //         </li>
  //         <li className="nav-item">
  //           <a className="nav-link" href="#">Pricing</a>
  //         </li>
  //         <li className="nav-item dropdown">
  //           <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //             Dropdown link
  //           </a>
  //           <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
  //             <a className="dropdown-item" href="#">Action</a>
  //             <a className="dropdown-item" href="#">Another action</a>
  //             <a className="dropdown-item" href="#">Something else here</a>
  //           </div>
  //         </li>
  //       </ul>
  //     {/* </div> */}
  //   </nav>;
  // }
}
