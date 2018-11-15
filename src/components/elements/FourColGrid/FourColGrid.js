import React from 'react';
import './FourColGrid';

const FourColGrid = (props) => {

    const renderElements = () => { //loops thru all children
      const gridElements = props.children.map( (element , i) =>{
        return(
          <div key={i} className="rmdb-grid-element">
            {element}
          </div>
        )
      })
      return gridElements;
    }



    return(
      <div className="rmdb-grid">
        {props.header && !props.loading ? <h1> {props.header}</h1> : null}
        <div style = {{display: "grid", gridTemplateColumns: "auto auto auto auto", gridGap: '10px'}}>
            {renderElements()}
        </div>
      </div>
    )
}

export default FourColGrid;
