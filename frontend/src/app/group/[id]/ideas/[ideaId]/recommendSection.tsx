import { Box, Text, Link, VStack, Flex, Icon, Spinner } from "@chakra-ui/react";
import { FaUtensils, FaHotel, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FetchRecommendResponse} from "@/constants/type";

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
        <Box key={recommend.id} p={4} bg="white" borderRadius="md" boxShadow="md">
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              おすすめ⭐️ {recommend.name}
            </Text>
            <Link href={recommend.url} isExternal>
              <Icon as={FaStar} color="yellow.500" />
            </Link>
          </Flex>
          <Text fontSize="sm" color="gray.500" mt={2}>
            {recommend.url}
          </Text>
          <Flex mt={2}>
            <Text whiteSpace="pre-wrap" wordBreak="break-word">
              おすすめポイント：{recommend.content}
            </Text>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default RecommendSection;
