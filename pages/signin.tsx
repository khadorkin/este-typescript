import React from 'react';
import { defineMessages } from 'react-intl';
import { Platform, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import Page, { pageMessages } from '../components/Page';
import Spacer from '../components/Spacer';
import ValidationError from '../components/ValidationError';
import useIntl from '../hooks/useIntl';
import useMutation from '../hooks/useMutation';
import useTheme from '../hooks/useTheme';
import validateSignIn from '../validators/validateSignIn';

// import Router from 'next/router';
// import { setCookie } from '../../browser/cookie';

const messages = defineMessages({
  emailPlaceholder: {
    defaultMessage: 'email',
    id: 'emailPlaceholder',
  },
  passwordPlaceholder: {
    defaultMessage: 'password',
    id: 'passwordPlaceholder',
  },
  signIn: {
    defaultMessage: 'Sign In',
    id: 'signIn',
  },
  signUp: {
    defaultMessage: 'Sign Up',
    id: 'signUp',
  },
});

// TODO: Use GraphQL endpoint generated type.
export interface ISignInInput {
  createAccount: boolean;
  email: string;
  password: string;
}

const SignIn: React.FunctionComponent = () => {
  const intl = useIntl();
  const title = intl.formatMessage(pageMessages.pageTitleSignIn);
  const theme = useTheme();
  const [mutation, commit] = useMutation<ISignInInput>(
    {
      createAccount: false,
      email: '',
      password: '',
    },
    {
      validator: validateSignIn,
    },
  );

  //   function onSuccess(auth) {
  //     const { token } = auth;
  //     if (token == null) return;
  //     setCookie({ token });
  //     // TODO: Typed useRouter.
  //     if (Router.query.redirectUrl) {
  //       Router.replace(Router.query.redirectUrl);
  //     } else if (props.redirectUrl) {
  //       // $FlowFixMe Wrong libdef.
  //       Router.replace(props.redirectUrl);
  //     } else {
  //       // $FlowFixMe Wrong libdef.
  //       Router.replace({
  //         pathname: Router.pathname,
  //         query: Router.query,
  //       });
  //     }
  //   }

  const signIn = (createAccount = false) => {
    commit(input => ({
      ...input,
      createAccount,
    }));
  };

  return (
    <Page title={title}>
      <Text style={theme.heading1}>{title}</Text>
      <TextInput
        {...mutation.email.textInput}
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        keyboardType="email-address"
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { autoComplete: 'email', name: 'email' },
        })}
      />
      <ValidationError error={mutation.email.error} />
      <TextInput
        {...mutation.password.textInput}
        placeholder={intl.formatMessage(messages.passwordPlaceholder)}
        secureTextEntry
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'password' },
        })}
      />
      <ValidationError error={mutation.password.error} />
      <View style={theme.row}>
        <Spacer>
          <Button
            type="primary"
            label={intl.formatMessage(messages.signIn)}
            onPress={() => signIn()}
          />
          <Button
            type="secondary"
            label={intl.formatMessage(messages.signUp)}
            onPress={() => signIn(true)}
          />
        </Spacer>
      </View>
    </Page>
  );
};

export default SignIn;
