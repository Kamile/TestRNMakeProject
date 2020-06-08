import React, { FunctionComponent } from 'react';
import { Button, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; // @redux
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import I18nJS from 'i18n-js';

import { CheatCodesButton } from '../../atoms/CheatCodesButton';
import { RootStackParamList } from '../../navigation';
import { isLoadingSelector } from '../../redux/LoadingStatus/selectors'; // @redux
import { startLoading, finishLoading } from '../../redux/LoadingStatus'; // @redux
import { setToken } from '../../redux/Authentication'; // @redux
import { tokenSelector } from '../../redux/Authentication/selectors'; // @redux-persist-sensitive

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
const LOADER_NAME = 'demoLoader';

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};
export const Login: FunctionComponent<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector(LOADER_NAME));
  const authenticationToken = useSelector(tokenSelector);

  const goToHomePage = (): void => {
    navigation.navigate('Home');
  };

  const toggleLoader = () => {
    if (!isLoading) {
      dispatch(startLoading(LOADER_NAME));
    } else {
      dispatch(finishLoading(LOADER_NAME));
    }
  };

  const generateAuthenticationToken = () => {
    const randomToken = `token-${Math.floor(Math.random() * 100 + 1)}`;
    dispatch(setToken(randomToken));
  };

  return (
    <View style={styles.container}>
      <Text>{I18nJS.t('login.title')}</Text>
      <Button title={I18nJS.t('login.homeButton')} onPress={goToHomePage} />
      <CheatCodesButton navigation={navigation} />
      <Text>{I18nJS.t('login.redux')}</Text>
      <Button title={I18nJS.t('login.token')} onPress={generateAuthenticationToken} />
      <Text>{authenticationToken}</Text>
      <Button title={I18nJS.t('login.loader')} onPress={toggleLoader} />
      {isLoading && <ActivityIndicator testID="demoLoader" />}
      <Text>{route.params.userId}</Text>
    </View>
  );
};
