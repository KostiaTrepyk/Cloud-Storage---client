import { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";

const meta: Meta<typeof Progress> = {
	title: "UI/Components/Progress",
	component: Progress,
	tags: ["autodocs"],
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