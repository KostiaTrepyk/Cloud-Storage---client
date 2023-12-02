import Button from "components/UI/Buttons/Button";
import IconButton from "components/UI/Buttons/IconButton";
import Input from "components/UI/Input";
import Select from "components/UI/Select";
import Image from "components/UI/Image";

import ShareIcon from "components/SvgIcons/ShareIcon";

const HomePage = () => {
	const options = [
		{ id: 1, label: "1asdasd", value: "1asdasd" },
		{ id: 2, label: "2asdasd", value: "2asdasd" },
		{ id: 3, label: "3asdasd", value: "3asdasd" },
	];

	return (
		<main className="p-2">
			<div className="flex flex-col gap-8">
				<div className="flex h-8 gap-2 border">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
					<Image
						imgAttrs={{
							src: "http://localhost:5000/uploads/ddee1035f1a95abad105.jpg",
						}}
					/>
				</div>

				<div className="flex h-10 gap-2 border">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
					<Image
						imgAttrs={{
							src: "http://localhost:5000/uploads/7568bb2696ffbc6015.jpg",
						}}
					/>
				</div>

				<div className="flex h-16 gap-2 border">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
					<Image
						imgAttrs={{
							src: "http://localhost:5000/uploads/ddee1035f1a95abad105.jpg",
						}}
					/>
				</div>

				<Button>Open/Close</Button>
			</div>
		</main>
	);
};

export default HomePage;
