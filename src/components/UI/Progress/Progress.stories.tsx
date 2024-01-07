import { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";

const meta: Meta<typeof Progress> = {
	title: "Progress",
	component: Progress,
	tags: ["autodocs"],
	argTypes: {
		showLabel: {
			type: "boolean",
			defaultValue: false,
		},
		height: {
			type: "number",
			defaultValue: 4,
		},
		value: {
			type: "number",
			defaultValue: 0,
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		showLabel: true,
		value: 60,
	},
};

export const Large: Story = {
	args: {
		height: 6,
		value: 60,
	},
};

type Story = StoryObj<typeof Progress>;