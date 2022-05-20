import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

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

const httpLink = createHttpLink({
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
	link: authLink.concat(httpLink),
	cache,
});

export default client;
