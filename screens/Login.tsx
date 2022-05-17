import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RefObject, useRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayOut from "../components/auth/AuthLayout";
import { AuthTextInput } from "../components/auth/AuthShared";
import { StackParamList } from "../navigators/LoggedOutNav";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;

const Login = ({ navigation }: LoginScreenProps) => {
	const usernameRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onNext = (nextOne: RefObject<TextInput | null>) => {
		nextOne.current?.focus();
	};
	const onDone = () => {
		alert("Done");
	};
	return (
		<AuthLayOut>
			<KeyboardAvoidingView
				style={{
					width: "100%",
				}}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			>
				<AuthTextInput
					ref={usernameRef}
					placeholder="Username"
					placeholderTextColor="gray"
					returnKeyType="next"
					onSubmitEditing={() => onNext(passwordRef)}
				/>
				<AuthTextInput
					ref={passwordRef}
					secureTextEntry
					placeholder="Password"
					placeholderTextColor="gray"
					returnKeyType="done"
					blurOnSubmit
					onSubmitEditing={onDone}
					lastOne
				/>
				<AuthButton onPress={() => false} disabled={true} text="Log In" />
			</KeyboardAvoidingView>
		</AuthLayOut>
	);
};

export default Login;
