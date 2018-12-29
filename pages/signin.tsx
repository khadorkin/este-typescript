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
import { SignInInput, SignInErrors } from '../api/types';
// import useRelayEnvironment from '../hooks/useRelayEnvironment';
// import { graphql, commitMutation } from 'react-relay';
// import { signinMutation } from '../generated/signinMutation.graphql';

// const mutation = graphql`
//   mutation signinMutation($input: SignInInput!) {
//     signIn(input: $input) {
//       token
//       errors {
//         email
//         password
//       }
//     }
//   }
// `;

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

const SignIn: React.FunctionComponent = () => {
  const theme = useTheme();
  const intl = useIntl();
  const title = intl.formatMessage(pageMessages.pageTitleSignIn);
  // const environment = useRelayEnvironment();
  const [fields, commit, errors] = useMutation<SignInInput, SignInErrors>(
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
    commit({ merge: { createAccount } });
    // const variables = {
    //   input: {
    //     createAccount,
    //     email: fields.email.textInput.value,
    //     password: fields.password.textInput.value,
    //   },
    // };
    // Predat typ {variables, response}
    // commitMutation<signinMutation>(environment, {
    //   mutation,
    //   variables,
    //   onCompleted(response, errors) {
    //     // console.log(response);
    //     // console.log(errors);
    //   },
    //   onError(error) {
    //     // console.log(error);
    //   },
    //   // onCompleted?(response: T["response"], errors: PayloadError[] | null | undefined): void;
    //   // onError?(error?: Error): void;
    // });
  };

  return (
    <Page title={title}>
      <Text style={theme.heading1}>{title}</Text>
      <TextInput
        {...fields.email.textInput}
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        keyboardType="email-address"
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { autoComplete: 'email', name: 'email' },
        })}
      />
      <ValidationError error={errors.email} />
      <TextInput
        {...fields.password.textInput}
        placeholder={intl.formatMessage(messages.passwordPlaceholder)}
        secureTextEntry
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        {...Platform.select({
          web: { name: 'password' },
        })}
      />
      <ValidationError error={errors.password} />
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
