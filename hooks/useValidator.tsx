// import React from 'react';
// import { ValidationErrors } from '../validators';

// type FirstArgument<T> = T extends ((input: infer U) => any) ? U : never;
// type Validate<Input> = (input: Input) => boolean;

// export default function useValidator<
//   Validator extends (input: Input) => ValidationErrors<Input>,
//   // TODO: Why these aliases does not work? What's wrong?
//   // Errors = ValidationErrors<Input>,
//   // Validate = (input: Input) => boolean;
//   Input = FirstArgument<Validator>
// >(validator: Validator): [Validate<Input>, ValidationErrors<Input>] {
//   const [errors, setErrors] = React.useState<ValidationErrors<Input>>({});
//   // const [refs, setRefs] = React.useState<any>({});

//   function onlyFirstError<Errors>(errors: Errors): Errors {
//     let found = false;
//     return Object.keys(errors).reduce(
//       (accumulator, key) => {
//         const error = errors[key as keyof Errors];
//         let maybeFirstError;
//         if (!found && error != null) {
//           found = true;
//           maybeFirstError = error;
//         }
//         return { ...accumulator, [key]: maybeFirstError };
//       },
//       {} as Errors,
//     );
//   }

//   const validate: Validate<Input> = input => {
//     const errors = validator(input);
//     const errorsWithFirstErrorOnly = onlyFirstError(errors);
//     setErrors(errorsWithFirstErrorOnly);
//     // setRefs({});
//     // zavolam tohle, imho se akumuluje
//     // refs[prop].focus();
//     return true;
//   };

//   return [validate, errors];
// }

// // import { MaybeValidationError } from '../validations';

// // // Tohle je taky divne.
// // type Input<T> = T extends (input: infer U) => any ? U : any;

// // type Validate<Validator> = (input: Input<Validator>) => boolean;

// // type ValidationErrors<Input> = { [P in keyof Input]?: MaybeValidationError };

// // // type Validation<Validator> = { [P in keyof Input<Validator>]: any };

// // export default function useValidator<
// //   Validator extends (
// //     input: Input<Validator>,
// //   ) => ValidationErrors<Input<Validator>>
// // >(
// //   validator: Validator,
// // ): [
// //   Validate<Validator>
// //   // Validation<Validator>
// // ] {
// //   //
// //   // const [errors, setErrors] = React.useState<ValidationErrors<ISignInInput>>

// //   const validate: Validate<Validator> = input => {
// //     // tslint:disable-next-line:no-console
// //     validator(input);
// //     return !!input;
// //   };
// //   // const validation: Validation<Validator> = {
// //   //   // email: { error: null, ref: () => null },
// //   //   // // // isFirst: { error: null, ref: () => null },
// //   //   // password: { error: null, ref: () => null },
// //   // };
// //   return [validate];
// // }

// // // const useValidator: UseValidator = validator => {

// // //   // ValidationErrors
// // //   // const [errors, setErrors] = React.useState<ValidationErrors<ISignInInput>>(
// // //   //   {},
// // //   // );
// // //   // // First error bude: useValidationErrors({ first: true }).
// // //   // const getErrors = () => {
// // //   //   let found = false;
// // //   //   return Object.keys(errors).reduce(
// // //   //     (accumulator, key) => {
// // //   //       const error = errors[key as keyof typeof accumulator];
// // //   //       let firstError;
// // //   //       if (!found && error != null) {
// // //   //         found = true;
// // //   //         firstError = error;
// // //   //       }
// // //   //       return { ...accumulator, [key]: firstError };
// // //   //     },
// // //   //     // potrebuju premapovat values
// // //   //     {} as ValidationErrors<ISignInInput>,
// // //   //   );
// // //   // };
// // //   // const firstError = getErrors();
// // //   // const errors2 = firstError;
// // //   // setErrors(errors);
// // //   // return [];
// // //   // const validation = {};
// // //   // const validate = () => {
// // //   //   return false;
// // //   // };
// // //   // return [validation, validate];
// // //   const validation = {
// // //     email: { error: null, ref: () => null },
// // //     password: { error: null, ref: () => null },
// // //   };
// // //   const validate = () => {
// // //     //
// // //   };
// // //   return [validate, validation];
// // // };

// // // export default useValidator;
