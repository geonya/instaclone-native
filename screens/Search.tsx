import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "../components/DismissKeyBoard";
import { useSearchPhotosLazyQuery } from "../generated/graphql";
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

const MessageContainer = styled.View`
	flex: 1;
	background-color: black;
	justify-content: center;
	align-items: center;
`;

const MessageText = styled.Text`
	margin-top: 20px;
	color: white;
	font-weight: 600;
`;

const Search = ({ navigation }: SearchScreenProps) => {
	const { register, setValue, handleSubmit } = useForm<SearchFormValue>();
	const [startQueryFn, { loading, data, called }] = useSearchPhotosLazyQuery();
	const onValid: SubmitHandler<SearchFormValue> = ({ keyword }) => {
		startQueryFn({
			variables: {
				keyword,
			},
		});
	};
	const SearchBox = () => (
		<SearchInput
			onChangeText={(text) => setValue("keyword", text)}
			placeholderTextColor="gray"
			placeholder="Search Photos"
			returnKeyLabel="Search"
			returnKeyType="search"
			autoCorrect={false}
			autoCapitalize="none"
			onSubmitEditing={handleSubmit(onValid)}
		/>
	);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: SearchBox,
		});
		register("keyword", { required: true, minLength: 2 });
	}, []);
	console.log(data);
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
				{loading ? (
					<MessageContainer>
						<ActivityIndicator size="large" />
						<MessageText>Searching...</MessageText>
					</MessageContainer>
				) : null}
				{!called ? (
					<MessageContainer>
						<MessageText>Search by keyword...</MessageText>
					</MessageContainer>
				) : null}
				{data?.searchPhotos !== undefined &&
				data?.searchPhotos?.length === 0 ? (
					<MessageContainer>
						<MessageText>Could not find anything...</MessageText>
					</MessageContainer>
				) : null}
			</View>
		</DismissKeyBoard>
	);
};

export default Search;
