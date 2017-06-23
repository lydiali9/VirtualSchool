import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Bulletin-Board/Board';

ReactDOM.render(
  <Board count={50} />,
  document.getElementById('react-container')
);
