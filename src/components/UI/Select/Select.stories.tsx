import { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
	title: "Select",
	component: Select,
	tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

export const Default: Story = {
	args: {
		options: [
			{ id: 1, label: "option 1", value: "1" },
			{ id: 2, label: "option 2", value: "2" },
			{ id: 3, label: "option 3", value: "3" },
		],
	},
};

type Story = StoryObj<typeof meta>;