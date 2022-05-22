import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "../components/DismissKeyBoard";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type SearchScreenProps = NativeStackScreenProps<
	StackNavFactoryParamList,
	"Search"
>;
interface SearchFormValue {
	keyword: string;
}

const SearchInput = styled.TextInput`
	background-color: white;
`;

const Search = ({ navigation }: SearchScreenProps) => {
	const { register, setValue, watch } = useForm<SearchFormValue>();
	const SearchBox = () => (
		<SearchInput
			onChangeText={(text) => setValue("keyword", text)}
			placeholderTextColor="gray"
			placeholder="Search Photos"
			returnKeyLabel="Search"
			returnKeyType="search"
			autoCorrect={false}
			autoCapitalize="none"
		/>
	);
	useEffect(() => {
		navigation.setOptions({
			headerTitle: SearchBox,
		});
		register("keyword");
	}, [register]);
	return (
		<DismissKeyBoard>
			<View
				style={{
					backgroundColor: "black",
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate("Photo")}>
					<Text style={{ color: "white" }}>Go to Photo</Text>
				</TouchableOpacity>
			</View>
		</DismissKeyBoard>
	);
};

export default Search;
