import { HStack, Text } from "@chakra-ui/react";

const ItemIcon = ({ icon: Icon, color, count }) => {
  return (
    <HStack gap="3">
      <Icon color={color} size={20} />
      <Text fontWeight="bold">×{count}</Text>
    </HStack>
  );
};

export default ItemIcon;
