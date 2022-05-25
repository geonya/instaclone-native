import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import ScreenParamList from "../navigators/screenParamList";

const HeaderRightText = styled.Text`
	color: ${colors.blue};
	font-size: 16px;
	font-weight: 600;
	margin-right: 5px;
`;
interface HeaderRightNextBtn {
	navigation: NativeStackNavigationProp<ScreenParamList>;
	file: string;
}

const HeaderRightNextBtn = ({ navigation, file }: HeaderRightNextBtn) => (
	<TouchableOpacity
		onPress={() =>
			navigation.navigate("UploadForm", {
				file,
			})
		}
	>
		<HeaderRightText>Next</HeaderRightText>
	</TouchableOpacity>
);

export default HeaderRightNextBtn;
