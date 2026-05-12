function TagChip({ tag, onDelete }) {
  return (
    <div className="tag-chip">
      <span>#{tag}</span>

      <button onClick={onDelete}>x</button>
    </div>
  );
}

export default TagChip;
