import { Shimmer } from "@/components";
import { icHeartEmpty } from "@/assets/icons";
import styles from "./ItemSkeleton.module.css";
export default function ItemSkeleton() {
  return (
    <div className={styles.container}>
      <Shimmer className={styles.img} />
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.price}></div>
        <div className={styles.meta}>
          <img src={icHeartEmpty} />
          <div className={styles.like}></div>
        </div>
      </div>
    </div>
  );
}
