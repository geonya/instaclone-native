import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { logUserIn } from "../apollo";
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
import ScreenParamList from "../navigators/screenParamList";

type LoginScreenProps = NativeStackScreenProps<ScreenParamList, "Login">;
interface ILoginValues {
	username: string;
	password: string;
	result: string;
}
const Login = ({ route }: LoginScreenProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
		watch,
	} = useForm<ILoginValues>({
		mode: "onChange",
		defaultValues: {
			username: route.params?.username || "",
			password: route.params?.password || "",
		},
	});
	const [logInMutation, { loading }] = useLoginMutation({
		onCompleted: (data) => {
			if (!data?.login) return;
			const {
				login: { ok, error, token },
			} = data;
			if (ok && token) {
				logUserIn(token);
			}
			if (error) {
				setError("result", {
					message: error,
				});
			}
		},
	});
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
					value={watch("username")}
					autoFocus
					autoCapitalize="none"
					autoCorrect={false}
					ref={usernameRef}
					placeholder="Username"
					placeholderTextColor="gray"
					returnKeyType="next"
					onSubmitEditing={() => onNext(passwordRef)}
					blurOnSubmit
					onChangeText={(text) => {
						setValue("username", text);
						clearErrors("result");
					}}
				/>
				<FormError message={errors.username?.message} />
			</InputBox>
			<InputBox lastOne>
				<AuthTextInput
					value={watch("password")}
					ref={passwordRef}
					secureTextEntry
					placeholder="Password"
					placeholderTextColor="gray"
					returnKeyType="done"
					blurOnSubmit
					lastOne
					onChangeText={(text) => {
						setValue("password", text);
						clearErrors("result");
					}}
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
			<FormError message={errors.result?.message} />
		</AuthLayOut>
	);
};

export default Login;
