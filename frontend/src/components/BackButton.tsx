import { Button, Text } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

interface BackButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

export const BackButton = ({
  children = "Back",
  ...props
}: BackButtonProps) => {
  return (
    <Button colorScheme="blue" variant="outline" {...props}>
      <Text>{children}</Text>
    </Button>
  );
};
