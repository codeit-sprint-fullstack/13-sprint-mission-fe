import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/products";
import ProductForm from "../../components/Product/ProductForm";
import useProductForm from "../../hooks/useProductForm";
import { Container } from "../../styles/CommonStyles";

function AddItemPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useProductForm();
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/items");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.validate()) return;

    createProductMutation.mutate({
      ...form.values,
      price: Number(form.values.price),
    });
  };

  return (
    <Container>
      <ProductForm
        title="상품 등록하기"
        values={form.values}
        errors={form.errors}
        canSubmit={form.isValid}
        isSubmitting={createProductMutation.isPending}
        onChange={form.changeField}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default AddItemPage;
