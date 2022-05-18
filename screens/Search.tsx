import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type SearchScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Search"
>;

const Search = ({ navigation }: SearchScreenProps) => {
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TouchableOpacity onPress={() => navigation.navigate("Photo")}>
				<Text style={{ color: "white" }}>Go to Photo</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Search;
