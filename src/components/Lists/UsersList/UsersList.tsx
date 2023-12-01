import { getCookieValue } from "../../../helpers/cookie";
import { usersApi } from "../../../services/usersApi";
import { cookieKeys } from "../../../types/cookie";

const UsersList = () => {
	const { data, isFetching } = usersApi.useGetAllUsersQuery({
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
