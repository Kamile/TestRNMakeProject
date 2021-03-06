import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import I18nJS from 'i18n-js';
import { Home } from '../Home.component';

describe('Home component', () => {
  const navigation = {
    navigate: jest.fn(),
  } as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  it('should render correctly', () => {
    const home = render(<Home navigation={navigation} />);
    expect(home).toMatchSnapshot();
  });

  it('should have a button to go to the Login', () => {
    const home = render(<Home navigation={navigation} />);
    const LoginButton = home.getByText(I18nJS.t('home.loginButton'));
    fireEvent.press(LoginButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
