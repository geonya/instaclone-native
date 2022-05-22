import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Text, View } from "react-native";
import useMe from "../components/hooks/useMe";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
type MeProps = NativeStackScreenProps<StackNavFactoryParamList, "Me">;
const Me = ({ navigation }: MeProps) => {
	const { data } = useMe();
	useEffect(() => {
		navigation.setOptions({
			title: `${data?.seeMe?.username}`,
		});
	}, [data]);
	return (
		<View
			style={{
				backgroundColor: "black",
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text style={{ color: "white" }}>{data?.seeMe?.username}</Text>
		</View>
	);
};

export default Me;
