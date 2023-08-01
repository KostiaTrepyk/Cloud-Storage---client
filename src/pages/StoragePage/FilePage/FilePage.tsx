import { useParams } from "react-router-dom";

const FilePage = () => {
	const params = useParams();

	const fileUrl = "http://localhost:5000/uploads/" + params.id;

	return (
		<main className="grow">
			<object
				className="h-full w-full rounded bg-contain object-cover shadow-lg"
				data={fileUrl}
			>
				<p>
					Unable to display PDF file.
					<a
						href={fileUrl}
						download
					>
						Download
					</a>
					instead.
				</p>
			</object>
			{/* <iframe src={fileUrl} width="auto" height="auto"> </iframe> */}
		</main>
	);
};

export default FilePage;
