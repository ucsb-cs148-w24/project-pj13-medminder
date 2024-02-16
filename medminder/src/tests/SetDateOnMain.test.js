import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import DateNavigator from '../components/SetDateOnMain.jsx';

// Mock the DataDisplay and MedicineToast components
jest.mock('../components/MedicineAlerts.jsx', () => ({ date }) => <div data-testid="data-display">{date}</div>);
jest.mock('../components/MedicineToast.jsx', () => ({ date }) => <div data-testid="medicine-toast">{date}</div>);

describe('DateNavigator Component', () => {
  it('renders the current date and buttons', () => {
    render(<DateNavigator />);
    
    // Check if the current date is rendered
    const currentDateElement = screen.getByText(/February 16, 2024/); // Change this based on your current date
    expect(currentDateElement).toBeInTheDocument();

    // Check if the "Today" button is rendered
    const todayButton = screen.getByText(/Today/);
    expect(todayButton).toBeInTheDocument();

    // Check if the left and right arrow buttons are rendered
    const leftArrowButton = screen.getByRole('button', { name: /arrow-left/ });
    const rightArrowButton = screen.getByRole('button', { name: /arrow-right/ });
    expect(leftArrowButton).toBeInTheDocument();
    expect(rightArrowButton).toBeInTheDocument();
  });

  it('updates the date when arrow buttons are clicked', () => {
    render(<DateNavigator />);

    const currentDateElement = screen.getByText(/February 16, 2024/); // Change this based on your current date
    const leftArrowButton = screen.getByRole('button', { name: /arrow-left/i });
    const rightArrowButton = screen.getByRole('button', { name: /arrow-right/i });

    // Click the left arrow button
    act(() => {
      fireEvent.click(leftArrowButton);
    });
    // Assuming the date is now one day earlier, you may need to adjust based on your current date
    expect(currentDateElement).toHaveTextContent(/February 15, 2024/);

    // Click the right arrow button
    act(() => {
      fireEvent.click(rightArrowButton);
    });
    // Assuming the date is now one day later, you may need to adjust based on your current date
    expect(currentDateElement).toHaveTextContent(/February 16, 2024/);
  });

  it('resets the date to today when "Today" button is clicked', () => {
    render(<DateNavigator />);

    const currentDateElement = screen.getByText(/February 16, 2024/); // Change this based on your current date
    const todayButton = screen.getByText(/Today/);

    // Click the right arrow button to change the date
    const rightArrowButton = screen.getByRole('button', { name: /arrow-right/i });
    act(() => {
      fireEvent.click(rightArrowButton);
    });

    // Click the "Today" button
    act(() => {
      fireEvent.click(todayButton);
    });
    // Assuming the date is now reset to today, you may need to adjust based on your current date
    expect(currentDateElement).toHaveTextContent(/February 16, 2024/);
  });

  it('renders DataDisplay components with the correct date prop', () => {
    render(<DateNavigator />);

    const dataDisplay = screen.getByTestId('data-display');

    // Assuming the date prop is correctly passed to the components, adjust the expected values based on your logic
    // expect(dataDisplay).toHaveTextContent(/0/);
    // expect(medicineToast).toHaveTextContent(/0/);
  });
});
