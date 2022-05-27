import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenParamList from "../navigators/screenParamList";
import { useSeeRoomQuery, useSendMessageMutation } from "../generated/graphql";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { UserAvatar } from "../components/sharedStyles";
import { SubmitHandler, useForm } from "react-hook-form";

const MessageContainer = styled.View<{ isMine?: boolean }>`
	width: 100%;
	flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
	align-items: flex-end;
	padding: 0 10px;
`;
const Author = styled.View``;
const Message = styled.Text`
	background-color: rgba(255, 255, 255, 0.3);
	padding: 5px 10px;
	overflow: hidden;
	border-radius: 10px;
	font-size: 16px;
	margin: 0 10px;
`;
const MessageTextInput = styled.TextInput`
	color: white;
	margin-top: 25px;
	margin-bottom: 50px;
	width: 90%;
	border: 2px solid rgba(255, 255, 255, 0.5);
	padding: 10px 20px;
	border-radius: 1000px;
`;
interface MessageInputValues {
	payload: string;
}
type RoomScreenProps = NativeStackScreenProps<ScreenParamList, "Room">;
const Room = ({ route, navigation }: RoomScreenProps) => {
	const { data, loading, refetch } = useSeeRoomQuery({
		variables: {
			id: route.params.id,
		},
	});
	const { register, handleSubmit, setValue } = useForm<MessageInputValues>();
	const [sendMessageMutation, { loading: sendLoading }] =
		useSendMessageMutation();
	const onValid: SubmitHandler<MessageInputValues> = ({ payload }) => {
		sendMessageMutation({
			variables: {
				roomId: route.params.id,
				payload,
			},
		});
		setValue("payload", "");
	};
	useEffect(() => {
		register("payload", { required: true });
	}, []);
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
			behavior="padding"
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
						<MessageContainer isMine={item?.isMine}>
							<Author>
								<UserAvatar
									size={30}
									source={{ uri: item?.user.avatar || "" }}
									resizeMode="cover"
								/>
							</Author>
							<Message style={{ color: "white" }}>{item?.payload}</Message>
						</MessageContainer>
					)}
				/>
				<MessageTextInput
					autoCapitalize="none"
					autoCorrect={false}
					placeholder={"Writh your message"}
					placeholderTextColor="rgba(255, 255, 255, 0.5)"
					returnKeyLabel="Send Message"
					returnKeyType="send"
					onSubmitEditing={handleSubmit(onValid)}
					onChangeText={(payload) => setValue("payload", payload)}
				/>
			</ScreenLayout>
		</KeyboardAvoidingView>
	);
};

export default Room;
