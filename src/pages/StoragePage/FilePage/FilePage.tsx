import { useParams } from "react-router-dom";
import { getFileExtension } from "../../../helpers/getFileExtension";

const FilePage = () => {
	const params = useParams();

	const fileUrl = "http://localhost:5000/uploads/" + params.filename;
	const fileExtension = getFileExtension(params.filename || "");
	console.log(fileExtension);

	return (
		<main className="flex grow items-center justify-center">
			<object
				className="aspect-squar h-5/6 w-3/4 rounded bg-contain object-contain"
				data={fileUrl}
			>
				<p>
					Unable to display {params.filename}.<br />
					<a
						className="underline"
						href={fileUrl}
						download
					>
						Download
					</a>{" "}
					instead.
				</p>
			</object>
			{/* <iframe src={fileUrl} width="auto" height="auto"> </iframe> */}
		</main>
	);
};

export default FilePage;
