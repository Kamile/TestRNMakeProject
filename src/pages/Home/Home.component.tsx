import React, { FunctionComponent, useCallback } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import I18nJS from 'i18n-js';

import { RootStackParamList } from '../../navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export const Home: FunctionComponent<Props> = ({ navigation }) => {
  const goToLoginPage = useCallback((): void => {
    navigation.navigate('Login');
  }, []);
  const goToLoginPageWithParams = useCallback((): void => {
    navigation.navigate('Login', { userId: 'I have been Set by params' });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{I18nJS.t('home.title')}</Text>
      <Button title={I18nJS.t('home.loginButton')} onPress={goToLoginPage} />
      <Button title={I18nJS.t('home.loginButtonParams')} onPress={goToLoginPageWithParams} />
    </View>
  );
};
