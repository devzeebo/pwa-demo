import React from 'react';
import { render } from 'react-dom';
import App from '#components/App';

document.addEventListener('DOMContentLoaded', () => {
  const mount = document.getElementById('mount');

  render(<App />, mount);
});