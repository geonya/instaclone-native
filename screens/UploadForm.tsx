import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import ScreenParamList from "../navigators/screenParamList";

type UploadFormScreenProps = NativeStackScreenProps<ScreenParamList>;
const UploadForm = ({ route }: UploadFormScreenProps) => {
	console.log(route);
	return (
		<View>
			<Text style={{ color: "white" }}>UploadForm</Text>
		</View>
	);
};

export default UploadForm;
