import { useState } from "react";
import { SIGNINROUTE } from "../../core/Router/types/routes";
import { getCookieValue } from "../../helpers/cookie";
import { useAppSelector } from "../../hooks/useAppSelector";
import { cloudStorageApi } from "../../services/CloudStorageApi";
import { FileType } from "../../types/fileData";

import PageConfig from "../Wrappers/PageConfig";
import FilesList from "../../components/Lists/FilesList/FilesList";

const StoragePage = () => {
	const [type, setType] = useState<FileType>("all");

	const { currentData, isFetching } = cloudStorageApi.useGetAllFilesQuery({
		type,
		token: getCookieValue("token"),
	});

	const [uploadFile, {}] = cloudStorageApi.useUploadFileMutation();

	function uploadFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		uploadFile({ file: formData, token: getCookieValue("token") });
	}

	return (
		<main className="flex grow gap-3 bg-inherit max-sm:flex-col">
			<div className="sticky top-16 z-50 flex h-fit flex-col gap-3 bg-inherit max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:justify-around">
				<select
					className="w-[10rem] cursor-pointer rounded border p-2 outline-none transition focus:border-neutral-600"
					value={type}
					onChange={(e) => setType(e.target.value as FileType)}
				>
					<option value="all">All</option>
					<option value="photos">Photos</option>
					<option value="applications">Applications</option>
					<option value="trash">Trash</option>
				</select>
				<label className="w-fit cursor-pointer rounded bg-orange-500 px-3 py-2 text-lg font-semibold text-white outline-2 outline-offset-2 outline-rose-600 transition focus-within:outline hover:bg-orange-600 active:bg-orange-700">
					Upload file
					<input
						className="h-0 w-0"
						type="file"
						onChange={uploadFileHandler}
					/>
				</label>
			</div>

			{/* Divider */}
			<div className="border" />

			<div className="mx-auto grow">
				{isFetching && <div>Fetching</div>}
				{currentData && (
					<>
						{!Boolean(currentData.length) && <div>Empty</div>}
						{Boolean(currentData.length) && (
							<FilesList files={currentData} />
						)}
					</>
				)}
			</div>
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
