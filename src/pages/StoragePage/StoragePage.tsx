import { useState } from "react";
import { getCookieValue } from "../../helpers/cookie";
import { cloudStorageApi } from "../../services/CloudStorageApi";
import { FileType } from "../../types/fileData";

import FilesList from "../../components/Lists/FilesList/FilesList";
import Input from "../../components/UI/Input";
import UploadIcon from "../../components/SvgIcons/UploadIcon";
import Private from "../Wrappers/Private";
import Select from "../../components/UI/Select";

const StoragePage = () => {
	const [type, setType] = useState<FileType>("all");

	const { data, isLoading } = cloudStorageApi.useGetAllFilesQuery({
		type,
		token: getCookieValue("token"),
	});
	const [uploadFile, uploadStatus] = cloudStorageApi.useUploadFileMutation();

	function uploadFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		uploadFile({ file: formData, token: getCookieValue("token") });
	}

	return (
		<main className="relative flex grow bg-inherit max-sm:flex-col">
			<div className="flex h-fit w-min flex-col items-center justify-center gap-3 border-neutral-300 bg-inherit p-2 max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:justify-around max-sm:border-b">
				<Input
					className="border-neutral-300"
					label={""}
					placeholder="Search..."
				/>
				<Select
					options={[
						{ id: 0, value: "all", label: "All" },
						{ id: 1, value: "photos", label: "Photos" },
						{ id: 2, value: "applications", label: "Applications" },
					]}
					value={type}
					onChange={(option) =>
						setType((prev) => option?.value || prev)
					}
				/>
				<label
					className="flex h-12 w-fit cursor-pointer items-center rounded bg-amber-500 px-3 py-2 text-center text-lg font-semibold text-white outline-2 outline-offset-2 outline-rose-600 transition duration-300 focus-within:outline hover:bg-orange-500 aria-disabled:bg-neutral-500 sm:w-full sm:gap-2"
					aria-disabled={uploadStatus.isLoading}
				>
					<UploadIcon
						className="h-7 justify-self-start text-amber-500 transition"
						currentColor={uploadStatus.isLoading}
					/>
					<span className="block max-sm:hidden">
						{uploadStatus.isLoading ? "Wait" : "Upload"}
					</span>
					<input
						className="h-0 w-0"
						type="file"
						onChange={uploadFileHandler}
						disabled={uploadStatus.isLoading}
					/>
				</label>
			</div>

			{/* Divider */}
			<div className="invisible border sm:visible" />

			<div className="mx-auto p-2">
				{isLoading && <div>Fetching</div>}
				{data && (
					<>
						{!Boolean(data.length) && <div>Empty</div>}
						{Boolean(data.length) && <FilesList files={data} />}
					</>
				)}
			</div>
		</main>
	);
};

const PrivateStoragePage = () => (
	<Private>
		<StoragePage />
	</Private>
);

export default PrivateStoragePage;
