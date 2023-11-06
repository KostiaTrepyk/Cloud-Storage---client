import { PropsWithChildren, forwardRef, memo } from "react";

interface FlexListProps extends PropsWithChildren {
	direction?: "horizontal" | "vertical";
	/**  num * 4 */
	gap?: number;
	wrap?: boolean;
}

const FlexList = memo(
	forwardRef<HTMLUListElement, FlexListProps>(
		({ direction = "horizontal", gap = 1, wrap, children }, ref) => {
			return (
				<ul
					className={`flex justify-center gap-${gap} flex-${
						direction == "horizontal" ? "row" : "col"
					} ${wrap && "flex-wrap"}`}
					ref={ref}
				>
					{children}
				</ul>
			);
		}
	)
);

export default FlexList;
