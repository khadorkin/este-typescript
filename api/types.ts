export type Maybe<T> = T | null;

/** https://medium.com/graphql-mastery/json-as-an-argument-for-graphql-mutations-and-queries-3cd06d252a04 */
export interface SignInInput {
  readonly email: string;

  readonly password: string;

  readonly createAccount: boolean;
}

export type EmailError = 'REQUIRED' | 'EMAIL' | 'ALREADY_EXISTS' | 'NOT_EXISTS';

export type PasswordError =
  | 'REQUIRED'
  | 'MIN_5_CHARS'
  | 'MAX_1024_CHARS'
  | 'WRONG_PASSWORD';

export type DateTime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  readonly me: Maybe<User>;
}

export interface User {
  readonly id: string;

  readonly createdAt: DateTime;

  readonly updatedAt: DateTime;

  readonly email: string;
}

export interface Mutation {
  readonly signIn: Maybe<SignInPayload>;
}

export interface SignInPayload {
  readonly errors: Maybe<SignInErrors>;

  readonly token: Maybe<string>;
}

export interface SignInErrors {
  readonly email: Maybe<EmailError>;

  readonly password: Maybe<PasswordError>;
}

// ====================================================
// Arguments
// ====================================================

export interface SignInMutationArgs {
  input: SignInInput;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export interface SubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<Result, Parent, Context, Args>)
  | SubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo,
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface QueryResolvers<Context = {}, TypeParent = {}> {
  me?: QueryMeResolver<Maybe<User>, TypeParent, Context>;
}

export type QueryMeResolver<
  R = Maybe<User>,
  Parent = {},
  Context = {}
> = Resolver<R, Parent, Context>;

export interface UserResolvers<Context = {}, TypeParent = User> {
  id?: UserIdResolver<string, TypeParent, Context>;

  createdAt?: UserCreatedAtResolver<DateTime, TypeParent, Context>;

  updatedAt?: UserUpdatedAtResolver<DateTime, TypeParent, Context>;

  email?: UserEmailResolver<string, TypeParent, Context>;
}

export type UserIdResolver<R = string, Parent = User, Context = {}> = Resolver<
  R,
  Parent,
  Context
>;
export type UserCreatedAtResolver<
  R = DateTime,
  Parent = User,
  Context = {}
> = Resolver<R, Parent, Context>;
export type UserUpdatedAtResolver<
  R = DateTime,
  Parent = User,
  Context = {}
> = Resolver<R, Parent, Context>;
export type UserEmailResolver<
  R = string,
  Parent = User,
  Context = {}
> = Resolver<R, Parent, Context>;

export interface MutationResolvers<Context = {}, TypeParent = {}> {
  signIn?: MutationSignInResolver<Maybe<SignInPayload>, TypeParent, Context>;
}

export type MutationSignInResolver<
  R = Maybe<SignInPayload>,
  Parent = {},
  Context = {}
> = Resolver<R, Parent, Context, MutationSignInArgs>;
export interface MutationSignInArgs {
  input: SignInInput;
}

export interface SignInPayloadResolvers<
  Context = {},
  TypeParent = SignInPayload
> {
  errors?: SignInPayloadErrorsResolver<
    Maybe<SignInErrors>,
    TypeParent,
    Context
  >;

  token?: SignInPayloadTokenResolver<Maybe<string>, TypeParent, Context>;
}

export type SignInPayloadErrorsResolver<
  R = Maybe<SignInErrors>,
  Parent = SignInPayload,
  Context = {}
> = Resolver<R, Parent, Context>;
export type SignInPayloadTokenResolver<
  R = Maybe<string>,
  Parent = SignInPayload,
  Context = {}
> = Resolver<R, Parent, Context>;

export interface SignInErrorsResolvers<
  Context = {},
  TypeParent = SignInErrors
> {
  email?: SignInErrorsEmailResolver<Maybe<EmailError>, TypeParent, Context>;

  password?: SignInErrorsPasswordResolver<
    Maybe<PasswordError>,
    TypeParent,
    Context
  >;
}

export type SignInErrorsEmailResolver<
  R = Maybe<EmailError>,
  Parent = SignInErrors,
  Context = {}
> = Resolver<R, Parent, Context>;
export type SignInErrorsPasswordResolver<
  R = Maybe<PasswordError>,
  Parent = SignInErrors,
  Context = {}
> = Resolver<R, Parent, Context>;

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason: string;
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: 'DateTime';
}

export interface Resolvers {
  Query?: QueryResolvers;
  User?: UserResolvers;
  Mutation?: MutationResolvers;
  SignInPayload?: SignInPayloadResolvers;
  SignInErrors?: SignInErrorsResolvers;
  DateTime?: GraphQLScalarType;
}

export interface DirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
