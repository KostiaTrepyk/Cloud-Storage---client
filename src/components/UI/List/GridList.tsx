import { PropsWithChildren, forwardRef, memo } from "react";

interface GridListProps extends PropsWithChildren {
	gap?: number;
	cols?: number;
}

const GridList = memo(
	forwardRef<HTMLUListElement, GridListProps>(
		({ gap = 1, cols = 4, children }, ref) => {
			return (
				<ul
					className={`grid grid-cols-${cols} gap-${gap}`}
					ref={ref}
				>
					{children}
				</ul>
			);
		}
	)
);

export default GridList;
