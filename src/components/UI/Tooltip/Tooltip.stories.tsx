import { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip";
import Button from "../Buttons/Button/Button";

const meta: Meta<typeof Tooltip> = {
	title: "Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	render: (props) => {
		return (
			<Tooltip {...props}>
				<Button>Button</Button>
			</Tooltip>
		);
	},
} satisfies Meta<typeof Tooltip>;

export default meta;

export const Default: Story = {
	args: {
		title: "Tooltip",
	},
};

export const WithChangedPosition: Story = {
	args: {
		title: "Tooltip",
		position: "right-center",
	},
};

type Story = StoryObj<typeof meta>;

