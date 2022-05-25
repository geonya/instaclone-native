import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	makeVar,
	split,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getMainDefinition,
	offsetLimitPagination,
} from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";
const LOGGED_IN = "loggedIn";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
	try {
		await AsyncStorage.multiSet([
			[TOKEN, token],
			[LOGGED_IN, "true"],
		]);
	} catch (err) {
		console.error(err);
	}
	isLoggedInVar(true);
	tokenVar(token);
};

export const logUserOut = async () => {
	await AsyncStorage.multiRemove([TOKEN, LOGGED_IN]);
	tokenVar("");
	isLoggedInVar(false);
};

const httpLink = createHttpLink({});

const uploadHttpLink = createUploadLink({
	uri: "https://d167-121-135-2-226.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			token: tokenVar(),
		},
	};
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		console.log(graphQLErrors);
	}
	if (networkError) {
		console.log(networkError);
	}
});

const link = authLink.concat(onErrorLink).concat(uploadHttpLink);

// const wsLink = new GraphQLWsLink(
// 	createClient({
// 		url: "ws://localhost:4000/graphql",
// 		connectionParams: {
// 			token: tokenVar(),
// 		},
// 	})
// );

// http - ws url 전환용
// const splitLink = split(
// 	({ query }) => {
// 		const definition = getMainDefinition(query);
// 		return (
// 			definition.kind === "OperationDefinition" &&
// 			definition.operation === "subscription"
// 		);
// 	},
// 	wsLink,
// 	authHttpLink
// );

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				seeFeed: offsetLimitPagination(),
			},
		},
		User: {
			keyFields: (obj) => `User:${obj.username}`,
		},
	},
});

const client = new ApolloClient({
	link,
	cache,
});

export default client;
