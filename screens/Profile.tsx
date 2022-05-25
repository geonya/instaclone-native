import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import ScreenParamList from "../navigators/screenParamList";

type ProfileProps = NativeStackScreenProps<ScreenParamList, "Profile">;

const Container = styled.View`
	flex: 1;
	background-color: black;
	justify-content: center;
	align-items: center;
`;

const Profile = ({ navigation, route }: ProfileProps) => {
	useEffect(() => {
		navigation.setOptions({
			title: route.params.username,
		});
	}, [navigation, route.params]);

	return (
		<Container>
			<Text style={{ color: "white" }}>{route.params.username}'s Profile</Text>
		</Container>
	);
};

export default Profile;
