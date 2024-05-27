"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
const USER_QUERY = gql`
  query Query {
    users {
      email
    }
  }
`;
function Test() {
  const { data, loading, error } = useQuery(USER_QUERY, {
    context: {
      headers: {
        // Authorization: `Bearer ${JSON.parse(jwtToken!)}`,
      },
    },
  });
  if (loading) {
    return <div>loading.....</div>;
  }
  if (error) {
    console.log(error);
  }

  console.log(data);
  return <div>Test</div>;
}

export default Test;
