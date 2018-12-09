import React, { Component } from 'react';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from '../../App/App';
import './Bar.css';


class Bar extends Component  {
  render(){
    return(
      <div style={{height: '50px', position: 'relative', fontSize: '30px'}}>
        <Layout fixedHeader>
          <Header style={{backgroundColor: 'black'}} title={<span style={{ margin: '20px' , fontSize: '30px' , fontFamily: 'Petit Formal Script, cursive'}}>Just Chill</span>}>
             <Navigation className="Navigation">
                <Link to="/">Home Page</Link>
                <Link to="/WishList">Wish List</Link>
                <Link to="/Cart">Cart</Link>
                
            </Navigation>
          </Header>
        <Content>
        </Content>
      </Layout>
    </div>
    );
  }
}

export default Bar;
