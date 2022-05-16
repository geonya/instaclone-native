import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	const [loading, setLoading] = useState(true);
	const onFinish = () => setLoading(false);
	const preLoad = async () => {
		const fontToload = [Ionicons.font];
		const fontPromises = fontToload.map((font: any) => Font.loadAsync(font));
		await Promise.all(fontPromises);
	};
	if (loading) {
		return (
			<AppLoading
				startAsync={preLoad}
				onFinish={onFinish}
				onError={console.warn}
			/>
		);
	}
	return (
		<View style={styles.container}>
			<Text>Hello!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
