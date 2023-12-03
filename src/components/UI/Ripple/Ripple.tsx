import { useState, useLayoutEffect } from "react";
import { Color } from "../types";

import styles from "./Ripple.module.css";

type RippleColor = Color | "white";

const Colors: Record<RippleColor, string> = {
	white: "bg-white",
	amber: "bg-amber-600",
	lime: "bg-lime-600",
	neutral: "bg-neutral-600",
	red: "bg-red-600",
	rose: "bg-rose-600",
};

interface RippleProps {
	duration?: number;
	color?: RippleColor;
}

const Ripple: React.FC<RippleProps> = ({
	duration = 850,
	color = "neutral",
}) => {
	const [rippleArray, setRippleArray] = useState<
		{ y: number; x: number; size: number }[]
	>([]);

	useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
		setRippleArray([]);
	});

	const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rippleContainer = event.currentTarget.getBoundingClientRect();
		const size =
			rippleContainer.width > rippleContainer.height
				? rippleContainer.width
				: rippleContainer.height;
		const x = event.pageX - rippleContainer.x - size / 2;
		const y = event.pageY - rippleContainer.y - size / 2;
		const newRipple = {
			x,
			y,
			size,
		};

		setRippleArray([...rippleArray, newRipple]);
	};

	return (
		<div
			style={
				{
					"--duration": duration + "ms",
				} as any
			}
			className={`${styles.ripple}`}
			onMouseDown={addRipple}
		>
			{rippleArray.length > 0 &&
				rippleArray.map((ripple, index) => {
					return (
						<span
							key={index}
							className={`${Colors[color]}`}
							style={{
								top: ripple.y,
								left: ripple.x,
								width: ripple.size,
								height: ripple.size,
							}}
						/>
					);
				})}
		</div>
	);
};

export default Ripple;

const useDebouncedRippleCleanUp = (
	rippleCount: any,
	duration: any,
	cleanUpFunction: any
) => {
	useLayoutEffect(() => {
		let bounce: NodeJS.Timeout;
		if (rippleCount > 0) {
			/* clearTimeout(bounce); */

			bounce = setTimeout(() => {
				cleanUpFunction();
				clearTimeout(bounce);
			}, duration);
		}

		return () => clearTimeout(bounce);
	}, [rippleCount, duration, cleanUpFunction]);
};