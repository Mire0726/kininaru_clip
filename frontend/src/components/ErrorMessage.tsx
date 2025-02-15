import { Flex, Text, Button } from "@chakra-ui/react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      bg="#FFF8F8"
      p={4}
    >
      <Text
        color="red.500"
        fontSize={{ base: "lg", md: "xl" }}
        textAlign="center"
        mb={4}
      >
        {message}
      </Text>
      {onRetry && (
        <Button
          onClick={onRetry}
          colorScheme="blue"
          size={{ base: "sm", md: "md" }}
        >
          再試行
        </Button>
      )}
    </Flex>
  );
};
