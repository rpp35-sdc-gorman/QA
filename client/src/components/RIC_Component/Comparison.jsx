import React, { useState } from 'react';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
    }
  }

  componentDidMount() {
    this.parseFeatures();
  }

  groupFeatures(featuresArr) {
    let features = {};
    for (var i = 0; i < featuresArr.length; i++) {
      features[featuresArr[i].feature] = featuresArr[i].value;
    };
    return features
  }

  parseFeatures() {
    let allFeatures = this.props.main.features.concat(this.props.related.features);
    let uniqueFeatures = [... new Set (allFeatures.map(feature => {
      return feature.feature
    }))];
    // let uniqueFeatures = [... new Set(featureNames) ];
    let comparedFeatures = [];
    let [mainFeatures, relatedFeatures] = [
      this.groupFeatures(this.props.main.features),
      this.groupFeatures(this.props.related.features)
    ];
    for (var i = 0; i < uniqueFeatures.length; i++) {
      let main = Object.keys(mainFeatures).includes(uniqueFeatures[i]) ? mainFeatures[uniqueFeatures[i]] : '-';
      let related = Object.keys(relatedFeatures).includes(uniqueFeatures[i]) ? relatedFeatures[uniqueFeatures[i]] : '-';
      let comparison = {[this.props.main.name]: main, 'Feature': uniqueFeatures[i], [this.props.related.name]: related};
      comparedFeatures.push(comparison);
    }
    this.setState({ features: comparedFeatures });
  }

  render() {
    const main = this.props.main.name;
    const related = this.props.related.name;
    return (main !== undefined ?
      <div id='comparison'>
        <h3 style={{padding: '2em'}}>Comparing</h3>
        <table className='center'>
          <thead>
            <tr>
              <th className='left'>{main}</th>
              <th className='mid'>Feature</th>
              <th className='right'>{related}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.features.map((feature, index) => {
              return (<tr key={index}>
                <td className='left'>{feature[main]}</td>
                <td className='mid'>{feature['Feature']}</td>
                <td className='right'>{feature[related]}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div> : <></>
    )
  }
}

export default Comparison