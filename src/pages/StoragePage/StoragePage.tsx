import { SIGNINROUTE } from "../../core/Router/types/routes";
import { getCookieValue } from "../../helpers/cookie";
import { useAppSelector } from "../../hooks/useAppSelector";
import { cloudStorageApi } from "../../services/CloudStorageApi";

import PageConfig from "../Wrappers/PageConfig";

const StoragePage = () => {
	const { currentData, isFetching } = cloudStorageApi.useGetAllFilesQuery({
		type: "photos",
		token: getCookieValue("token"),
	});

	return (
		<main>
			<h1>Your Storage</h1>
			{isFetching && <div>Fetching</div>}
			{currentData && (
				<>
					{!Boolean(currentData.length) && <div>Empty</div>}
					{Boolean(currentData.length) && (
						<div>
							{currentData.map((item) => (
								<div key={item.id}>{item.originalname}</div>
							))}
						</div>
					)}
				</>
			)}
		</main>
	);
};

const PrivateStoragePage = () => {
	const userData = useAppSelector((state) => state.auth.userData);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const isRedirecting = !Boolean(isAuth && userData);

	return (
		<PageConfig
			navigate={{
				when: isRedirecting,
				where: SIGNINROUTE.path!,
				immediately: true,
			}}
		>
			<StoragePage />
		</PageConfig>
	);
};

export default PrivateStoragePage;
