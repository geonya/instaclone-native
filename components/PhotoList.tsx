import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import { Ionicons } from "@expo/vector-icons";
import { useToggleLikeMutation } from "../generated/graphql";
import { UserAvatar, UserInfoBox, Username } from "./sharedStyles";
import { goToProfile } from "./sharedFunction";

const Container = styled.View``;

const File = styled.Image``;
const Actions = styled.View`
	flex-direction: row;
	align-items: center;
`;
const Action = styled.TouchableOpacity`
	margin-right: 10px;
`;
const Caption = styled.View`
	flex-direction: row;
`;
const CaptionText = styled.Text`
	margin-left: 5px;
	color: white;
`;
const Likes = styled.Text`
	color: white;
	margin: 7px 0px;
	font-weight: 600;
`;

const ExtraContainer = styled.View`
	padding: 10px;
`;

interface IPhotoProps {
	__typename?: "Photo";
	caption?: string | null;
	createdAt: string;
	isMine: boolean;
	id: number;
	file: string;
	likes: number;
	commentsCount: number;
	isLiked: boolean;
	user: {
		__typename?: "User";
		id: number;
		username: string;
		avatar?: string | null;
	};
	comments?: Array<{
		__typename?: "Comment";
		id: number;
		payload: string;
		isMine: boolean;
		createdAt: string;
		user: { __typename?: "User"; username: string; avatar?: string | null };
	} | null> | null;
}
const PhotoList = ({
	id,
	user,
	file,
	isLiked,
	likes,
	caption,
	commentsCount,
	comments,
}: IPhotoProps) => {
	const navigation: NativeStackNavigationProp<StackNavFactoryParamList> =
		useNavigation();
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const [imageHeight, setImageHeight] = useState(screenHeight - 450);
	useEffect(() => {
		Image.getSize(file, (imageWidth, imageHeight) => {
			setImageHeight(screenHeight / 3);
		});
	}, [file]);
	const [toggleLikeMutation] = useToggleLikeMutation({
		variables: {
			id,
		},
		update: (cache) => {
			cache.modify({
				id: `Photo:${id}`,
				fields: {
					isLiked: (prev) => !prev,
					likes: (prev) => (isLiked ? prev - 1 : prev + 1),
				},
			});
		},
	});

	return (
		<Container>
			<UserInfoBox
				onPress={() =>
					goToProfile({ navigation, username: user.username, id: user.id })
				}
			>
				<UserAvatar
					resizeMode="cover"
					source={{
						uri:
							user.avatar ||
							"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
					}}
				/>
				<Username>{user.username}</Username>
			</UserInfoBox>
			<File
				resizeMode="cover"
				style={{ width: screenWidth, height: imageHeight }}
				source={{ uri: file }}
			/>
			<ExtraContainer>
				<Actions>
					<Action onPress={() => toggleLikeMutation()}>
						<Ionicons
							name={isLiked ? "heart" : "heart-outline"}
							color={isLiked ? "tomato" : "white"}
							size={20}
						/>
					</Action>
					<Action onPress={() => navigation.navigate("Comments")}>
						<Ionicons name="chatbubble-outline" color="white" size={20} />
					</Action>
					<Action>
						<Ionicons name="paper-plane-outline" color="white" size={20} />
					</Action>
				</Actions>
				<TouchableOpacity
					onPress={() => navigation.navigate("Likes", { photoId: id })}
				>
					<Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
				</TouchableOpacity>
				<Caption>
					<TouchableOpacity
						onPress={() =>
							goToProfile({ navigation, username: user.username, id: user.id })
						}
					>
						<Username>{user.username}</Username>
					</TouchableOpacity>
					<CaptionText>{caption}</CaptionText>
				</Caption>
			</ExtraContainer>
		</Container>
	);
};

export default PhotoList;
