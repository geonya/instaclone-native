import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const Container = styled.View`
	flex: 1;
	background-color: black;
`;

type CreateAccountScreenProps = NativeStackScreenProps<
	StackParamList,
	"CreateAccount"
>;
const CreateAccount = ({ navigation }: CreateAccountScreenProps) => {
	return (
		<AuthLayOut>
			<TextInput
				placeholder="First Name"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
			/>
			<TextInput
				placeholder="Last Name"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
			/>
			<TextInput
				placeholder="Username"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
			/>
			<TextInput
				keyboardType="email-address"
				placeholder="Email"
				placeholderTextColor="gray"
				returnKeyType="next"
				style={{ backgroundColor: "white", width: "100%" }}
			/>
			<TextInput
				secureTextEntry
				placeholder="Password"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="done"
			/>
			<AuthButton onPress={() => false} disabled={true} text="Create Account" />
		</AuthLayOut>
	);
};

export default CreateAccount;
