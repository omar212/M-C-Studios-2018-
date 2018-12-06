import React from 'react';
import './MovieInfoBar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faClock, faMoneyBillAlt, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { calcTime, convertMoney } from '../../../helpers.js'; {/*Functions to convert time and money */}


library.add(faFilm, faClock, faMoneyBillAlt, faTicketAlt);

{/*Information about movie such as length of the movie, the budget*/}
const MovieInfoBar = (props) => {
  return(
    <div className="rmdb-movieinfobar">
      <div className="rmdb-movieinfobar-content">
        <div className="rmdb-movieinfobar-content-col">
          <span className="fa-time">
            <FontAwesomeIcon icon="clock" size="2x"/>
          </span>
          <span className="rmdb-movieinfobar-info">Running time: {calcTime(props.time)}</span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
          <span className="fa-budget">
            <FontAwesomeIcon icon="money-bill-alt" size="2x"/>
          </span>
            <span className="rmdb-movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
        </div>
        <div className="rmdb-movieinfobar-content-col">
            <span className="fa-revenue">
                <FontAwesomeIcon  icon="ticket-alt" size="2x"/>
            </span>
          <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(props.revenue)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoBar;
