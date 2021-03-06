import React from 'react';
import { render, act } from 'react-native-testing-library';
import { CheatCodes } from '../CheatCodes.component';
import { env } from '../../../environment';

jest.mock('../../../environment', () => ({
  env: {
    FEATURE_FLAG_CODE_PUSH: true,
  },
}));

describe('CheatCodes component', () => {
  const navigation = {
    dispatch: jest.fn(),
  } as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  it('should have a button to go to the Login', async () => {
    const cheatCodes = render(<CheatCodes navigation={navigation} />);
    expect(cheatCodes).toMatchSnapshot();
  });

  it('should have a button to go to the Login', async () => {
    const cheatCodes = render(<CheatCodes navigation={navigation} />);

    cheatCodes.getByText('Check update');
    const Picker = cheatCodes.getByTestId('changeLanguagePicker');
    act(() => {
      Picker.props.onValueChange('EN');
    });

    expect(navigation.dispatch).toHaveBeenCalled();
  });

  it('should have a button to go to the Login', async () => {
    env.FEATURE_FLAG_CODE_PUSH = false;
    const cheatCodes = render(<CheatCodes navigation={navigation} />);
    expect(() => cheatCodes.getByText('Check update')).toThrowError();
  });
});
