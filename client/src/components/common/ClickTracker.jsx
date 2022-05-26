import React from 'react';
import axios from 'axios';

// This function takes a component...
function ClickTracker(WrappedComponent, widget) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.sendClickTracker = this.sendClickTracker.bind(this);
    }

    sendClickTracker(event) {
      let tag = event.target.tagName.toLowerCase();
      let className = event.target.className ? `.${event.target.className}` : '';
      let id = event.target.id ? `#${event.target.id}` : '';
      // console.log('from click tracker: ', tag + className + id, widget);
      axios.post('/trackClick', {
        element: tag + className + id,
        widget,
        time: new Date().toDateString()
      })
      .catch(err => console.log(err));
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent clickTracker={(event) => this.sendClickTracker(event)} {...this.props} />;
    }
  };
}

export default ClickTracker;