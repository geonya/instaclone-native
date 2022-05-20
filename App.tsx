import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { cache, isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const [loading, setLoading] = useState(true);
	const onFinish = () => setLoading(false);
	const preLoadAssets = () => {
		const fontsToLoad = [Ionicons.font];
		const fontPromises = fontsToLoad.map((font: any) => Font.loadAsync(font));
		const imagesToLoad = [require("./assets/instagram.png")];
		const imagePromises = imagesToLoad.map((image: any) =>
			Asset.loadAsync(image)
		);
		Promise.all([...fontPromises, ...imagePromises]);
	};
	const preLoad = async () => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			isLoggedInVar(true);
			tokenVar(token);
		}
		try {
			await persistCache({
				cache: cache,
				storage: new AsyncStorageWrapper(AsyncStorage),
			});
		} catch (err) {
			console.error(err);
		}
		return preLoadAssets();
	};
	if (loading) {
		return (
			<AppLoading
				startAsync={preLoad}
				onFinish={onFinish}
				onError={console.error}
			/>
		);
	}
	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				{isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
			</NavigationContainer>
		</ApolloProvider>
	);
}
