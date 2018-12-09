import React, { Component } from 'react';
import Bar from '../../elements/Bar/Bar';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

class CheckoutButton extends Component {

    onToken = (token) => {
      fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
    }).then(response => {
            response.json().then(data => {
            alert(`We are in business, ${data.email}`);
      });
    });
  }
  render(){
    return (
          <div style={{marginLeft: '42%'}} >
            <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_mojnwLj2uV4tuBA4IjVK0stq"
            />
         </div>
        )
  }
}


export default CheckoutButton;
