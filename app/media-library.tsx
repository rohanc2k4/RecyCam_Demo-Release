import * as React from "react";
import { Link, Stack, router } from "expo-router";
import { Button, ScrollView, Pressable } from "react-native";

import {
  Asset,
  getAssetsAsync,
  usePermissions,
} from "expo-media-library";
import { Image } from "expo-image";

// Test images can be added to this array for quick gallery testing
// Example: require("../assets/images/react-logo.png")
const testImages = [
  require("../assets/images/water-bottle-image-test.png"),
];

export default function MediaLibrary() {
  const [assets, setAssets] = React.useState<Asset[]>([]);
  const [permission, requestPermission] = usePermissions();

  React.useEffect(() => {
    if (!permission || permission.status !== "granted") {
      requestPermission();
    }
    getAlbums();
  }, [permission]);

  async function getAlbums() {
    const assetsResult = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 100,
    });
    setAssets(assetsResult.assets);
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Stack.Screen
          options={{
            title: "Your Library",
            headerTransparent: true,
            headerBlurEffect: "dark",
            headerLeft: () => (
              <Link href={"/"} asChild>
                <Button title="Cancel" />
              </Link>
            ),
          }}
        />
        {/* Display any test images added above */}
        {testImages.map((img, index) => (
          <Pressable
            key={`test-${index}`}
            onPress={() =>
              router.replace({ pathname: "/", params: { selected: img } })
            }
          >
            <Image source={img} style={{ width: "25%", height: 100 }} />
          </Pressable>
        ))}
        {assets.map((photo) => (
          <Pressable
            key={photo.id}
            onPress={() =>
              router.replace({ pathname: "/", params: { selected: photo.uri } })
            }
          >
            <Image
              source={photo.uri}
              style={{ width: "25%", height: 100 }}
            />
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
