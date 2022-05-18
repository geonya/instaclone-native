import { gql } from "@apollo/client";

gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
	mutation createAccount(
		$firstName: String!
		$username: String!
		$email: String!
		$password: String!
		$lastName: String
	) {
		createAccount(
			firstName: $firstName
			username: $username
			email: $email
			password: $password
			lastName: $lastName
		) {
			ok
			error
		}
	}
`;
