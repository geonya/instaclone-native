import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { useEffect, useRef } from "react";
import { AuthTextInput, onNext } from "../components/auth/AuthShared";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateAccountScreenProps = NativeStackScreenProps<
	StackParamList,
	"CreateAccount"
>;
interface ICreateAccountValues {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}
const CreateAccount = ({ navigation }: CreateAccountScreenProps) => {
	const { register, handleSubmit, setValue } = useForm<ICreateAccountValues>();
	const lastNameRef = useRef<TextInput | null>(null);
	const usernameRef = useRef<TextInput | null>(null);
	const emailRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onValid: SubmitHandler<ICreateAccountValues> = (data) => {
		console.log(data);
	};
	useEffect(() => {
		register("firstName");
		register("lastName");
		register("username");
		register("email");
		register("password");
	}, [register]);
	return (
		<AuthLayOut>
			<AuthTextInput
				autoFocus
				autoCapitalize="none"
				placeholder="First Name"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("firstName", text)}
				onSubmitEditing={() => onNext(lastNameRef)}
			/>
			<AuthTextInput
				ref={lastNameRef}
				autoCapitalize="none"
				placeholder="Last Name"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("lastName", text)}
				onSubmitEditing={() => onNext(usernameRef)}
			/>
			<AuthTextInput
				ref={usernameRef}
				autoCapitalize="none"
				placeholder="Username"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("username", text)}
				onSubmitEditing={() => onNext(emailRef)}
			/>
			<AuthTextInput
				ref={emailRef}
				autoCapitalize="none"
				keyboardType="email-address"
				placeholder="Email"
				placeholderTextColor="gray"
				returnKeyType="next"
				onChangeText={(text) => setValue("email", text)}
				onSubmitEditing={() => onNext(passwordRef)}
			/>
			<AuthTextInput
				ref={passwordRef}
				secureTextEntry
				placeholder="Password"
				placeholderTextColor="gray"
				returnKeyType="done"
				blurOnSubmit
				onChangeText={(text) => setValue("password", text)}
				onSubmitEditing={handleSubmit(onValid)}
				lastOne
			/>
			<AuthButton
				onPress={handleSubmit(onValid)}
				disabled={false}
				text="Create Account"
			/>
		</AuthLayOut>
	);
};

export default CreateAccount;
