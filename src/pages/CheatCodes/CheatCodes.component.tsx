import React, { FunctionComponent } from 'react';
import { View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import I18nJS from 'i18n-js';

import { CodePushButton } from './components/CodePushButton';
import { CrashTestButton } from './components/CrashTestButton';
import { ChangeLanguage } from './components/ChangeLanguage';
import { env } from '../../environment';
import { RootStackParamList } from '../../navigation';

type CheatCodesNavigationProp = StackNavigationProp<RootStackParamList, 'CheatCodes'>;

type Props = {
  navigation: CheatCodesNavigationProp;
};
export const CheatCodes: FunctionComponent<Props> = ({ navigation }) => (
  <View>
    <CrashTestButton />
    <ChangeLanguage
      onLanguageChange={() =>
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Login' }],
          })
        )
      }
    />
    {env.FEATURE_FLAG_CODE_PUSH && <CodePushButton />}
    {/* @storybook */}
    <Button
      onPress={() => navigation.navigate('Storybook')}
      title={I18nJS.t('cheatCodes.storybook')}
    ></Button>
  </View>
);
