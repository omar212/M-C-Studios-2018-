import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import {Id, Name} from '../../Movie/MoviesToAdd';
import { connect } from 'react-redux';
// import '../elements/MovieInfo/MovieInfo.css';
import StripeCheckout from 'react-stripe-checkout';


// const Cart = (props) => {
//   return(
//     <div>
//       {props.addCart.map((element, i) => {
//         return <p key={i} className="rmdb-director">{element.name}</p>
//       })}
//     </div>
//   );
// }
class Cart extends Component {
  // constructor(props){
  //   super();
  //   this.state = {
  //       MovieCart: [
  //         {
  //           id: null,
  //           name: ''
  //         }
  //       ]
  //    };
  // }

  render(){

    return(
      <div>
        <Bar />
      {/* <h1>look at this {this.state.counter}</h1> */}

        {/* <ul>
          {this.props.storedResults.map(movie => (
              <li key = {movie.id}>{movie.value}</li>
          ))}
        </ul> */}
      {/* <h1>{this.props.id}</h1> */}
      {/* <h1>This is finally the {this.state.id} </h1> */}
      {/* {this.props.MovieCart.map((movie) => {
       return (<div>{movie.id}</div>);
     })}; */}

      {/* <h1>this is the {this.props.movieId} and {this.props.MovieCart.name}</h1>
      <h1>this is the {this.props.MovieCart.map((name,id,i) =>
          <li key = {i}>
            {name}:{id}
          </li>
      </h1> */}
      {/* <ul>
        {this.props.MovieCart.map((name,id) => <li>{name} : {id}</li>)}
      </ul> */}
      {/* {console.log(this.MovieId)} */}
      </div>
    );
  }
}

export default connect()(Cart);


//     onToken = (token) => {
//       fetch('/save-stripe-token', {
//         method: 'POST',
//         body: JSON.stringify(token),
//     }).then(response => {
//             response.json().then(data => {
//             alert(`We are in business, ${data.email}`);
//       });
//   });
//   console.log(token);
// }
//     render() {
//     return (
//       <div  >
//         <Bar />
//       <StripeCheckout
//         token={this.onToken}
//         stripeKey="pk_test_mojnwLj2uV4tuBA4IjVK0stq"
//         />
//       </div>
//       )
//     }
