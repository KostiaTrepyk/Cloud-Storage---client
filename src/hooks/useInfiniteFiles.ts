import { useCallback, useEffect, useRef, useState } from "react";
import { FileDataWithSharedWith, SortValue } from "../types/fileData";
import { cookieKeys } from "../types/cookie";
import { cloudStorageApi } from "../services/CloudStorageApi";
import { getCookieValue } from "../helpers/cookie";

export interface GetFilesQuery {
	filesType: "all" | "photos" | "applications";
	search: string | undefined;
	sort: SortValue;
	limit: number;
}

/** FIX typization (options) */
export function useInfiniteFiles(
	query: GetFilesQuery,
	options: { marginBottom: number } = { marginBottom: 300 }
) {
	const [files, setFiles] = useState<FileDataWithSharedWith[]>([]);
	const [page, setPage] = useState<number>(1);

	const fetchFilesStatus = cloudStorageApi.useGetAllFilesQuery({
		...query,
		page,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	const observer = useRef<IntersectionObserver>();
	const lastFileElementRef = useCallback(
		(node: HTMLLIElement) => {
			if (fetchFilesStatus.isFetching) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver(
				(entries) => {
					if (
						entries[0].isIntersecting &&
						!fetchFilesStatus.data?.isLastPage
					) {
						setPage((prev) => prev + 1);
					}
				},
				{ rootMargin: `0px 0px ${options.marginBottom}px 0px` }
			);

			if (node) observer.current.observe(node);
		},
		[
			fetchFilesStatus.isFetching,
			fetchFilesStatus.data?.isLastPage,
			options.marginBottom,
		]
	);

	/* Restore */
	useEffect(() => {
		restorePagination();
	}, [query]);

	/* setData */
	useEffect(() => {
		if (fetchFilesStatus.data)
			if (fetchFilesStatus.data.page === 1) {
				setFiles(fetchFilesStatus.data?.files);
			} else {
				setFiles((prev) => [
					...prev,
					...(fetchFilesStatus.data?.files || []),
				]);
			}
	}, [fetchFilesStatus.data]);

	function restorePagination() {
		setPage(1);
	}

	return {
		lastFileElementRef,
		files,
		setFiles,
		restorePagination,
		fetchFilesStatus,
	} as const;
}

