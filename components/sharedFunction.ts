import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

interface IgoToProfileProps {
	navigation: NativeStackNavigationProp<StackNavFactoryParamList>;
	username: string;
	id: number;
}
export const goToProfile = ({ navigation, username, id }: IgoToProfileProps) =>
	navigation.navigate("Profile", {
		username,
		id,
	});
