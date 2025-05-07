import type React from "react";
import { useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { IconButton } from "react-native-paper"; // New icon import

type PhotoUploadProps = {
  initialImage?: string | null;
  onImageSelected: (uri: string) => void;
  size?: "small" | "medium" | "large";
  className?: string;
};

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  initialImage,
  onImageSelected,
  size = "medium",
  className = "",
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-20 h-20";
      case "large":
        return "w-32 h-32";
      default:
        return "w-24 h-24";
    }
  };

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert("Error", response.errorMessage || "Image pick failed");
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setImage(uri);
          onImageSelected(uri);
        }
      }
    );
  };

  return (
    <View className={`items-center mb-5 ${className}`}>
      {image ? (
        <View className="relative">
          <Image source={{ uri: image }} className={`${getSizeClass()} rounded-full`} />
          <View className="absolute bottom-0 right-0">
            <IconButton
              icon="camera"
              size={20}
              mode="contained"
              onPress={pickImage}
              containerColor="#06b6d4"
              iconColor="white"
              style={{ borderWidth: 2, borderColor: "white" }}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          className={`${getSizeClass()} rounded-full bg-gray-100 items-center justify-center border-2 border-dashed border-gray-300`}
        >
          <IconButton icon="camera-plus" size={24} iconColor="#9ca3af" />
          <Text className="text-gray-500 mt-2 text-xs">Add Photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PhotoUpload;
