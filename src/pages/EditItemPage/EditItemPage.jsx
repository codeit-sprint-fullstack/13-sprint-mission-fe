import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, patchProduct } from "../../api/products";
import ProductForm from "../../components/Product/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import { Container } from "../../styles/CommonStyles";

function EditItemPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { itemId: productId } = useParams();
  const form = useProductForm();
  const productQuery = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });
  const updateProductMutation = useMutation({
    mutationFn: (product) => patchProduct(productId, product),
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(`/items/${product.id}`);
    },
  });

  useEffect(() => {
    if (!productQuery.data) return;

    const { name, description, price, images, tags } = productQuery.data;
    form.resetForm({ name, description, price, images, tags });
  }, [productQuery.data, form.resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.validate()) return;

    updateProductMutation.mutate({
      ...form.values,
      price: Number(form.values.price),
    });
  };

  if (productQuery.isPending) return <Container>상품을 불러오는 중입니다.</Container>;
  if (productQuery.isError) return <Container>{productQuery.error.message}</Container>;

  return (
    <Container>
      <ProductForm
        title="상품 수정하기"
        values={form.values}
        errors={form.errors}
        canSubmit={form.isValid}
        isSubmitting={updateProductMutation.isPending}
        onChange={form.changeField}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default EditItemPage;
