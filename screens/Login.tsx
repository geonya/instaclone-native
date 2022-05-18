import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RefObject, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayOut from "../components/auth/AuthLayout";
import {
	AuthTextInput,
	FormErrorMessage,
	InputBox,
	onNext,
} from "../components/auth/AuthShared";
import FormError from "../components/auth/FormError";
import { StackParamList } from "../navigators/LoggedOutNav";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;
interface ILoginValues {
	username: string;
	password: string;
}
const Login = ({ navigation }: LoginScreenProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<ILoginValues>();
	const usernameRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onValid: SubmitHandler<ILoginValues> = (data) => {
		console.log(data);
	};
	useEffect(() => {
		register("username", {
			required: FormErrorMessage.required,
			minLength: {
				value: 2,
				message: FormErrorMessage.username.minLength,
			},
			maxLength: {
				value: 10,
				message: FormErrorMessage.username.maxLength,
			},
			pattern: {
				value: /^[a-z0-9]{2,10}$/g,
				message: FormErrorMessage.username.pattern,
			},
		});
		register("password", {
			required: FormErrorMessage.required,
			minLength: {
				value: 4,
				message: FormErrorMessage.password.minLength,
			},
		});
	}, [register]);
	return (
		<AuthLayOut>
			<InputBox>
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
				<FormError message={errors.username?.message} />
			</InputBox>
			<InputBox lastOne>
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
				<FormError message={errors.password?.message} />
			</InputBox>
			<AuthButton
				onPress={handleSubmit(onValid)}
				disabled={false}
				text="Log In"
			/>
		</AuthLayOut>
	);
};

export default Login;
