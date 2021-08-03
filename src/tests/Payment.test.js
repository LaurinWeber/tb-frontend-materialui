import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Payment from '../views/customer/Payment';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  container = null;
});


it("check if payment component displays", () => {
  //Act
  act(() => { 
    render(<Payment/>, container); 
  });
  //Assert
  expect(container.Payment).toBeInTheDocument});

