import React from 'react';
import { createRoot } from 'react-dom/client';
import RatingsAndReviews from './components/ratingsAndReviews/ratingsAndReviews.jsx';
const container = document.getElementById('root');
const root = createRoot(container);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>dsfjkahsdl</h1>
        <RatingsAndReviews></RatingsAndReviews>
      </div>
    );
  }
}

root.render(<App />);
