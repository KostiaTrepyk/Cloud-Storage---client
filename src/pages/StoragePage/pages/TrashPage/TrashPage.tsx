import { getCookieValue } from "../../../../helpers/cookie";
import { cloudStorageApi } from "../../../../services/CloudStorageApi";
import { cookieKeys } from "../../../../types/cookie";

import Private from "../../../Wrappers/Private";
import FilesList from "../../../../components/Lists/FilesList/FilesList";

const TrashPage = () => {
	const { data, isSuccess } = cloudStorageApi.useGetAllFilesQuery({
		filesType: "trash",
		token: getCookieValue(cookieKeys.TOKEN),
	});

	return (
		<main className="grow p-2">
			{isSuccess && <FilesList files={data.files} />}
		</main>
	);
};

const PrivateTrashPage = () => (
	<Private>
		<TrashPage />
	</Private>
);

export default PrivateTrashPage;
