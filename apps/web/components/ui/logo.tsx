import Image from "next/image";

/*
 * Brand mark: the Foundation's own logo (client logo pack, "svg icon.svg"),
 * served from /public/brand. It replaces the placeholder mark drawn in the
 * Approved Design; size and position in the header are unchanged.
 */
const MARK_W = 271;
const MARK_H = 273;

export function LogoMark({ size }: { size: number }) {
  return (
    <Image
      src="/brand/tanmaysaachi-mark.svg"
      alt=""
      aria-hidden="true"
      width={Math.round((size * MARK_W) / MARK_H)}
      height={size}
      priority
    />
  );
}

/** Logo mark + wordmark ("Tanmay" ink, "saachi" coral), as in the mockup header. */
export function Brand({ size }: { size: number }) {
  return (
    <>
      <LogoMark size={size} />{" "}
      <b>
        Tanmay<em>saachi</em>
      </b>
    </>
  );
}
