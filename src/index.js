import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

const Title = ()=>(
  <h1>
    My Todo List
  </h1>
);

class Items extends React.Component{
  constructor(){
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    axios.get('/api/items')
    .then(result => result.data)
    .then(items => this.setState({items}))
    .then(()=> {
      if(document.location.hash){
        const item = this.state.items.find( item => item.id === document.location.hash.slice(1)*1);
        this.setState({ item });
      }
    });
  }

  showItem(item){
    this.setState({ item });
    document.location.hash = item ? item.id : '';
  }

  render(){
    return (
     this.state.item ? (
       <div>
         <a onClick={ ()=> this.showItem()}>Show List</a>
         <br />
            { this.state.item.name }
       </div>
     ):
     (
      <ul>
        {
          this.state.items.map( item => <li key = { item.id } onClick = {()=> this.showItem(item)}>{ item.name }</li>)
        }
      </ul>
     )
    );
  }
}

const App = ()=> {
return (
  <div>
    <Title />
    <Items />
  </div>
);
};

render(<App />, document.getElementById('root'));
