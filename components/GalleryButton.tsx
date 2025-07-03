import { Link } from "expo-router";
import IconButton from "./IconButton";

export default function GalleryButton() {
  return (
    <Link href="/media-library" asChild>
      {/* Small button positioned in the bottom left to open the gallery */}
      <IconButton
        iosName="photo.on.rectangle"
        androidName="images-outline"
        containerStyle={{ position: "absolute", bottom: 10, left: 10 }}
      />
    </Link>
  );
}
