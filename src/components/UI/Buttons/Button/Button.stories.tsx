import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
	title: "Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

export const Default: Story = {
	args: { children: "Button" },
};

export const WithStatus: Story = {
	args: { children: "Button", status: "pending" },
};

export const Small: Story = {
	args: { children: "Button", size: "small" },
};

export const Large: Story = {
	args: { children: "Button", size: "large" },
};

type Story = StoryObj<typeof meta>;