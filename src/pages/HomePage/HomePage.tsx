import ShareIcon from "components/SvgIcons/ShareIcon";
import Button from "components/UI/Buttons/Button/Button";

const HomePage = () => {
	return (
		<main className="grow px-2">
			<div>Home Page</div>

			<Button
				startIcon={<ShareIcon className=" text-amber-600" />}
				size="small"
			>
				Button
			</Button>
			
			<div className="h-2"></div>

			<Button
				startIcon={<ShareIcon className=" text-amber-600" />}
				size="medium"
			>
				Button
			</Button>
			
			<div className="h-2"></div>

			<Button
				startIcon={<ShareIcon className=" text-amber-600" />}
				size="large"
			>
				Button
			</Button>
		</main>
	);
};

export default HomePage;
