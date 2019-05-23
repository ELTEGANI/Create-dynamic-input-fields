import React, { Component } from 'react';
import './App.css';

class App extends Component {
 state = {
      number: 0,
      list: []
    };
  
  
  handleChange = (e) => {
    this.setState({ number: Number(e.target.value) });
  };
  
  
   save =()=>{
     console.log(this.state.list);
   }


  handleClick = () => {  
    if(this.state.number > 30){ 
     alert('Not Allowed To Use Number Older Than 30')
    }else{
    const list = new Array(this.state.list.length + this.state.number).fill({name:""},0);
    console.log(list);
    this.setState({ list });
    }
    if(this.state.list.length !== 0){
      this.setState({ list : [] })
    }  
  };
   
  
  onClear = () => {
    this.setState({ list: [] });
  };

  _handleInputChange = (e,i) => {
    if (["name"].includes(e.target.className)) {
      let list = [...this.state.list]
      list[i][e.target.dataset.id][e.target.className] = e.target.value
      this.setState({list}); 
    } else {
      this.setState({[e.target.name]: e.target.value})
    }   
  }
  
  renderInputs() {
    let {list} = this.state
    return list.map((item,i) => (
        <div key={i}>
        <label>{`${i + 1}-`}</label>
                <input  placeholder="Name"  
                 type="text"
                 name="name"
                 data-id={i}
                 id="name"
                 value={list.name} 
                 className="name"
                 onChange={(e) => this._handleInputChange(e,i)}
                />
        </div>
    ));
}

  

  render() {
    return (
      <div className="App">
        <div>
          <input min="0" max="30" type="number" onChange={this.handleChange} />
          <button onClick={this.handleClick}>Add</button>
          <button type="button" onClick={this.onClear}>Clear</button>
          <button onClick={this.save}>Save</button>
        </div>
        <div>
         {this.renderInputs()}
        </div>
      </div>
    );
}  
}
export default App;
