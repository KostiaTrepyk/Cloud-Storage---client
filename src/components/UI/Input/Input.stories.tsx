import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";


const meta: Meta<typeof Input> = {
	title: "Input",
	component: Input,
	parameters: {},
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

export const Default: Story = {};

export const WithLabel: Story = { args: { label: { text: "Label" } } };

export const Disabled: Story = {
	args: {
		label: { text: "Label" },
		input: { disabled: true },
	},
};

export const Required: Story = {
	args: {
		label: { text: "Label" },
		input: { required: true },
	},
};

export const FullWidth: Story = {
	args: {
		fullWidth: true,
	},
};

type Story = StoryObj<typeof meta>;
