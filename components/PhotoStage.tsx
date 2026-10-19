import Image from "next/image";
import { IMAGE_SRC, PORTRAIT_BLUR_DATA_URL } from "@/lib/portrait";

export function PhotoStage() {
  return (
    <div className="photo-stage" aria-hidden="false">
      <div className="photo-stage__halo" aria-hidden="true" />
      <div className="photo-stage__orbit photo-stage__orbit--one" aria-hidden="true" />
      <div className="photo-stage__orbit photo-stage__orbit--two" aria-hidden="true" />
      <Image
        className="photo-stage__image"
        src={IMAGE_SRC}
        alt="Amit Verma, frontend developer and UI/UX designer"
        fill
        priority
        placeholder="blur"
        blurDataURL={PORTRAIT_BLUR_DATA_URL}
        sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 760px"
      />
      <div className="photo-stage__note glass-panel" aria-hidden="true">
        <span>UI/UX design</span>
        <i />
        <span>Frontend</span>
      </div>
    </div>
  );
}
