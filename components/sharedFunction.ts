import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

interface IGoToProfileProps {
	navigation: NativeStackNavigationProp<StackNavFactoryParamList>;
	username: string;
	userId: number;
}
export const goToProfile = ({
	navigation,
	username,
	userId,
}: IGoToProfileProps) =>
	navigation.navigate("Profile", {
		username,
		userId,
	});

interface IGotoPhotoProps {
	navigation: NativeStackNavigationProp<StackNavFactoryParamList>;
	photoId: number;
}
export const goToPhoto = ({ navigation, photoId }: IGotoPhotoProps) =>
	navigation.navigate("Photo", {
		photoId,
	});
