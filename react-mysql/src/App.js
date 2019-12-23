import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  state = {
  details:[],
  detail:{
    id:'l',
    description:'0',
    drugCode:'2',
    diseaseCode:'l',
    type:'l'
  }
  }
  
  componentDidMount(){
    this.getdetails();/*
   window.fetch('http://localhost:3000/details')
   .then(response => {
      console.log(response.status);
      console.log(response.body);
      return response.json();
   })
   .then(response => this.setState({details:response.data}))
   .then(json => console.log(json))
   .catch(error => console.log(error))*/

  }
  getdetails = _ =>{
     
    fetch('http://localhost:3000/details')
      
   .then(response => response.json())
   /*
    .then(response => response.text())          
  .then(text => console.log(text))*/
     .then(response => this.setState({details:response.data}))
    .catch(err => console.error(err))
    
    }
    ////
    /*
    fetch("http://localhost:3000/details")
    .then((Response) => Response.json())
    .then((response) => {
        console.log(response.data);
        this.setState({details: response.data})
        .catch(error => console.log(error))
    })*/
    /////
   
  
  adddetails = _ =>{
    const{detail} = this.state
    fetch('$http://localhost:3000/details/add?id=${detail.id}&description=${detail.description}&drugCode=${detail.drugCode}&diseaseCode=${detail.diseaseCode}&type=${detail.type}')
    //.then(response=>response.json())
    /*.then(response => response.text())          
    .then(text => console.log(text))*/
    .then(this.getdetails)
    .catch(err =>console.error(err))

  }
  renderdetail = ({id,description,drugCode,diseaseCode,type})=> <div key={id}>{description}|{drugCode}|{diseaseCode}|type}</div>
 
    render(){
     const {details,detail} = this.state;
     return(
       <div className = "App">
       {details.map(this.renderdetail)}
         
         <div>
					<label>id </label>
					<input
						type="text"
						value={detail.id}
						onChange={e => this.setState({ detail: {...detail, id:e.target.value}})}
					/>
				</div>
				<div>
					<label>description</label>
					<textarea
						value={detail.description}
						onChange={e => this.setState({ detail: {...detail, description:e.target.value}})}
					/>
				</div>
				<div>
					<label>drugCode</label>
					<textarea
						value={detail.drugCode}
						onChange={e => this.setState({ detail: {...detail, drugCode:e.target.value}})}
					/>
				</div>
         <div>
					<label>diseaseCode</label>
					<textarea
						value={detail.diseaseCode}
						onChange={e => this.setState({ detail: {...detail, diseaseCode:e.target.value}})}
					/>
				</div>
                <div>
					<label>type</label>
					<textarea
						value={detail.type}
						onChange={e => this.setState({ detail: {...detail, type:e.target.value}})}
					/>
				</div>
				<button type="submit"onClick={this.adddetails}>Submit</button>
			
         
       </div>
       );
      }

}
export default App;
