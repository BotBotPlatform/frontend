import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Register = () => (
  <div>
    <ProgressBar progress='25' />

    <img src={require('../assets/botbot-logo.png')} width="30%"/>
  </div>
)

export default Register;