import { RefObject } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";

export const AuthTextInput = styled(TextInput)<{ lastOne?: boolean }>`
	color: white;
	background-color: rgba(255, 255, 255, 0.15);
	padding: 15px 7px;
	border-radius: 4px;
`;
export const InputBox = styled.View<{ lastOne?: boolean }>`
	margin-bottom: ${(props) => (props.lastOne ? 20 : 8)}px;
`;
export const onNext = (nextOne: RefObject<TextInput | null>) => {
	nextOne.current?.focus();
};

interface IFormErrorMessage {
	required: string;
	firstName: {
		minLength: string;
		maxLength: string;
		pattern: string;
	};
	lastName: {
		minLength: string;
		maxLength: string;
		pattern: string;
	};
	username: {
		minLength: string;
		maxLength: string;
		pattern: string;
	};
	email: {
		pattern: string;
	};
	password: {
		minLength: string;
	};
}
export const FormErrorMessage: IFormErrorMessage = {
	required: "내용을 입력해주세요.",
	firstName: {
		minLength: "2~10자 이내에 영문만 사용 가능합니다. ",
		maxLength: "2~10자 이내에 영문만 사용 가능합니다. ",
		pattern: "2~10자 이내에 영문만 사용 가능합니다.",
	},
	lastName: {
		minLength: "2~10자 이내에 영문만 사용 가능합니다. ",
		maxLength: "2~10자 이내에 영문만 사용 가능합니다. ",
		pattern: "2~10자 이내에 영문만 사용 가능합니다.",
	},
	username: {
		minLength: "2~10자 이내에 영문이나 숫자만 사용 가능합니다. ",
		maxLength: "2~10자 이내에 영문이나 숫자만 사용 가능합니다. ",
		pattern: "2~10자 이내에 영문이나 숫자만 사용 가능합니다.",
	},
	email: {
		pattern: "이메일이 형식에 맞지 않습니다.",
	},
	password: {
		minLength: "비밀번호는 최소 4자 이상이여야 합니다.",
	},
};
