import Link from "next/link";

export default function AuthFooterLink({ description, linkText, href }) {
  return (
    <div className="flex gap-1 text-body-sm font-medium">
      <span className="text-gray-800">{description}</span>

      <Link href={href} className="text-brand-blue underline">
        {linkText}
      </Link>
    </div>
  );
}
