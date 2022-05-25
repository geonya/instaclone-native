import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyBoard from "../components/DismissKeyBoard";
import { goToPhoto } from "../components/sharedFunction";
import { useSearchPhotosLazyQuery } from "../generated/graphql";
import ScreenParamList from "../navigators/screenParamList";

type SearchScreenProps = NativeStackScreenProps<ScreenParamList>;
interface SearchFormValue {
	keyword: string;
}

const SearchInput = styled.TextInput<{ width: number }>`
	width: ${(props) => props.width / 1.5}px;
	color: black;
	background-color: rgba(255, 255, 255, 0.9);
	padding: 5px 10px;
	border-radius: 7px; ;
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
	const NUM_COLUMS = 4;
	const { width: screenWidth, height: sreenHeight } = useWindowDimensions();
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
			width={screenWidth}
			onChangeText={(text) => setValue("keyword", text)}
			placeholder="Search Photos"
			placeholderTextColor="rgba(0,0,0,0.8)"
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
	return (
		<DismissKeyBoard>
			<View
				style={{
					backgroundColor: "black",
					flex: 1,
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
				{data?.searchPhotos !== undefined ? (
					data?.searchPhotos?.length === 0 ? (
						<MessageContainer>
							<MessageText>Could not find anything...</MessageText>
						</MessageContainer>
					) : (
						<FlatList
							numColumns={NUM_COLUMS}
							data={data?.searchPhotos}
							keyExtractor={(_, i) => i + ""}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => goToPhoto({ navigation, photoId: item?.id! })}
								>
									<Image
										source={{ uri: item?.file }}
										style={{ width: screenWidth / NUM_COLUMS, height: 100 }}
									/>
								</TouchableOpacity>
							)}
						/>
					)
				) : null}
			</View>
		</DismissKeyBoard>
	);
};

export default Search;
