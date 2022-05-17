import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { RefObject, useRef } from "react";
import { AuthTextInput } from "../components/auth/AuthShared";

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
			<KeyboardAvoidingView
				style={{
					width: "100%",
				}}
				behavior="padding"
				keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
			>
				<AuthTextInput
					autoFocus
					placeholder="First Name"
					placeholderTextColor="gray"
					returnKeyType="next"
					onSubmitEditing={() => onNext(lastNameRef)}
				/>
				<AuthTextInput
					ref={lastNameRef}
					placeholder="Last Name"
					placeholderTextColor="gray"
					returnKeyType="next"
					onSubmitEditing={() => onNext(usernameRef)}
				/>
				<AuthTextInput
					ref={usernameRef}
					placeholder="Username"
					placeholderTextColor="gray"
					returnKeyType="next"
					onSubmitEditing={() => onNext(emailRef)}
				/>
				<AuthTextInput
					ref={emailRef}
					keyboardType="email-address"
					placeholder="Email"
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
				<AuthButton
					onPress={() => false}
					disabled={true}
					text="Create Account"
				/>
			</KeyboardAvoidingView>
		</AuthLayOut>
	);
};

export default CreateAccount;
