import { usersApi } from "../../../services/usersApi";

const UsersList = () => {
	const { data, isFetching } = usersApi.useGetAllUsersQuery({
		orderBy: "SharedWith",
		orderValue: "DESC",
	});

	return (
		<>
			<h1>UsersList component</h1>
		</>
	);
};

export default UsersList;
