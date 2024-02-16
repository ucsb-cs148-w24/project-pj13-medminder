import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from './Alert';


jest.mock('./DeleteAlert.jsx', () => () => <div>Mocked DeleteAlert</div>);
jest.mock('./AlertPopupWithButton/AlertPopupWithButton.jsx', () => () => <div>Mocked AlertPopupWithButton</div>);

describe('Alert component', () => {
  test('displays time in 12-hour format', () => {
    const testAlert = {
      medicineName: 'Test Medicine',
      dosageAmount: '1',
      dosageUnits: 'pill',
      time: '13:00', // 1:00 PM in 24-hour format
      timestamp: Date.now(),
    };

    render(<Alert alert={testAlert} />);

    const timeElement = screen.getByText(/1:00 PM/);
    expect(timeElement).toBeInTheDocument();
  });
});
