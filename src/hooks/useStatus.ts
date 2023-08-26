import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

export function useStatus(
	initialStatus: QueryStatus,
	statusDuration: number = 1
) {
	const [status, setStatus] =
		useState<keyof typeof QueryStatus>(initialStatus);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (status === "fulfilled" || status === "rejected") {
			timeout = setTimeout(() => {
				setStatus("uninitialized");
			}, statusDuration * 1000);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [status, statusDuration]);

	useEffect(() => {
		setStatus(initialStatus);
	}, [initialStatus]);

	return [status] as const;
}
