import { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
	title: "UI/Components/Alert",
	component: Alert,
	tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;

export const Default: Story = {
	args: { text: "Lorem ipsum dolor sit amet consectetur." },
};

export const Success: Story = {
	args: { text: "Lorem ipsum dolor sit amet consectetur.", type: "success" },
};

export const Danger: Story = {
	args: { text: "Lorem ipsum dolor sit amet consectetur.", type: "danger" },
};

type Story = StoryObj<typeof Alert>;