import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { StackParamList } from "../navigators/LoggedOutNav";

type CreateAccountScreenProps = NativeStackScreenProps<
	StackParamList,
	"CreateAccount"
>;

const CreateAccount = ({ navigation }: CreateAccountScreenProps) => {
	return (
		<View>
			<Text>CreateAccount</Text>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<View>
					<Text>Go to Login</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default CreateAccount;
