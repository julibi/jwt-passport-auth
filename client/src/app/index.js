import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import rootReducer from './reducers';
import Home from './components/Home';
import SearchContainer from './components/SearchContainer';
import CollectionContainer from './components/CollectionContainer';
import styles from './styles/Root.css';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router>
        <div className={styles.wrapper}>
          <div className={styles.navigation}>
            <ul className={styles.list}>
              <li className={styles.listItem}><NavLink to="/">Home</NavLink></li>
              <li className={styles.listItem}><NavLink to="/Search">Search</NavLink></li>
              <li className={styles.listItem}><NavLink to="/Collection">Collection</NavLink></li>
            </ul>
          </div>
          <div className={styles.content}>
            <Route exact path="/" component={Home} />
            <Route path="/Search" component={SearchContainer} />
            <Route path="/Collection" component={CollectionContainer} />
          </div>
        </div>
      </Router>
  </Provider>
);

render(<App/>, document.getElementById('app'));