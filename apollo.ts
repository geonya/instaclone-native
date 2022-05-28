import { ApolloClient, InMemoryCache, makeVar, split } from "@apollo/client";
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

const uploadHttpLink = createUploadLink({
	uri: "http://localhost:4000/graphql",
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

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const wsLink = new GraphQLWsLink(
	createClient({
		url: "ws://localhost:4000/graphql",
		keepAlive: 10_000,
		connectionParams: () => ({
			token: tokenVar(),
		}),
	})
);

// http - ws url 전환용
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLinks
);

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
		Room: {
			fields: {
				messages: {
					merge: (existing = [], incoming) => [...existing, ...incoming],
				},
			},
		},
	},
});

const client = new ApolloClient({
	link: splitLink,
	cache,
});

export default client;
