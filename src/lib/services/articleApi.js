export async function getAllArticles({
  pageSize = 10,
  page = 1,
  order = "recent",
  search = "",
}) {
  try {
    const query = new URLSearchParams({
      pageSize: String(pageSize),
      page: String(page),
      order,
      search,
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles?${query}`,
    );

    if (!response.ok) throw new Error(`❌ API 에러! 상태: ${response.status}`);
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    throw new Error(`❌ API Error :`, { cause: error });
  }
}
