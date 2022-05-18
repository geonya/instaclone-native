import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type SearchScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Photo"
>;

const Photo = ({ navigation }: SearchScreenProps) => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
				<Text style={{ color: "white" }}>Go To Profile</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Photo;
