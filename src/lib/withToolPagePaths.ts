import { getToolPageSlugs } from "./api";


export const withToolPagePaths = async () => {
    try {
        const res = await getToolPageSlugs();
        const paths =
            res.data?.data?.posts?.nodes.map((page: { slug: string }) => ({
                params: page,
            })) || [];

        return {
            paths,
            fallback: "blocking",
        };
    } catch (error) {
        return {
            paths:[],
            fallback:"blocking"
        }
    }
}