import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyBoard from '../components/DismissKeyBoard';
import { useUploadPhotoMutation } from '../generated/graphql';
import ScreenParamList from '../navigators/screenParamList';
import { ReactNativeFile } from 'apollo-upload-client';

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

const HeaderRightText = styled.Text`
	color: ${colors.blue};
	font-size: 16px;
	font-weight: 600;
	margin-right: 5px;
`;

interface UploadFormValue {
	caption: string;
}

type UploadFormScreenProps = NativeStackScreenProps<
	ScreenParamList,
	'UploadForm'
>;
const UploadForm = ({ navigation, route }: UploadFormScreenProps) => {
	const [uploadPhotoMutation, { loading }] = useUploadPhotoMutation({
		update: (cache, result) => {
			if (!result.data?.uploadPhoto) return;
			const {
				data: { uploadPhoto },
			} = result;
			if (uploadPhoto.id) {
				cache.modify({
					id: 'ROOT_QUERY',
					fields: {
						seeFeed: (prev) => [uploadPhoto, ...prev],
					},
				});
			}
		},
	});
	const { register, handleSubmit, setValue } = useForm<UploadFormValue>();
	useEffect(() => {
		register('caption', {
			required: true,
		});
	}, [register]);
	const headerRight = () => (
		<TouchableOpacity onPress={handleSubmit(onValid)}>
			<HeaderRightText>Next</HeaderRightText>
		</TouchableOpacity>
	);

	const headerRightLoading = () => (
		<ActivityIndicator size='small' color='white' style={{ marginRight: 15 }} />
	);
	useEffect(() => {
		navigation.setOptions({
			headerRight: loading ? headerRightLoading : headerRight,
			...(loading && { headerLeft: () => null }),
		});
	}, []);
	const onValid: SubmitHandler<UploadFormValue> = ({ caption }) => {
		const file = new ReactNativeFile({
			uri: route.params.file,
			name: '1.jpg',
			type: 'image/jpeg',
		});
		if (!loading) {
			uploadPhotoMutation({
				variables: {
					file,
					caption,
				},
			});
			navigation.navigate('Tabs');
		}
	};
	return (
		<DismissKeyBoard>
			<Container>
				<KeyboardAvoidingView
					style={{
						width: '100%',
					}}
					behavior='position'
					keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
				>
					<Wrapper>
						{route?.params ? (
							<Photo resizeMode='contain' source={{ uri: route.params.file }} />
						) : null}
						<CaptionContainer>
							<Caption
								autoCapitalize='none'
								autoCorrect={false}
								placeholder='Write a caption...'
								placeholderTextColor='rgba(0,0,0,0.5)'
								onChangeText={(text) => setValue('caption', text)}
								onSubmitEditing={handleSubmit(onValid)}
								returnKeyType='done'
							/>
						</CaptionContainer>
					</Wrapper>
				</KeyboardAvoidingView>
			</Container>
		</DismissKeyBoard>
	);
};

export default UploadForm;
