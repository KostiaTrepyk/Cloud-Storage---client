import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
	title: "UI/Components/Button",
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

export const WithChangedColor: Story = {
	args: { children: "Button", color: "amber" },
};

export const Small: Story = {
	args: { children: "Button", size: "small" },
};

export const Large: Story = {
	args: { children: "Button", size: "large" },
};

export const Outlined: Story = {
	args: { children: "Button", variant: "outlined" },
};

export const Text: Story = {
	args: { children: "Button", variant: "text" },
};

export const Disabled: Story = {
	args: { children: "Button", disabled: true },
};

type Story = StoryObj<typeof meta>;