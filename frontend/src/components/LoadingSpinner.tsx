import { Flex, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Flex 
      justify="center" 
      align="center" 
      minH="100vh" 
      bg="#FFF8F8"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#46B2FF"
        size="xl"
      />
    </Flex>
  );
};