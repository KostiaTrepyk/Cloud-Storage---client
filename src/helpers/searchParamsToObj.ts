export function searchParamsToObj(str: string): Record<string, string> {
    if (!str) return {};

    const result: Record<string, string> = {};

    const queryArray: string[][] = str
        .slice(1)
        .split("&")
        .map((r) => r.split("="));

    queryArray.forEach((queryProp) => {
        result[queryProp[0]] = queryProp[1];
    });

    return result;
}
