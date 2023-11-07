import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

interface FlexListProps
	extends React.PropsWithChildren,
		React.HTMLAttributes<HTMLUListElement> {
	direction?: "horizontal" | "vertical";
	/**  num * 4 */
	gap?: number;
	wrap?: boolean;
}

const FlexList = memo(
	forwardRef<HTMLUListElement, FlexListProps>(
		(
			{ direction = "horizontal", gap = 1, wrap, children, ...ulAttrs },
			ref
		) => {
			return (
				<ul
					{...ulAttrs}
					className={twMerge(
						`flex justify-center gap-${gap} flex-${
							direction == "horizontal" ? "row" : "col"
						} ${wrap && "flex-wrap"}`,
						ulAttrs.className
					)}
					ref={ref}
				>
					{children}
				</ul>
			);
		}
	)
);

export default FlexList;
