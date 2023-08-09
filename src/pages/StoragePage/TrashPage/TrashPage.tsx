import { getCookieValue } from "../../../helpers/cookie";
import { cloudStorageApi } from "../../../services/CloudStorageApi";

import Private from "../../Wrappers/Private";
import FilesList from "../../../components/Lists/FilesList/FilesList";

const TrashPage = () => {
	const { data, isLoading, isSuccess } = cloudStorageApi.useGetAllFilesQuery({
		type: "trash",
		token: getCookieValue("token"),
	});

	return (
		<main className="grow p-2">
			{isSuccess && <FilesList files={data} />}
		</main>
	);
};

const PrivateTrashPage = () => (
	<Private>
		<TrashPage />
	</Private>
);

export default PrivateTrashPage;
