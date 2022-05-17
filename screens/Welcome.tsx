import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StackParamList } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	background-color: black;
`;
const Logo = styled.Image`
	max-width: 50%;
	max-height: 150px;
`;

const CreateAccount = styled.View`
	background-color: ${colors.blue};
	padding: 5px 10px;
	border-radius: 3px;
	margin-bottom: 10px;
`;

const CreateAccountText = styled.Text`
	color: white;
`;

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
		<Container>
			<Logo resizeMode="contain" source={require("../assets/instagram.png")} />
			<TouchableOpacity onPress={goToCreateAccount}>
				<CreateAccount>
					<CreateAccountText>Create Account</CreateAccountText>
				</CreateAccount>
				<TouchableOpacity onPress={goToLogin}>
					<LoginLink>Log In</LoginLink>
				</TouchableOpacity>
			</TouchableOpacity>
		</Container>
	);
};

export default Welcome;
