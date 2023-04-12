import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Avatar as LoremAvatar, LoremIpsum, username } from "react-lorem-ipsum";

const Comment: React.FC = () => {
  return (
    <VStack alignItems="flex-start">
      <HStack alignItems="flex-end" spacing="2" justifyContent="center">
        <Avatar borderRadius="full">
          <LoremAvatar style={{ borderRadius: 9999 }} />
        </Avatar>
        <Text color="gray.300" fontWeight="bold">
          {username()}
        </Text>
        <Text color="gray.300" fontWeight="bold">
          -
        </Text>
        <Text color="gray.300">3 horas atrás</Text>
      </HStack>

      <Text mt="2" fontSize="lg" color="gray.300">
        <LoremIpsum p={1} avgSentencesPerParagraph={3} />
      </Text>

      <HStack spacing="8">
        <Flex alignItems="center" justifyContent="center">
          <IconButton variant="unstyled" aria-label="like button">
            <Icon color="gray.300" w={6} h={6} as={AiOutlineLike} />
          </IconButton>
          <Text color="gray.300">12</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <IconButton variant="unstyled" aria-label="like button">
            <Icon color="gray.300" w={6} h={6} as={AiOutlineDislike} />
          </IconButton>
          <Text color="gray.300">12</Text>
        </Flex>
      </HStack>
    </VStack>
  );
};

const StockPage: NextPage<{
  results: { symbol: string; regularMarketPrice: number; longName: string };
}> = ({ results }) => {
  const router = useRouter();

  return (
    <Container width="container.xl">
      <Flex p="5" flexDir="column">
        <HStack>
          <IconButton
            onClick={() => router.back()}
            variant="unstyled"
            aria-label="button"
            icon={<ArrowLeftIcon color="gray.300" />}
          />
        </HStack>

        <VStack mt="10" alignItems="flex-start" spacing={2}>
          <Heading color="gray.300" size="xl">
            {results.symbol}
          </Heading>
          <Text color="gray.300" fontWeight="bold" fontSize="16px">
            {results.longName}
          </Text>

          <Text fontWeight="bold" fontSize="22px" color="green.500">
            {Intl.NumberFormat("pt-BR", {
              currency: "BRL",
              style: "currency",
            }).format(results.regularMarketPrice)}
          </Text>
        </VStack>

        <Heading color="gray.300" mt="10" size="xl">
          Oque a comunidade diz sobre isso :
        </Heading>

        <VStack spacing={4} mt="12" alignItems="flex-start">
          {Array.from({ length: 10 }).map((_, index) => (
            <Comment key={index} />
          ))}
        </VStack>
      </Flex>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string };

  const response = await fetch(`https://brapi.dev/api/quote/${slug}`);

  const { results } = await response.json();

  return {
    props: {
      results: results[0],
    },
  };
};

export default StockPage;
