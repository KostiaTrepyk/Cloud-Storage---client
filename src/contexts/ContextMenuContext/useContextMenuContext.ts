import { useContext } from "react";
import ContextMenuContext from ".";

export const useContextMenuContext = () => {
	const contextMenuContext = useContext(ContextMenuContext);

	if (!contextMenuContext)
		throw new Error(
			"useContextMenuContext must be used within a ContextMenuProvider"
		);

	return contextMenuContext;
};
