import React, { Component } from 'react';
import './App.css';

import Temp from './Temp.js';
import UpdateForm from './UpdateForm.js'
const WebFont = require('webfontloader');

class App extends Component {

  state = {}

  componentDidMount() {
    this.fetchData("10036");
  }

  fetchData = (zipcode) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=709847967f5e54b97308c1b2cae4dee5&units=metric";
    fetch(url)
      .then(resp => {
        if(!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then(data => {
        this.setState({
          name: data.name,
          description: this.capitalizeDescription(data.weather[0].description),
          temp: Math.round(data.main.temp),
          min: Math.round(data.main.temp_min),
          max: Math.round(data.main.temp_max),
          icon: data.weather[0].icon,
          zipcode: zipcode
        })
      })
      .catch(error => console.error('Error:', error));
  }

  capitalizeDescription = (str) => {
    const words = str.toLowerCase().split(' ');
    for(let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
    return words.join(' ');
  }

  handleUpdate = e => {
    e.preventDefault();
    const input = e.target.childNodes[0].childNodes[1].value
    if(input !== "") {
      this.fetchData(e.target.childNodes[0].childNodes[1].value);
    }
  }

  render() {
    return (
      <div className="app">
        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6/webfont.js"></script>
        <script>
         {WebFont.load({
            google: {
              families: ['Open Sans:300,400', 'Lato:400']
            }
          })}
        </script>
        <div>
          <p className="name">{this.state.name}</p>
          <img className="icon" width="60" src={"http://openweathermap.org/img/w/" + this.state.icon + ".png"}></img>
        </div>
        <div>
          <p className="description">{this.state.description}</p>
        </div>
        <Temp cl={"temp"} prim={true} val={this.state.temp}></Temp>
        <div className="range">
          <Temp cl={"min"} prim={false} val={this.state.min}></Temp>
          <Temp cl={"max"} prim={false} val={this.state.max}></Temp>
        </div>
        <div className="divider">
          <hr className="line" width="700px"></hr>
        </div>
        <UpdateForm zipcode={this.state.zipcode} handleUpdate={this.handleUpdate}></UpdateForm>
      </div>
    );
  }
}

export default App;
