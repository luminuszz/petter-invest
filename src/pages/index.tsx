import * as database from "@/services/firebase/firestore";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useState } from "react";

type AtivoCardProps = {
  stock: {
    name: string;
    logo: string;
    valor: string;
  };
  handleClick?: () => void;
};

const AtivoCard: FC<AtivoCardProps> = ({ stock, handleClick }) => {
  const price = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(Number(stock.valor));

  return (
    <Box
      onClick={handleClick}
      cursor="pointer"
      maxW="full"
      _hover={{
        transform: "scale(1.03)",
        transition: "all 0.2s ease-in-out",
      }}
      width="100%"
      h="120px"
      bgColor="gray.800"
      borderRadius="2xl"
    >
      <Flex
        width="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        p="2"
      >
        <Image
          borderRadius="md"
          boxSize="100px"
          alt="ativo image"
          src={stock.logo}
        />
        <VStack align="flex-start" justifyContent="flex-start" ml="2">
          <Heading size="md" color="gray.300">
            {stock.name}
          </Heading>
          <Text color="gray.300" fontSize="12">
            lorem impsu
          </Text>
          <Text fontWeight="bold" color="gray.300" fontSize="12">
            {price}
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

interface Props {
  stocks: Stock[];
}

const Home: NextPage<Props> = ({ stocks }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAcceptCommunity = async (stock: Stock) => {
    if (loading) return;

    setLoading(true);

    try {
      const existsCommunity = await database.getCommunityBySlug(stock.name);

      if (!existsCommunity) {
        await database.createCommunity({
          logo_img: stock.logo,
          name: stock.name,
          stock_slug: stock.name,
        });
      }

      router.push(`/comunidades/${stock.stock}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container width="container.xl">
      <Flex flexDir="column" px="2" pt="2">
        <VStack align="flex-start" spacing="10">
          <Heading size="md" color="gray.300">
            Ativos
          </Heading>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="Procure pelo seu ativo" />
          </InputGroup>
          <HStack width="full" justifyContent="space-between">
            <Heading size="md" color="gray.300">
              Ativos populares
            </Heading>
            <Heading color="blue.500" size="md">
              Favoritos
            </Heading>
          </HStack>
          <VStack gap="2" w="full" spacing={2} paddingY={2}>
            {stocks?.map((stock) => (
              <AtivoCard
                handleClick={() => handleAcceptCommunity(stock)}
                stock={{
                  logo: stock.logo,
                  name: stock.name,
                  valor: stock.close.toString(),
                }}
                key={stock.stock}
              />
            ))}
          </VStack>
        </VStack>
      </Flex>
    </Container>
  );
};

export interface Stock {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap?: number;
  logo: string;
  sector?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://brapi.dev/api/quote/list?limit=20");

  const { stocks } = (await response.json()) as { stocks: Stock[] };

  return {
    props: {
      stocks,
    },
  };
};

export default Home;
