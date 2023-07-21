import { FC } from "react";

import LayoutMobile from "./LayoutMobile";
import LayoutPC from "./LayoutPC";

function detectMob() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

const isMobile = detectMob();

const Layout: FC = () => {
    return <div className="bg-white text-neutral-900">{isMobile ? <LayoutMobile /> : <LayoutPC />}</div>;
};

export default Layout;
