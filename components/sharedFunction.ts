import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenParamList from "../navigators/screenParamList";

interface IGoToProfileProps {
	navigation: NativeStackNavigationProp<ScreenParamList>;
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
	navigation: NativeStackNavigationProp<ScreenParamList>;
	photoId: number;
}
export const goToPhoto = ({ navigation, photoId }: IGotoPhotoProps) =>
	navigation.navigate("Photo", {
		photoId,
	});
