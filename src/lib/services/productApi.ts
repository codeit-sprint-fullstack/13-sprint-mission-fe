const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const productAPI = {
  getProduct: async (params: ProductParam): Promise<ProductResponse> => {
    const searchParam = new URLSearchParams({
      page: String(params.page),
      pageSize: String(params.pageSize),
      orderBy: params.orderBy,
    });
    const respon = await fetch(`${baseURL}/products?${searchParam}`);
    return await respon.json();
  },
};
