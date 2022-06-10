import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

// import Overview from './components/overview/Overview';
const Coupler = React.lazy(() => import('./components/container/Coupler'));
const QAMain = React.lazy(() => import('./components/Questions_Answers/QAMain.jsx'));
const RatingsAndReviews = React.lazy(() => import('./components/ratingsAndReviews/ratingsAndReviews.jsx'));
const Banner = React.lazy(() => import('./components/Banner.jsx'));
// import RIC from './components/RIC_Component/RIC.jsx';

import ClickTracker from './components/common/ClickTracker.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const QA = ClickTracker(QAMain, 'Question & Answer');
    return (
      <div>
        <Banner />
        <Coupler />
        <QA />
        <RatingsAndReviews />
      </div>
    );
  }
}

root.render(<App />);
