import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import { useSeeFeedQuery } from "../generated/graphql";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type SearchScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Feed"
>;

const Feed = ({ navigation }: SearchScreenProps) => {
	const { data } = useSeeFeedQuery();
	console.log(data);
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>Feed</Text>
			<AuthButton text="Log Out" onPress={() => logUserOut()} />
		</View>
	);
};

export default Feed;
