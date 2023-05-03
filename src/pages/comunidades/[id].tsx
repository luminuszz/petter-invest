import { Community } from "@/core/entities/community.type";
import { getCommunityById } from "@/services/firebase/firestore";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

type StockPageProps = {
  community: Community;
};

interface ForumFrameProps {
  community: Community;
}

function ForumFrame() {
  return (
    <iframe
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      width="100%"
      height="100%"
      src={`http://45.79.221.151:4567/category/5/bbse3`}
    />
  );
}

const StockPage: NextPage<StockPageProps> = ({ community: communityData }) => {
  const router = useRouter();

  return (
    <Container margin="auto">
      <Flex p="2" flexDir="column" flex="1" width="full">
        <HStack flex="1" width="full">
          <IconButton
            onClick={router.back}
            variant="unstyled"
            aria-label="button"
            icon={<ArrowLeftIcon color="gray.300" />}
          />
        </HStack>

        <VStack
          mt="5"
          gap={4}
          alignItems="center"
          justifyContent="center"
          flex="1"
          width="full"
        >
          <Image
            borderRadius="md"
            w="140px"
            h="140px"
            src={
              "data:image/png;base64,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"
            }
            alt="ativo img"
          />

          <VStack alignItems="center">
            <Heading size="lg" color="gray.300">
              BBSE3
            </Heading>

            <Heading size="md" color="gray.300">
              BB Seguridade
            </Heading>
          </VStack>

          <Tabs size="lg" variant="line">
            <TabList>
              <Tab>Informações</Tab>
              <Tab>Turma</Tab>
              <Tab>Desafios</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Informações!</p>
              </TabPanel>
              <TabPanel h="full">
                <Box height="100vh">
                  <ForumFrame />
                </Box>
              </TabPanel>
              <TabPanel>
                <p>Desafios!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const community = await getCommunityById(id);

  const parsedData = {
    ...community?.props,
    comments:
      community?.props?.comments?.map((comment) => ({
        ...comment,
        created_at: comment.created_at.toString(),
      })) || [],
  };

  console.log({
    parsedData: parsedData,
  });

  return {
    props: {
      community: parsedData,
    },
  };
};

export default StockPage;
