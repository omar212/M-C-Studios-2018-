import React, { Component } from 'react';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from '../../App/App';
import './Bar.css';


class Bar extends Component  {
  render(){
    return(
        <Layout fixedHeader>
          <Header style={{backgroundColor: 'black'}} title={'Just Chill'}>
             <Navigation>
                <Link to="/">Home Page</Link>
                <Link to="/WishList">Wish List</Link>
                <Link to="/Cart">Cart</Link>
            </Navigation>
          </Header>
        <Content>
        </Content>
      </Layout>
    );
  }
}

export default Bar;
