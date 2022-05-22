import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type ProfileProps = NativeStackScreenProps<StackNavFactoryParamList, "Profile">;

const Profile = ({ navigation, route }: ProfileProps) => {
	useEffect(() => {
		navigation.setOptions({
			title: route.params.username,
		});
	}, [navigation, route.params]);
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>{route.params.username}'s Profile</Text>
		</View>
	);
};

export default Profile;
