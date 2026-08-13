import axios from "./axios";

export async function uploadImage(imageFile) {
  const response = await axios.postForm(`/images/upload`, {
    image: imageFile
  });
  const { url } = response.data;
  return url;
}
