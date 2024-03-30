import { useEffect, useRef, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

export function useStatus(
	initialStatus: keyof typeof QueryStatus,
	statusDuration: number = 3_000
) {
	const [status, setStatus] =
		useState<keyof typeof QueryStatus>(initialStatus);

	const timeout = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (status === "fulfilled" || status === "rejected") {
			timeout.current = setTimeout(() => {
				setStatus("uninitialized");
			}, statusDuration);
		}

		return () => clearTimeout(timeout.current);
	}, [status, statusDuration]);

	useEffect(() => {
		setStatus(initialStatus);
	}, [initialStatus]);

	function changeStatus(newStatus: keyof typeof QueryStatus) {
		setStatus(newStatus);
		clearTimeout(timeout.current);
	}

	return [status, changeStatus] as const;
}
