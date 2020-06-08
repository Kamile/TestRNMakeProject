import Config from '@bam.tech/react-native-config';

interface Environment {
  ENV: string;
  API_ENDPOINT: string;
  WEBSOCKET_ENDPOINT: string;
  FEATURE_FLAG_CHEAT_CODES: boolean;
  FEATURE_FLAG_CODE_PUSH: boolean;
  FEATURE_FLAG_CODE_PUSH_MANUAL: boolean;
}

export const env = Config as Environment;
