import { useState } from "react";
import defaultImage from "../../../assets/images/icons/img_default.svg";

function SafeImage({ ...props }) {
  const [src, setSrc] = useState(props.src ?? defaultImage);
  const handleError = () => setSrc(defaultImage); // 주소는 존재하지만 로딩에 실패하는 경우
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} src={src} onError={handleError} />;
}

export default SafeImage;
