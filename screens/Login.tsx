import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RefObject, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayOut from "../components/auth/AuthLayout";
import { AuthTextInput, onNext } from "../components/auth/AuthShared";
import { StackParamList } from "../navigators/LoggedOutNav";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;
interface ILoginValues {
	username: string;
	password: string;
}
const Login = ({ navigation }: LoginScreenProps) => {
	const { register, handleSubmit, setValue } = useForm<ILoginValues>();
	const usernameRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onValid: SubmitHandler<ILoginValues> = (data) => {
		console.log(data);
	};
	useEffect(() => {
		register("username");
		register("password");
	}, [register]);
	return (
		<AuthLayOut>
			<AuthTextInput
				autoFocus
				autoCapitalize="none"
				ref={usernameRef}
				placeholder="Username"
				placeholderTextColor="gray"
				returnKeyType="next"
				onSubmitEditing={() => onNext(passwordRef)}
				blurOnSubmit
				onChangeText={(text) => setValue("username", text)}
			/>
			<AuthTextInput
				ref={passwordRef}
				secureTextEntry
				placeholder="Password"
				placeholderTextColor="gray"
				returnKeyType="done"
				blurOnSubmit
				lastOne
				onChangeText={(text) => setValue("password", text)}
				onSubmitEditing={handleSubmit(onValid)}
			/>
			<AuthButton
				onPress={handleSubmit(onValid)}
				disabled={false}
				text="Log In"
			/>
		</AuthLayOut>
	);
};

export default Login;
