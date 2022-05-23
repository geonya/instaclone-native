import styled from "styled-components/native";

export const UserAvatar = styled.Image<{ size: number }>`
	width: ${(props) => `${props.size}px`};
	height: ${(props) => `${props.size}px`};
	border-radius: ${(props) => `${props.size / 2}px`};
	margin-right: 10px;
`;

export const Username = styled.Text`
	color: white;
	font-weight: 600;
`;
export const UserInfoBox = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding: 10px;
`;
