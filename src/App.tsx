import React, { FunctionComponent } from 'react';
import CodePush from 'react-native-code-push'; // @codepush
import { compose } from 'recompose'; // @redux
import { RootNavigator } from './navigation';
import { withTranslation } from './hoc/withTranslation';
import { withRedux } from './hoc/withRedux'; // @redux
import { env } from './environment';
import 'react-native-gesture-handler'; // @react-navigation
import { useApolloClient } from './lib/apollo'; // @graphql
import { ApolloProvider } from '@apollo/react-hooks'; // @graphql

const codePushOptionsManual = {
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

const codePushOptionsAuto = {
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const enhance = compose<{}, {}>(withRedux, withTranslation); // @redux
const AppContainer = enhance(RootNavigator);

let App = undefined;

const AppComponent: FunctionComponent = () => {
  const apolloClient = useApolloClient(); // @graphql
  if (!apolloClient) return null; // @graphql

  return (
    <ApolloProvider client={apolloClient}>
      <AppContainer />
    </ApolloProvider>
  );
};

// @codepush
App = env.FEATURE_FLAG_CODE_PUSH
  ? CodePush(env.FEATURE_FLAG_CODE_PUSH_MANUAL ? codePushOptionsManual : codePushOptionsAuto)(
      AppComponent
    )
  : AppComponent;

export { App };
