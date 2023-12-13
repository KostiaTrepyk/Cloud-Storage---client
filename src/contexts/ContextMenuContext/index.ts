import { createContext } from "react";
import { ContextMenuContextProvider } from "./Provider";
import { useContextMenuContext } from "./useContextMenuContext";

interface ContextMenuContextType {
	handleContextMenu: (e: React.MouseEvent, contextMenu: JSX.Element) => void;
	coords: { x: number; y: number };
	close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export default ContextMenuContext;
export { ContextMenuContextProvider, useContextMenuContext };