import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import {
	useFollowUserMutation,
	useUnfollowUserMutation,
} from "../generated/graphql";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import useUser from "./hooks/useUser";
import { goToProfile } from "./sharedFunction";
import { UserAvatar, UserInfoBox, Username } from "./sharedStyles";

const Container = styled.View<{ width: number }>`
	padding: 5px 0;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const FollowBtn = styled.TouchableOpacity`
	background-color: #0095f6;
	border-radius: 3px;
	padding: 5px 16px;
	justify-content: center;
	align-items: center;
`;

const FollowText = styled.Text`
	color: white;
	font-weight: 600;
`;

interface IUserRowProsp {
	__typename?: "User";
	id: number;
	username: string;
	avatar?: string | null;
	isFollowing: boolean;
	isMe: boolean;
	navigation: NativeStackNavigationProp<StackNavFactoryParamList>;
}

const UserRow = ({
	id,
	username,
	avatar,
	isFollowing,
	isMe,
	navigation,
}: IUserRowProsp) => {
	const { width: screenWidth } = useWindowDimensions();
	const { data: userData } = useUser();
	const [followUser] = useFollowUserMutation({
		variables: {
			username: username!,
		},
		update: (cache, result) => {
			if (!result?.data?.followUser) return;
			const {
				data: {
					followUser: { ok },
				},
			} = result;
			if (!ok) return;
			cache.modify({
				id: `User:${username}`,
				fields: {
					isFollowing: () => true,
					totalFollowers: (prev) => prev + 1,
				},
			});
			if (!userData?.seeMe) return;
			const {
				seeMe: { username: loggedInUserName },
			} = userData;
			cache.modify({
				id: `User:${loggedInUserName}`,
				fields: {
					totalFollowing: (prev) => prev + 1,
				},
			});
		},
	});
	const [unFollowUser] = useUnfollowUserMutation({
		variables: {
			username: username!,
		},
		update: (cache, result) => {
			if (!result.data?.unfollowUser) return;
			const {
				data: {
					unfollowUser: { ok },
				},
			} = result;
			if (!ok) return;
			cache.modify({
				id: `User:${username}`,
				fields: {
					isFollowing: () => false,
					totalFollowers: (prev) => prev - 1,
				},
			});
			if (!userData?.seeMe) return;
			const {
				seeMe: { username: loggedInUserName },
			} = userData;
			cache.modify({
				id: `User:${loggedInUserName}`,
				fields: {
					totalFollowing: (prev) => prev - 1,
				},
			});
		},
	});
	return (
		<Container width={screenWidth}>
			<UserInfoBox onPress={() => goToProfile({ navigation, username, id })}>
				<UserAvatar
					resizeMode="cover"
					source={{
						uri:
							avatar ||
							"https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
					}}
				/>
				<Username>{username}</Username>
			</UserInfoBox>
			{!isMe ? (
				isFollowing ? (
					<FollowBtn onPress={() => unFollowUser()}>
						<FollowText>Unfollow</FollowText>
					</FollowBtn>
				) : (
					<FollowBtn onPress={() => followUser()}>
						<FollowText>Follow</FollowText>
					</FollowBtn>
				)
			) : null}
		</Container>
	);
};

export default UserRow;
