export async function wpFetch<T>(query: string): Promise<T> {
    const token = btoa(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`);

    const res = await fetch(process.env.WP_GRAPHQL_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 60 }, 
    });

    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
}