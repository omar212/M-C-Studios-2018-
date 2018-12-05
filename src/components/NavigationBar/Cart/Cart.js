import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

class Cart extends Component {


  render(){

    return(
      <div>
        <Bar />
      </div>
    );
  }
}

export default Cart;


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
