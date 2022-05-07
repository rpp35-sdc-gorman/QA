import React from 'react';
import { createRoot } from 'react-dom/client';

import Overview from './components/overview/Overview';

const container = document.getElementById('root');
const root = createRoot(container);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return(
      <div>
        <Overview />
      </div>
    )
  }
}

root.render(<App />);