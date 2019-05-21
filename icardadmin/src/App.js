import React, { Component } from 'react';
import './App.css';

class App extends Component {
 state = {
      number: 0,
      list: [],
      imagePreviewUrl : '',
      file : ''
    };
  
  
  handleChange = e => {
    this.setState({ number: Number(e.target.value) });
  };
  
  

  handleClick = () => {  
    if(this.state.number > 30){ 
     alert('Not Allowed To Use Number Older Than 30')
    }else{
    const list = new Array(this.state.list.length + this.state.number).fill({name:"", stid:"",phone:""},0);
    this.setState({ list });
    console.log('list........'+list)
    }
    if(this.state.list.length !== 0){
      this.setState({ list : [] })
      this.setState({ imagePreviewUrl : ''})
      this.setState({ file : ''})
    }
  };

  
  onClear = () => {
    this.setState({ list: [] });
    this.setState({ imagePreviewUrl : ''})
    this.setState({ file : ''})
  };

  _handleInputChange = (e,i) => {
    if (["name","stid","phone"].includes(e.target.className)) {
      let list = [...this.state.list]
      list[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({list}); 
    } else {
      this.setState({[e.target.name]: e.target.value})
    }   
  }
  
  _handleImageChange(i,e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
        // update this.state.list with the image data at the appropriate index
        this.setState(prevState => {
            const list = [...prevState.list];
            list[i] = {
                file: file,
                imagePreviewUrl: reader.result
            };
            return {list};
        });
    };
    reader.readAsDataURL(file);
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
                 value={list[i].name} 
                 className="name"
                 onChange={(e) => this._handleInputChange(e,i)}
                />
                <input  placeholder="Id"  
                  type="text"
                  name="stid"
                  data-id={i}
                  id="stid"
                  value={list[i].stid} 
                  className="stid"
                  onChange={(e) => this._handleInputChange(e,i)}
                />
                <input  placeholder="Phone"  
                  type="text"
                  name="phone"
                  data-id={i}  
                  id="phone"
                  value={list[i].phone} 
                  className="phone"
                  onChange={(e) => this._handleInputChange(e,i)}
                />
            <input
                style={{display: 'none'}}
                type="file"
                onChange={e => this._handleImageChange(i,e)}
                ref={`image${i}`}
            />
            <button onClick={() =>this.refs[`image${i}`].click()}>Image</button>
            <img src={!!item ? item.imagePreviewUrl : ''} width="50" height="50" alt='' />
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
          <button>Save</button>
        </div>
        <div>
         {this.renderInputs()}
        </div>
      </div>
    );
}  
}
export default App;
