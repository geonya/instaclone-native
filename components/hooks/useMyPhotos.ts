import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { logUserOut, tokenVar } from "../../apollo";
import { useSeeMeQuery, useSeeMyPhotosQuery } from "../../generated/graphql";

const useMyPhotos = () => {
	const hasToken = useReactiveVar(tokenVar);
	const { data, loading, refetch } = useSeeMyPhotosQuery({ skip: !hasToken });
	useEffect(() => {
		if (data?.seeMe === null) logUserOut();
	}, [data]);
	return {
		data,
		loading,
		refetch,
	};
};

export default useMyPhotos;
