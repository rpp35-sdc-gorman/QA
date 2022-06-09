import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

// import Overview from './components/overview/Overview';
import Coupler from './components/container/Coupler';
import QAMain from './components/Questions_Answers/QAMain.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import Banner from './components/Banner.jsx';
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
