import ItemListBest from "@/components/ItemList/ItemListBest";
import ItemListGeneral from "@/components/ItemList/ItemListGeneral";
import styles from "./ItemsPage.module.css";

export default function ItemsPage() {
  return (
    <main className={styles.container}>
      <section>
        <ItemListBest />
      </section>
      <section>
        <ItemListGeneral />
      </section>
    </main>
  );
}
