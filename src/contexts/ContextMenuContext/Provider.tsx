import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ContextMenuContext from ".";

export const ContextMenuContextProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [showMenu, setShowMenu] = useState<boolean>(false);
	const [coords, setCoords] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});
	const [validatedCoords, setValidatedCoords] = useState({
		x: coords.x,
		y: coords.y,
	});
	const [contextMenuElement, setContextMenuElement] = useState<JSX.Element>();

	const ref = useRef<any>(null);

	const validateCoords = useCallback(
		(coords: {
			x: number;
			y: number;
		}): {
			x: number;
			y: number;
		} => {
			const result = { x: coords.x, y: coords.y };

			if (!ref.current) return result;

			if (window.innerWidth < result.x + ref.current.clientWidth + 20) {
				result.x = window.innerWidth - ref.current.clientWidth - 20;
			}

			if (window.innerHeight < result.y + ref.current.clientHeight + 20) {
				result.y = window.innerHeight - ref.current.clientHeight - 5;
			}

			return { x: result.x, y: result.y };
		},
		[]
	);

	const handleContextMenu = useCallback(
		(e: React.MouseEvent, contextMenu: JSX.Element) => {
			e.preventDefault();
			e.stopPropagation();

			setCoords({ x: e.pageX, y: e.pageY });
			setContextMenuElement(contextMenu);
			setShowMenu(true);
		},
		[]
	);

	const handleClick = useCallback(() => {
		showMenu && setShowMenu(false);
	}, [showMenu]);

	const close = useCallback(() => {
		setShowMenu(false);
	}, []);

	useEffect(() => {
		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [handleClick, handleContextMenu]);

	useEffect(() => {
		if (ref.current) {
			setValidatedCoords(validateCoords(coords));
		}
	}, [coords, validateCoords]);

	const portal = document.getElementById("contextMenu");
	if (!portal)
		throw new Error('No context menu element in "FolderContextMenu.tsx"!');

	const value = {
		handleContextMenu,
		coords,
		close,
	};

	return (
		<ContextMenuContext.Provider value={value}>
			{children}
			{createPortal(
				showMenu ? (
					<div
						className={`fixed z-[100]`}
						style={{
							top: validatedCoords.y,
							left: validatedCoords.x,
						}}
						ref={ref}
					>
						{contextMenuElement}
					</div>
				) : null,
				portal
			)}
		</ContextMenuContext.Provider>
	);
};