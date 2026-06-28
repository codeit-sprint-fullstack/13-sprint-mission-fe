import ItemDetailPage from "@/components/pages/ItemDetailPage";

export default function ItemDetail({ params }) {
  return <ItemDetailPage itemId={params.itemId} />;
}
