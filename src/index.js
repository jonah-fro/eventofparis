import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';

const urlparis = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&rows=50'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
}
componentDidMount(){
  this.GetEvents();
}
// permet de récupérer les données avec axios.get et de les placer à l'intérieur du .then
  GetEvents(q = ''){
   axios.get(urlparis, { params : { q } }).then((res) => {
    this.setState({ data: res.data.records});    
    });
  }

  render() {
    return (
      <div>
        <input onChange={(e) => { 
          this.GetEvents(e.target.value) 
        }}/>
        <div> {this.state.data.map( (event) => {
          <div> {event.fields.title} </div>
            })
        } 
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
