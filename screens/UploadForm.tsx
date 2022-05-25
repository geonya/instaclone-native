import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyBoard from "../components/DismissKeyBoard";
import HeaderRightNextBtn from "../components/HeaderRightNextBtn";
import ScreenParamList from "../navigators/screenParamList";

const Container = styled.View`
	flex: 1;
	background-color: ${colors.black};
	justify-content: center;
	padding: 0px 50px;
`;

const Photo = styled.Image`
	height: 310px;
`;
const CaptionContainer = styled.View`
	margin-top: 30px;
`;
const Caption = styled.TextInput`
	background-color: white;
	color: black;
	height: 40px;
	padding: 10px 20px;
	border-radius: 7px;
`;
const Wrapper = styled.View`
	max-width: 400px;
	width: 100%;
	margin: 0 auto;
`;

interface UploadFormValue {
	caption: string;
}

type UploadFormScreenProps = NativeStackScreenProps<
	ScreenParamList,
	"UploadForm"
>;
const UploadForm = ({ navigation, route }: UploadFormScreenProps) => {
	const loading = false;
	const { register, handleSubmit, setValue } = useForm<UploadFormValue>();
	useEffect(() => {
		register("caption", {
			required: true,
		});
	}, [register]);
	const changeHeaderRight = (loading: boolean) => {
		if (loading) {
			return (
				<ActivityIndicator
					size="small"
					color="white"
					style={{ marginRight: 15 }}
				/>
			);
		} else {
			return HeaderRightNextBtn({ navigation, file: route.params.file });
		}
	};
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => changeHeaderRight(loading),
			headerLeft: () => null,
		});
	}, []);
	const onValid: SubmitHandler<UploadFormValue> = ({ caption }) => {};
	return (
		<DismissKeyBoard>
			<Container>
				<KeyboardAvoidingView
					style={{
						width: "100%",
					}}
					behavior="position"
					keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
				>
					<Wrapper>
						{route?.params ? (
							<Photo resizeMode="contain" source={{ uri: route.params.file }} />
						) : null}
						<CaptionContainer>
							<Caption
								autoCapitalize="none"
								autoCorrect={false}
								placeholder="Write a caption..."
								placeholderTextColor="rgba(0,0,0,0.5)"
								onChangeText={(text) => setValue("caption", text)}
								onSubmitEditing={handleSubmit(onValid)}
								returnKeyType="done"
							/>
						</CaptionContainer>
					</Wrapper>
				</KeyboardAvoidingView>
			</Container>
		</DismissKeyBoard>
	);
};

export default UploadForm;
