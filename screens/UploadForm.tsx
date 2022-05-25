import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { UploadNavParamList } from "../navigators/UploadNav";

type UploadFormScreenProps = NativeStackScreenProps<UploadNavParamList>;
const UploadForm = ({ route }: UploadFormScreenProps) => {
	return (
		<View>
			<Text style={{ color: "white" }}>UploadForm</Text>
		</View>
	);
};

export default UploadForm;
