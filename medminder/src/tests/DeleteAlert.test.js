import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteAlert from '../components/DeleteAlert';

// Mock AuthContext
jest.mock('../components/AuthContext', () => ({
  useAuthContext: () => ({
    currentUser: {
      uid: 'testUserId',
    },
  }),
}));

// Mock firebase.utils and remove function
jest.mock('../utils/firebase.utils', () => ({
  database: {
    ref: jest.fn(),
  },
}));
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  remove: jest.fn(),
}));

describe('DeleteAlert', () => {
  test('renders without error', () => {
    render(<DeleteAlert timestamp="123456789" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  test('calls delete function on button click', async () => {
    render(<DeleteAlert timestamp="123456789" />);

    // Mock window.confirm to return true
    const confirmMock = jest.spyOn(window, 'confirm');
    confirmMock.mockImplementation(() => true);

    // Trigger button click
    fireEvent.click(screen.getByTestId('delete-icon'));

    // Check if remove function is called
    expect(jest.requireMock('firebase/database').remove).toHaveBeenCalledWith(
        jest.requireMock('../utils/firebase.utils').database.ref());
  });

  test('does not call delete function on button click if user cancels', async () => {
    render(<DeleteAlert timestamp="123456789" />);

    // Trigger button click
    fireEvent.click(screen.getByTestId('delete-icon'));

    // Mock window.confirm to return false
    const confirmMock = jest.spyOn(window, 'confirm');
    confirmMock.mockImplementation(() => false);

    // Check if remove function is not called
    expect(jest.requireMock('../utils/firebase.utils').database.ref).not.toHaveBeenCalled();
    expect(jest.requireMock('firebase/database').remove).not.toHaveBeenCalled();
  });
});
