import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";

type LoginScreenProps = NativeStackScreenProps<StackParamList, "Login">;

const Login = ({ navigation }: LoginScreenProps) => {
	return (
		<View>
			<Text>Login</Text>
			<TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
				<View>
					<Text>Go to Create Account</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Login;
