import Private from "../Wrappers/Private";

const TrashPage = () => {
	return <main className="grow p-2"></main>;
};

const PrivateTrashPage = () => (
	<Private>
		<TrashPage />
	</Private>
);

export default PrivateTrashPage;
