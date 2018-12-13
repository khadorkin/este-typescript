import React from 'react';
import useIntl from '../hooks/useIntl';
import Page, { pageMessages } from '../components/Page';
import useTheme from '../hooks/useTheme';
import { Text, TextInput, Platform, View } from 'react-native';
import { defineMessages } from 'react-intl';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import validateSignIn, { ISignInInput } from '../validators/validateSignIn';
import FieldErrorMessage, {
  FieldErrors,
} from '../components/FieldErrorMessage';

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
  const intl = useIntl();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const theme = useTheme();
  const title = intl.formatMessage(pageMessages.pageTitleSignIn);
  // TODO: Custom Hook.
  const [errors, setErrors] = React.useState<FieldErrors<ISignInInput>>({});

  const signIn = (isFirst = false) => {
    const input = { email, password, isFirst };
    const errors = validateSignIn(input);
    setErrors(errors);
  };

  return (
    <Page title={title}>
      <Text style={theme.heading1}>{title}</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={intl.formatMessage(messages.emailPlaceholder)}
        keyboardType="email-address"
        // editable={pending}
        // error={errors && errors.email}
        // focusOnError={errors}
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        blurOnSubmit={false}
        {...Platform.select({
          web: {
            autoComplete: 'email',
            name: 'email',
          },
        })}
      />
      <FieldErrorMessage error={errors.email} />
      {/* <Text style={theme.text}>error</Text> */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={intl.formatMessage(messages.passwordPlaceholder)}
        secureTextEntry
        // editable
        // error={errors && errors.password}
        // focusOnError={errors}
        onSubmitEditing={() => signIn()}
        style={theme.textInputOutline}
        blurOnSubmit={false}
        {...Platform.select({
          web: {
            name: 'password',
          },
        })}
      />
      <FieldErrorMessage error={errors.password} />
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

// // @flow
// import React, { useState } from 'react';
// import { View } from 'react-native';
// import Heading from './Heading';
// import Block from './Block';
// import TextInput from './TextInput';
// import Row from './Row';
// import { SignInButton, SignUpButton } from './buttons';
// import { defineMessages } from 'react-intl';
// import type { Href } from '../../browser/sitemap';
// import useIntl from '../../hooks/useIntl';
// import { useAuthMutation } from '../../mutations/AuthMutation';
// import Router from 'next/router';
// import { setCookie } from '../../browser/cookie';

// type AuthProps = {|
//   redirectUrl?: Href,
// |};

// export default function Auth(props: AuthProps) {
//   const intl = useIntl();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [commit, errors, pending] = useAuthMutation();

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

//   function auth(isSignUp = false) {
//     commit({ email, password, isSignUp }, onSuccess);
//   }

//   return (
//     <View>
//       <Heading size={1}>Auth</Heading>
//       <Block>
//         <TextInput
//           autoComplete="email"
//           disabled={pending}
//           error={errors && errors.email}
//           focusOnError={errors}
//           keyboardType="email-address"
//           name="email"
//           onChangeText={setEmail}
//           placeholder={intl.formatMessage(messages.emailPlaceholder)}
//           value={email}
//           onSubmitEditing={() => auth()}
//         />
//         <TextInput
//           disabled={pending}
//           error={errors && errors.password}
//           focusOnError={errors}
//           name="password"
//           onChangeText={setPassword}
//           placeholder={intl.formatMessage(messages.passwordPlaceholder)}
//           secureTextEntry
//           value={password}
//           onSubmitEditing={() => auth()}
//         />
//         <Row>
//           <SignInButton
//             disabled={pending}
//             onPress={() => auth()}
//             color="primary"
//           />
//           <SignUpButton
//             disabled={pending}
//             onPress={() => auth(true)}
//             color="primary"
//           />
//         </Row>
//       </Block>
//     </View>
//   );
// }
