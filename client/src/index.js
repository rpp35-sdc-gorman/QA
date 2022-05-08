import React from 'react';
import { createRoot } from 'react-dom/client';
import RIC from './components/RIC_Component/RIC.jsx';

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
        <h1>dsfjkahsdl</h1>
        <RIC />
      </div>
    )
  }
}

root.render(<App />);