import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  HelperText,
  Paragraph,
  TextInput,
  useTheme,
} from 'react-native-paper';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useAlerts } from 'react-native-paper-alerts';
import { useAppSettings } from '../components/AppSettings';
import { createUser } from '../services/userService';

function CreateAccount(): JSX.Element {

  const navigation: any = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const Alert = useAlerts();

  const [help, setHelp] = useState<string>('');
  const theme = useTheme();
  const appSettings = useAppSettings();

  useEffect(() => {
    if (password === confirm) {
      setHelp('');
    } else if (password && confirm && password !== confirm) {
      setHelp(appSettings.t('passwordsDoNotMatch'));
    }
  }, [password, confirm, appSettings]);

  async function handleCreate() {
    try {
      setLoading(true);

      const credential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      credential.user.sendEmailVerification();

      const result = await createUser({
        username,
        email,
        "spins": 50,
        "spin_no": 0,
        "coins": 50000,
        "golden_ticket_owned": false,
        "golden_ticket_building": 'not yet',
        "hasFrom": Date.now(),
        'shield': 0,
        'level': 1,
        'block': 5,
        'cardInfo': {
          coin_200k: 0,         
          coin_2x: 0,           
          extra_spins_20: 0,    
          extra_spins_40: 0,    
          shield: 0,            
          shield_3x: 0,         
          steal_coin: 0,        
          steal_ticket: 0,      
          time_keeper5: 0
        }
      });
      setLoading(false);

      console.log('user created', result);
      // navigation.navigate('SignIn', {});

    } catch (e) {
      setLoading(false);
      const error = e as FirebaseAuthTypes.PhoneAuthError;
      Alert.alert(
        appSettings.t('createAccountError'),
        appSettings.t(error.code ?? 'unknownError'),
        [{ text: appSettings.t('OK') }],
      );
    }
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Paragraph>{appSettings.t('createAccountInstructions')}</Paragraph>
      <TextInput
        style={styles.input}
        mode="outlined"
        label={appSettings.t('username')}
        value={username}
        onChangeText={setUsername}
        // keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        // autoComplete="email"
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label={appSettings.t('emailLabel')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        autoFocus={true}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label={appSettings.t('passwordLabel')}
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        mode="outlined"
        label={appSettings.t('createAccountPasswordConfirmLabel')}
        value={confirm}
        error={!!confirm && password !== confirm}
        onChangeText={setConfirm}
        autoComplete="password"
      />
      <HelperText type="error" visible={!!help}>
        {help}
      </HelperText>
      <Button
        loading={loading}
        mode="contained"
        disabled={!email || !password || !confirm || !!help}
        onPress={() => (loading ? null : handleCreate())}>
        {loading
          ? appSettings.t('createAccountCreating')
          : appSettings.t('createAccountCreate')}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
});

export default CreateAccount;
