import { TextInput } from "react-native";
import styled from "styled-components";

export const AuthTextInput = styled(TextInput)<{ lastOne?: boolean }>`
	color: white;
	background-color: rgba(255, 255, 255, 0.15);
	padding: 15px 7px;
	border-radius: 4px;
	margin-bottom: ${(props) => (props.lastOne ? 20 : 8)}px;
`;
