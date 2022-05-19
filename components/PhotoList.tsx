import { Text, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { IComments } from "./Comment";

const Container = styled.View``;
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
	color: white;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text`
	color: white;
`;
const Likes = styled.Text`
	color: white;
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
	user: { __typename?: "User"; username: string; avatar?: string | null };
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
	const { width, height } = useWindowDimensions();
	return (
		<Container>
			<Header>
				<UserAvatar
					style={{ width: 50, height: 50 }}
					source={{
						uri:
							user.avatar ||
							"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
					}}
				/>
				<Username>{user.username}</Username>
			</Header>
			<File style={{ width, height: height / 6 }} source={{ uri: file }} />
			<Actions>
				<Action />
				<Action />
			</Actions>
			<Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
			<Caption>
				<Username>{user.username}</Username>
				<CaptionText>{caption}</CaptionText>
			</Caption>
		</Container>
	);
};

export default PhotoList;
