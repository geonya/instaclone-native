import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, TextInputProps } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";
import styled from "styled-components/native";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { RefObject, useRef } from "react";

const Container = styled.View`
	flex: 1;
	background-color: black;
`;

type CreateAccountScreenProps = NativeStackScreenProps<
	StackParamList,
	"CreateAccount"
>;
const CreateAccount = ({ navigation }: CreateAccountScreenProps) => {
	const lastNameRef = useRef<TextInput | null>(null);
	const usernameRef = useRef<TextInput | null>(null);
	const emailRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);

	const onNext = (nextOne: RefObject<TextInput | null>) => {
		nextOne.current?.focus();
	};
	const onDone = () => {
		alert("Done");
	};
	return (
		<AuthLayOut>
			<TextInput
				autoFocus
				placeholder="First Name"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
				onSubmitEditing={() => onNext(lastNameRef)}
			/>
			<TextInput
				ref={lastNameRef}
				placeholder="Last Name"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
				onSubmitEditing={() => onNext(usernameRef)}
			/>
			<TextInput
				ref={usernameRef}
				placeholder="Username"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="next"
				onSubmitEditing={() => onNext(emailRef)}
			/>
			<TextInput
				ref={emailRef}
				keyboardType="email-address"
				placeholder="Email"
				placeholderTextColor="gray"
				returnKeyType="next"
				style={{ backgroundColor: "white", width: "100%" }}
				onSubmitEditing={() => onNext(passwordRef)}
			/>
			<TextInput
				ref={passwordRef}
				secureTextEntry
				placeholder="Password"
				placeholderTextColor="gray"
				style={{ backgroundColor: "white", width: "100%" }}
				returnKeyType="done"
				blurOnSubmit
				onSubmitEditing={onDone}
			/>
			<AuthButton onPress={() => false} disabled={true} text="Create Account" />
		</AuthLayOut>
	);
};

export default CreateAccount;
