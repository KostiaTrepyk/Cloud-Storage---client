import Private from "../Wrappers/Private";

const TrashPage = () => {
	return <main className="grow p-2">In development!</main>;
};

const PrivateTrashPage = () => (
	<Private>
		<TrashPage />
	</Private>
);

export default PrivateTrashPage;
