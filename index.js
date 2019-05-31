import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import ScrollToTop from './components/scroll-to-top';
import routes from './utils/routes';
// import 'react-table/react-table.css'

ReactDOM.render(
    <Router>
      <ScrollToTop>
        {routes}
      </ScrollToTop>
    </Router>
, document.getElementById('root'));
