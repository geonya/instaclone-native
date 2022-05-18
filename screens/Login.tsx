import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { isLoggedInVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayOut from "../components/auth/AuthLayout";
import {
	AuthTextInput,
	FormErrorMessage,
	InputBox,
	onNext,
} from "../components/auth/AuthShared";
import FormError from "../components/auth/FormError";
import { useLoginMutation } from "../generated/graphql";
import { StackParamList } from "../navigators/LoggedOutNav";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;
interface ILoginValues {
	username: string;
	password: string;
}
const Login = ({ navigation }: LoginScreenProps) => {
	const [logInMutation, { loading }] = useLoginMutation({
		onCompleted: (data) => {
			if (!data?.login) return;
			const {
				login: { ok, error, token },
			} = data;
			if (ok) {
				isLoggedInVar(true);
			}
		},
	});
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
		watch,
		getValues,
	} = useForm<ILoginValues>();
	const usernameRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onValid: SubmitHandler<ILoginValues> = (data) => {
		if (!loading) {
			logInMutation({
				variables: {
					...data,
				},
			});
		}
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
				text="Log In"
				onPress={handleSubmit(onValid)}
				loading={loading}
				disabled={!watch("username") || !watch("password")}
			/>
		</AuthLayOut>
	);
};

export default Login;
