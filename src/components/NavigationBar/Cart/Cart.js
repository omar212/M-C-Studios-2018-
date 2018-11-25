import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import StripeCheckout from 'react-stripe-checkout';

class Cart extends Component {

    onToken = (token) => {
      fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
    }).then(response => {
            response.json().then(data => {
            alert(`We are in business, ${data.email}`);
      });
  });
  console.log(token);
}
    render() {
    return (
      <div  >
        <Bar />
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_mojnwLj2uV4tuBA4IjVK0stq"
        />
      </div>
      )
    }
}


export default Cart;
