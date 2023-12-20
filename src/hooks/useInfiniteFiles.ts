import { useCallback, useEffect, useRef, useState } from "react";
import { SortValue } from "types/fileData";
import { cookieKeys } from "types/cookie";
import { FileDataWithSharedWith, filesApi } from "services/filesApi";
import { getCookieValue } from "helpers/cookie";

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

	const [fetchFiles, fetchFilesStatus] = filesApi.useLazyGetAllFilesQuery();

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
		fetchFiles({ ...query, page, token: getCookieValue(cookieKeys.TOKEN) })
			.unwrap()
			.then((res) => {
				if (res.page === 1) {
					setFiles(res.files);
				} else {
					setFiles((prev) => [...prev, ...res.files]);
				}
			});
	}, [page, query, fetchFiles]);

	function restorePagination() {
		setPage(1);
		setFiles([]);
	}

	return {
		lastFileElementRef,
		files,
		setFiles,
		restorePagination,
		fetchFilesStatus,
	} as const;
}

