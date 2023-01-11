/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  signin: SignInPayoad;
  signup: SignUpPayoad;
};


export type MutationSigninArgs = {
  userIdentity: UserIdentityInput;
};


export type MutationSignupArgs = {
  userIdentity: UserIdentityInput;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<User>>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserErrorsType = {
  __typename?: 'UserErrorsType';
  message: Scalars['String'];
};

export type SignInPayoad = {
  __typename?: 'signInPayoad';
  token?: Maybe<Scalars['String']>;
  userErrors: Array<UserErrorsType>;
};

export type SignUpPayoad = {
  __typename?: 'signUpPayoad';
  token?: Maybe<Scalars['String']>;
  userErrors: Array<UserErrorsType>;
};

export type UserIdentityInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type SigninMutationVariables = Exact<{
  userIdentity: UserIdentityInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'signInPayoad', token?: string | null, userErrors: Array<{ __typename?: 'UserErrorsType', message: string }> } };


export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIdentity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"userIdentityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIdentity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIdentity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userErrors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;