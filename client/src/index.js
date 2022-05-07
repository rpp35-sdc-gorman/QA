import React from 'react';
import { createRoot } from 'react-dom/client';
import QAMain from './components/Questions_Answers/QAMain.jsx';

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
        <QAMain />
      </div>
    )
  }
}

root.render(<App />);