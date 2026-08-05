const socialLinks = [
  { label: "Facebook", href: "#", src: "/icons/ic_facebook.png" },
  { label: "Twitter", href: "#", src: "/icons/ic_twitter.png" },
  { label: "Youtube", href: "#", src: "/icons/ic_youtube.png" },
  { label: "Instagram", href: "#", src: "/icons/ic_instagram.png" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-slate-300">
      <div className="mx-auto flex min-h-24 w-[min(100%-32px,640px)] flex-col items-start gap-6 py-7 text-[13px] tablet:w-[min(100%-48px,900px)] desktop:w-[min(100%-48px,1120px)] desktop:flex-row desktop:items-center desktop:justify-between desktop:py-0">
        <span>@codeit - 2026</span>
        <div className="flex gap-[22px]">
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
        </div>
        <div className="flex gap-[22px]" aria-label="소셜 링크">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.label} aria-label={link.label}>
              <img className="h-5 w-5" src={link.src} alt="" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
