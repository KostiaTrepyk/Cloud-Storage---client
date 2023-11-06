import { getCookieValue } from "../../../helpers/cookie";
import { cloudStorageApi } from "../../../services/CloudStorageApi";
import { cookieKeys } from "../../../types/cookie";

const UsersList = () => {
	const { data, isFetching } = cloudStorageApi.useGetAllUsersQuery({
		orderBy: "SharedWith",
		orderValue: "DESC",
		token: getCookieValue(cookieKeys.TOKEN),
	});

	return (
		<>
			<h1>UsersList component</h1>
		</>
	);
};

export default UsersList;
