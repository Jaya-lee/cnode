import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import moment from 'moment'
import 'moment/locale/zh-cn'
import TodoList from './Todo'
moment.locale('zh-cn')  //变成中文

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
