export type Variants = "outlined" | "contained" | "text";

export type Color = "neutral" | "red" | "amber" | "lime" | "rose";

export const colorVariants: Record<Variants, Record<Color, string>> = {
	contained: {
		amber: "bg-amber-500 hover:bg-amber-600 text-white",
		lime: "bg-lime-500 hover:bg-lime-600 text-white",
		neutral:
			"bg-neutral-500 hover:bg-neutral-600 text-white",
		red: "bg-red-500 hover:bg-red-600 text-white",
		rose: "bg-rose-500 hover:bg-rose-600 text-white",
	},
	outlined: {
		amber: "text-amber-600 border-amber-400 hover:bg-amber-50 hover:border-amber-600",
		lime: "text-lime-600 border-lime-400 hover:bg-lime-50 hover:border-lime-600",
		neutral:
			"text-neutral-600 border-neutral-400 hover:bg-neutral-50 hover:border-neutral-600",
		red: "text-red-600 border-red-400 hover:bg-red-50 hover:border-red-600",
		rose: "text-rose-600 border-rose-400 hover:bg-rose-50 hover:border-rose-600",
	},
	text: {
		amber: "text-amber-600 hover:bg-amber-100",
		lime: "text-lime-600 hover:bg-lime-100",
		neutral: "text-neutral-600 hover:bg-neutral-10",
		red: "text-red-600 hover:bg-red-100",
		rose: "text-rose-600 hover:bg-rose-100",
	},
};

