import React, { useState } from 'react';
import { Check } from 'akar-icons';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
    }
  }

  componentDidMount() {
    if (this.props.main && this.props.related){
      this.parseFeatures();
    }
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
      return feature.value
    }))];
    let nullExists = uniqueFeatures.indexOf(null);
    if (nullExists !== -1) {
      uniqueFeatures.splice(nullExists, 1);
    }
    let comparedFeatures = [];
    let [mainFeatures, relatedFeatures] = [
      this.groupFeatures(this.props.main.features),
      this.groupFeatures(this.props.related.features)
    ];
    for (var i = 0; i < uniqueFeatures.length; i++) {
      let main = Object.values(mainFeatures).includes(uniqueFeatures[i]) ? <Check size={16}/> : null;
      let related = Object.values(relatedFeatures).includes(uniqueFeatures[i]) ? <Check size={16}/> : null;
      let comparison = {[this.props.main.name]: main, 'Feature': uniqueFeatures[i], [this.props.related.name]: related};
      comparedFeatures.push(comparison);
    }
    this.setState({ features: comparedFeatures });
  }

  render() {
    const main = this.props.main;
    const related = this.props.related;
    return ((main !== undefined && related !== undefined) ?
      <div id='comparison'>
        <h3 style={{padding: '2em'}}>Comparing</h3>
        <table className='center'>
          <thead>
            <tr>
              <th className='left'>{main.name}</th>
              <th className='mid'>Feature</th>
              <th className='right'>{related.name}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.features.map((feature, index) => {
              return (<tr key={index}>
                <td className='left'>{feature[main.name]}</td>
                <td className='mid'>{feature['Feature']}</td>
                <td className='right'>{feature[related.name]}</td>
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