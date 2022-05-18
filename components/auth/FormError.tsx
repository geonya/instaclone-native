import styled from "styled-components/native";

const Message = styled.Text`
	color: tomato;
	font-weight: 600;
	text-align: center;
`;

interface IFormErrorProps {
	message?: string;
}
const FormError = ({ message }: IFormErrorProps) =>
	message ? <Message>{message}</Message> : null;

export default FormError;
