// This is the styleSelector Component

import React from 'react';



class StyleSelector extends React.Component{
  constructor(props){
    super()
    this.state = {
      currentStyle: null
    }
  }

  componentDidMount(){
    this.getDefault()
  }

  getDefault(){
    const key = 'default?'

    Array.from(this.props.styles).forEach(item => {
      console.log(item)
      if(item[key]){
        this.setState({currentStyle: item})
      }
    })
  }


  render(){
    return(
      <article>
        <h4>Style > {this.state.currentStyle}</h4>
      </article>
    )
  }
}


export default StyleSelector;