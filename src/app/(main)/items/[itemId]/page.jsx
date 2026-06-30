import ItemDetail from "./_components/ItemDetail";
import InquiryForm from "./_components/InquiryForm";
import CommentList from "./_components/CommentList";

export default function page() {
  return (
    <div>
      <ItemDetail />
      <InquiryForm />
      <CommentList />
    </div>
  );
}
