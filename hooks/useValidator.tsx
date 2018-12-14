type Input<T> = T extends (input: infer U) => any ? U : any;

type Validate<Validator> = (input: Input<Validator>) => boolean;

// type Validation<Validator> = { [P in keyof Validator]: any };
// @ts-ignore
type Validation<Validator> = any;

export default function useValidator<Validator>(
  validator: Validator,
): [Validate<Validator>, Validation<Validator>] {
  const validate: Validate<Validator> = input => {
    // tslint:disable-next-line:no-console
    console.log(validator);
    return !!input;
  };
  const validation: Validation<Validator> = {
    email: { error: null, ref: () => null },
    // // // isFirst: { error: null, ref: () => null },
    password: { error: null, ref: () => null },
  };
  return [validate, validation];
}

// const useValidator: UseValidator = validator => {

//   // ValidationErrors
//   // const [errors, setErrors] = React.useState<ValidationErrors<ISignInInput>>(
//   //   {},
//   // );
//   // // First error bude: useValidationErrors({ first: true }).
//   // const getErrors = () => {
//   //   let found = false;
//   //   return Object.keys(errors).reduce(
//   //     (accumulator, key) => {
//   //       const error = errors[key as keyof typeof accumulator];
//   //       let firstError;
//   //       if (!found && error != null) {
//   //         found = true;
//   //         firstError = error;
//   //       }
//   //       return { ...accumulator, [key]: firstError };
//   //     },
//   //     // potrebuju premapovat values
//   //     {} as ValidationErrors<ISignInInput>,
//   //   );
//   // };
//   // const firstError = getErrors();
//   // const errors2 = firstError;
//   // setErrors(errors);
//   // return [];
//   // const validation = {};
//   // const validate = () => {
//   //   return false;
//   // };
//   // return [validation, validate];
//   const validation = {
//     email: { error: null, ref: () => null },
//     password: { error: null, ref: () => null },
//   };
//   const validate = () => {
//     //
//   };
//   return [validate, validation];
// };

// export default useValidator;
