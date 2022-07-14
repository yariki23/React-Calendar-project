import React from 'react';

import './header.scss';

//1. делаем обработчик событий 
//2. передать функцию на компоненту навигатор 
//3. записать данные в стейт
//4. 
//5.

const Header = () => {
  return (
    <header className="header">
      <button className="button create-event-btn" >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button">Today</button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month"></span>
      </div>
    </header>
  );
};

export default Header;
