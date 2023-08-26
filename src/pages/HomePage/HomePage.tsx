import Button from "../../components/UI/Buttons/Button";
import IconButton from "../../components/UI/Buttons/IconButton";
import Input from "../../components/UI/Input";
import Select from "../../components/UI/Select";

import ShareIcon from "../../components/SvgIcons/ShareIcon";

const HomePage = () => {
	const options = [
		{ id: 1, label: "asdasd", value: "asdasd" },
		{ id: 2, label: "asdasd", value: "asdasd" },
		{ id: 3, label: "asdasd", value: "asdasd" },
	];
	return (
		<main className="p-2">
			<div className="flex flex-col gap-8">
				<div className="flex h-8 gap-2">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
				</div>

				<div className="flex h-10 gap-2">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
				</div>

				<div className="flex h-16 gap-2">
					<Input />
					<Select options={options} />
					<Button>Button</Button>
					<IconButton>
						<ShareIcon />
					</IconButton>
				</div>
			</div>
		</main>
	);
};

export default HomePage;
