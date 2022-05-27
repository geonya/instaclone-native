import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Text,
	TextInput,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenParamList from "../navigators/screenParamList";
import { useSeeRoomQuery } from "../generated/graphql";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { FatText, UserAvatar } from "../components/sharedStyles";

const MessageContainer = styled.View`
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
`;
const Author = styled.View``;
const UsernameText = styled(FatText)``;
const Message = styled.Text``;
const MessageTextInput = styled.TextInput`
	background-color: white;
	margin-bottom: 50px;
	width: 90%;
	padding: 10px 20px;
	border-radius: 1000px;
`;

type RoomScreenProps = NativeStackScreenProps<ScreenParamList, "Room">;
const Room = ({ route, navigation }: RoomScreenProps) => {
	const { data, loading, refetch } = useSeeRoomQuery({
		variables: {
			id: route.params.id,
		},
	});
	useEffect(() => {
		navigation.setOptions({
			title: `${route.params.talkingTo?.username}`,
			headerLeft: ({ tintColor }) => (
				<Ionicons
					color={tintColor}
					name="chevron-back"
					size={28}
					onPress={() => navigation.goBack()}
				/>
			),
		});
	}, []);
	const [refreshing, setRefreshing] = useState(false);
	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				backgroundColor: "black",
			}}
			behavior="height"
			keyboardVerticalOffset={90}
		>
			<ScreenLayout loading={loading}>
				<FlatList
					refreshing={refreshing}
					onRefresh={onRefresh}
					inverted={true}
					style={{ width: "100%" }}
					data={data?.seeRoom?.messages}
					keyExtractor={(_, i) => i + ""}
					renderItem={({ item }) => (
						<MessageContainer>
							<Author>
								<UserAvatar
									size={40}
									source={{ uri: item?.user.avatar || "" }}
									resizeMode="cover"
								/>
								<UsernameText>{item?.user.username}</UsernameText>
							</Author>
							<Message style={{ color: "white" }}>{item?.payload}</Message>
						</MessageContainer>
					)}
				/>
				<MessageTextInput
					placeholder={"Writh your message"}
					placeholderTextColor="gray"
					returnKeyLabel="Send Message"
					returnKeyType="send"
				/>
			</ScreenLayout>
		</KeyboardAvoidingView>
	);
};

export default Room;
