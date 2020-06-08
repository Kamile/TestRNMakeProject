import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { CrashTestButton } from '../CrashTestButton';

describe('CrashTestButton component', () => {
  it('should throw an error', async () => {
    const cheatCodes = render(<CrashTestButton />);
    const Button = cheatCodes.getByText('Crash the app');
    expect(() => fireEvent.press(Button)).toThrow('Test crash');
  });
});
