import { gql } from "@apollo/client";
import { getClient } from "../api";

const REGISTER = gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

export async function register({
  username,
  email,
  password,
  name,
}: {
  username: string;
  email: string;
  password: string;
  name: string;
}) {
  const client = getClient();
  const { data } = await client.mutate({
    mutation: REGISTER,
    variables: { username, email, password, name },
  });
  console.log(data);
  return data.signup.token;
}
