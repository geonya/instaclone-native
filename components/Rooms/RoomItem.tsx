import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { colors } from "../../colors";
import ScreenParamList from "../../navigators/screenParamList";
import useMe from "../hooks/useMe";
import { FatText, UserAvatar } from "../sharedStyles";

const RoomContainer = styled.TouchableOpacity`
	padding: 15px 10px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

const UsernameText = styled(FatText)`
	font-size: 16px;
`;
const RoomAvatar = styled(UserAvatar)`
	margin-right: 20px;
`;
const Column = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between; ;
`;
const Data = styled.View``;
const UnreadText = styled.Text`
	color: white;
`;
const UnreadDot = styled.View`
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: ${colors.blue};
`;

export interface IRoomRenderItemProps {
	__typename?: "Room" | undefined;
	id: number;
	unreadTotal: number;
	users?:
		| ({
				__typename?: "User" | undefined;
				username: string;
				avatar?: string | null | undefined;
		  } | null)[]
		| null
		| undefined;
}

const RoomItem = ({ id, users, unreadTotal }: IRoomRenderItemProps) => {
	const { data: meData } = useMe();
	const navigation: NativeStackNavigationProp<ScreenParamList> =
		useNavigation();
	const talkingTo = users?.find(
		(user) => user?.username !== meData?.seeMe?.username
	);
	const goToRoom = () => navigation.navigate("Room", { id, talkingTo });
	return (
		<RoomContainer onPress={goToRoom}>
			<Column>
				<RoomAvatar
					size={40}
					source={{
						uri:
							talkingTo?.avatar ||
							"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
					}}
				/>
				<Data>
					<UsernameText>{talkingTo?.username}</UsernameText>
					<UnreadText>
						{unreadTotal} unread {unreadTotal === 1 ? "message" : "message"}
					</UnreadText>
				</Data>
			</Column>
			<Column>{unreadTotal > 0 ? <UnreadDot /> : null}</Column>
		</RoomContainer>
	);
};

export default RoomItem;
