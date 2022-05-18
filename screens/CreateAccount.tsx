import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";
import AuthLayOut from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { useEffect, useRef } from "react";
import {
	AuthTextInput,
	FormErrorMessage,
	InputBox,
	onNext,
} from "../components/auth/AuthShared";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

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
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<ICreateAccountValues>();
	const lastNameRef = useRef<TextInput | null>(null);
	const usernameRef = useRef<TextInput | null>(null);
	const emailRef = useRef<TextInput | null>(null);
	const passwordRef = useRef<TextInput | null>(null);
	const onValid: SubmitHandler<ICreateAccountValues> = (data) => {
		console.log(data);
	};
	useEffect(() => {
		register("firstName", {
			required: FormErrorMessage.required,
			minLength: {
				value: 2,
				message: FormErrorMessage.firstName.minLength,
			},
			maxLength: {
				value: 10,
				message: FormErrorMessage.firstName.maxLength,
			},
			pattern: {
				value: /^[a-zA-Z]{2,10}$/g,
				message: FormErrorMessage.firstName.pattern,
			},
		});
		register("lastName", {
			required: FormErrorMessage.required,
			minLength: {
				value: 2,
				message: FormErrorMessage.lastName.minLength,
			},
			maxLength: {
				value: 10,
				message: FormErrorMessage.lastName.maxLength,
			},
			pattern: {
				value: /^[a-zA-Z]{2,10}$/g,
				message: FormErrorMessage.lastName.pattern,
			},
		});
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
		register("email", {
			required: FormErrorMessage.required,
			pattern: {
				value:
					/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
				message: FormErrorMessage.email.pattern,
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
					placeholder={errors.firstName ? errors.firstName?.message : "First"}
					placeholderTextColor="gray"
					returnKeyType="next"
					onChangeText={(text) => setValue("firstName", text)}
					onSubmitEditing={() => onNext(lastNameRef)}
				/>
				<FormError message={errors.firstName?.message} />
			</InputBox>
			<InputBox>
				<AuthTextInput
					ref={lastNameRef}
					autoCapitalize="none"
					placeholder="Last Name"
					placeholderTextColor="gray"
					returnKeyType="next"
					onChangeText={(text) => setValue("lastName", text)}
					onSubmitEditing={() => onNext(usernameRef)}
				/>
				<FormError message={errors.lastName?.message} />
			</InputBox>
			<InputBox>
				<AuthTextInput
					ref={usernameRef}
					autoCapitalize="none"
					placeholder="Username"
					placeholderTextColor="gray"
					returnKeyType="next"
					onChangeText={(text) => setValue("username", text)}
					onSubmitEditing={() => onNext(emailRef)}
				/>
				<FormError message={errors.username?.message} />
			</InputBox>
			<InputBox>
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
				<FormError message={errors.email?.message} />
			</InputBox>
			<InputBox lastOne>
				<AuthTextInput
					ref={passwordRef}
					secureTextEntry
					placeholder="Password"
					placeholderTextColor="gray"
					returnKeyType="done"
					blurOnSubmit
					onChangeText={(text) => setValue("password", text)}
					onSubmitEditing={handleSubmit(onValid)}
				/>
				<FormError message={errors.password?.message} />
			</InputBox>
			<AuthButton
				onPress={handleSubmit(onValid)}
				disabled={false}
				loading={!isValid}
				text="Create Account"
			/>
		</AuthLayOut>
	);
};

export default CreateAccount;
