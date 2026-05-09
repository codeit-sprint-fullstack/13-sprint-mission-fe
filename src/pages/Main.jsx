import Hero from "@/components/landing/Hero";
import SectionBanner from "@/components/landing/SectionBanner";
import { HERO_DATA, MAIN_BANNER_DATA } from "@/constants/constants";
import styles from "@/pages/Main.module.css";

export default function Main() {
  return (
    <main>
      <Hero data={HERO_DATA[0]} />

      <article className={styles.sectionBanner}>
        {MAIN_BANNER_DATA.map((section, i) => (
          <SectionBanner key={section.id} data={section} index={i} />
        ))}
      </article>

      <Hero variant='bottom' data={HERO_DATA[1]} />
    </main>
  );
}
