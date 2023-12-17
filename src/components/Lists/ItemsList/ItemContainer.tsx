import { HTMLAttributes, forwardRef } from "react"
import { twMerge } from "tailwind-merge";

interface ItemContainerProps
	extends HTMLAttributes<HTMLLIElement>,
		React.PropsWithChildren {
	checked?: boolean;
}

const ItemContainer = forwardRef<HTMLLIElement, ItemContainerProps>(
	({ checked, children, ...liAttrs }, ref) => {
		return (
			<li
				{...liAttrs}
				ref={ref}
				className={twMerge(
					`group relative flex aspect-square h-32 select-none flex-col items-center justify-normal rounded border border-neutral-50 p-1 pb-0 shadow transition-colors duration-300 hover:bg-neutral-100 hover:text-rose-900 sm:h-40 md:h-44 ${
						checked ? "bg-neutral-100 text-rose-900" : ""
					}`,
					liAttrs.className
				)}
			>
				{children}
			</li>
		);
	}
);

export default ItemContainer;