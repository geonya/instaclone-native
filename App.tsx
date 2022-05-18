import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const [loading, setLoading] = useState(true);
	const onFinish = () => setLoading(false);
	const preLoad = async () => {
		const fontsToLoad = [Ionicons.font];
		const fontPromises = fontsToLoad.map((font: any) => Font.loadAsync(font));
		const imagesToLoad = [
			require("./assets/instagram.png"),
			"https://instaclone-uploadssssssssss.s3.ap-northeast-2.amazonaws.com/instagram.png",
		];
		const imagePromises = imagesToLoad.map((image: any) =>
			Asset.loadAsync(image)
		);
		await Promise.all([...fontPromises, ...imagePromises]);
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
