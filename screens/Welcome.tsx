import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";

type WelcomeScreenProps = NativeStackScreenProps<StackParamList, "Welcome">;

const Welcome = ({ navigation }: WelcomeScreenProps) => {
	return (
		<View>
			<Text>Welcome</Text>
			<TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
				<View>
					<Text>Go To Create Account</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<View>
					<Text>Go To Login</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Welcome;
