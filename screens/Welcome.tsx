import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackParamList } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
	text-align: center;
	color: ${colors.blue};
	font-size: 15px;
	font-weight: 600;
`;

type WelcomeScreenProps = NativeStackScreenProps<StackParamList, "Welcome">;

const Welcome = ({ navigation }: WelcomeScreenProps) => {
	const goToCreateAccount = () => navigation.navigate("CreateAccount");
	const goToLogin = () => navigation.navigate("Login");
	return (
		<AuthLayOut>
			<AuthButton
				onPress={goToCreateAccount}
				text="Create New Account"
				disabled={false}
				loading={false}
			/>
			<TouchableOpacity onPress={goToLogin}>
				<LoginLink>Log In</LoginLink>
			</TouchableOpacity>
		</AuthLayOut>
	);
};

export default Welcome;
