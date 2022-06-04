import React from 'react';
import { createRoot } from 'react-dom/client';

import Overview from './components/overview/Overview';
import QAMain from './components/Questions_Answers/QAMain.jsx';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
import RIC from './components/RIC_Component/RIC.jsx';

import ClickTracker from './components/common/ClickTracker.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: false
    };
  }

  addProduct() {
    this.setState({ addProduct: !this.state.addProduct })
  }

  render() {
    const QA = ClickTracker(QAMain, 'Question & Answer');
    const RI = ClickTracker(RIC, 'Related Items');
    const OVR = ClickTracker(Overview, 'Overview')
    return (
      <div>
        <Overview />
        <RI added={this.state.addProduct} />
        <OVR />
        <RI />
      </div>
    );
  }
}

root.render(<App />);
