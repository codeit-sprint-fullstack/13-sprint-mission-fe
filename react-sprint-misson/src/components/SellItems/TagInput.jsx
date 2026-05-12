import styles from "./TagInput.module.css";
import formStyles from "./FormField.module.css";

export default function TagInput({
  tagValue,
  tagList,
  error,
  onChange,
  onKeyDown,
  onBlur,
  onDelete,
}) {
  return (
    <>
      <label className={formStyles.label} htmlFor="product-tags">
        태그
      </label>
      <input
        className={`${formStyles.input} ${error ? formStyles.inputError : ""}`}
        id="product-tags"
        name="productTags"
        value={tagValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        placeholder="태그를 입력하세요"
      />
      {error && <p className={formStyles.errorMessage}>{error}</p>}
      {tagList.length > 0 && (
        <ul className={styles.tagList}>
          {tagList.map((t) => (
            <li key={t.id} className={styles.tagItem}>
              <p className={styles.tagValue}>{t.value}</p>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDelete(t.id)}
              >
                <img src="/images/icons/ic_X.svg" alt="태그 삭제" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
