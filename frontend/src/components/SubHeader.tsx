import { Text, Flex } from "@chakra-ui/react";

interface SubHeaderProps {
  title: string | undefined;
  users: {
    users: { name: string }[];
  } | undefined;
}

export const SubHeader = ({ title, users }: SubHeaderProps) => {
  return (
    <Flex direction="column" align="center">
      <Text fontSize="2xl" fontWeight="bold" color="#46B2FF">
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        {users?.users?.length
          ? users.users.map((user) => user.name).join("・")
          : "メンバーがいません"}
      </Text>
    </Flex>
  );
};