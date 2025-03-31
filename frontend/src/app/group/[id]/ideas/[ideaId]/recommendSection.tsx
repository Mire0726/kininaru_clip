import {
  Box,
  Text,
  Link,
  VStack,
  Flex,
  Icon,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { FetchRecommendResponse } from "@/constants/type";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface RecommendSectionProps {
  recommends?: FetchRecommendResponse;
  isLoading: boolean;
}

const RecommendSection = ({ recommends, isLoading }: RecommendSectionProps) => {
  if (isLoading) {
    return <Spinner color="blue.500" size="xl" />;
  }

  if (!recommends?.recommends.length) {
    return <Text color="gray.500">おすすめのアイデアはありません。</Text>;
  }

  return (
    <VStack spacing={4} align="stretch" mt={4}>
      {recommends.recommends.map((recommend) => (
        <Box
          key={recommend.id}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="md" color="gray.500" mt={2}>
            ここもおすすめ！⭐️
          </Text>
          <Flex justify="space-between">
            <Heading size="md" mt={2}>
              {recommend.name}
            </Heading>
            <Link href={recommend.url} isExternal>
              <Icon as={ExternalLinkIcon} color="gray.600" />
            </Link>
          </Flex>
          <Divider my={4} />

          <Text fontSize="md" fontWeight="bold">
            おすすめポイント：
          </Text>
          <Flex mt={2}>
            <Text whiteSpace="pre-wrap" wordBreak="break-word">
              {recommend.content}
            </Text>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default RecommendSection;
