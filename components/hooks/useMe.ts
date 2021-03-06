import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { logUserOut, tokenVar } from "../../apollo";
import { useSeeMeQuery } from "../../generated/graphql";

const useMe = () => {
	const hasToken = useReactiveVar(tokenVar);
	const { data, loading } = useSeeMeQuery({ skip: !hasToken });
	useEffect(() => {
		if (data?.seeMe === null) logUserOut();
	}, [data]);
	return {
		data,
		loading,
	};
};

export default useMe;
