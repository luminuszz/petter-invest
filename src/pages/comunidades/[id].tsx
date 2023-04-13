import { Comment, Community } from "@/core/entities/community.type";
import { createComment, getCommunityById } from "@/services/firebase/firestore";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { compareDesc, formatDistanceToNow, isDate } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { username } from "react-lorem-ipsum";

type CommentProps = {
  comment: Comment;
};

const isDateType = (value: any): value is Date => isDate(value);

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const distance = formatDistanceToNow(new Date(comment.created_at as any), {
    locale: ptBR,
    addSuffix: true,
  });

  const name = useMemo(() => username(), []);

  return (
    <VStack alignItems="flex-start">
      <HStack alignItems="flex-end" spacing="2" justifyContent="center">
        <Avatar borderRadius="full"></Avatar>
        <Text color="gray.300" fontWeight="bold">
          {name}
        </Text>
        <Text color="gray.300" fontWeight="bold">
          -
        </Text>
        <Text color="gray.300">{distance}</Text>
      </HStack>

      <Text mt="2" fontSize="lg" color="gray.300">
        {comment.message}
      </Text>

      <HStack spacing="8">
        <Flex alignItems="center" justifyContent="center">
          <IconButton variant="unstyled" aria-label="like button">
            <Icon color="gray.300" w={6} h={6} as={AiOutlineLike} />
          </IconButton>
          <Text color="gray.300">{comment.likes}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <IconButton variant="unstyled" aria-label="like button">
            <Icon color="gray.300" w={6} h={6} as={AiOutlineDislike} />
          </IconButton>
          <Text color="gray.300">{comment.deslikes}</Text>
        </Flex>
      </HStack>
    </VStack>
  );
};

type StockPageProps = {
  community: Community;
};

const StockPage: NextPage<StockPageProps> = ({ community: communityData }) => {
  const router = useRouter();

  const [community, setCommunity] = useState<Community>(communityData);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleAddComment() {
    try {
      setLoading(true);

      await createComment({
        community_id: community.id,
        message: input,
        user_id: "1",
      });

      setInput("");

      const newCommunityState = await getCommunityById(communityData.id);

      if (newCommunityState) {
        setCommunity(newCommunityState);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const commentsList = useMemo(
    () =>
      community.comments.sort((a, b) =>
        compareDesc(
          new Date(a.created_at as any),
          new Date(b.created_at as any)
        )
      ),
    [community.comments]
  );

  return (
    <Container width="container.xl">
      <Flex p="5" flexDir="column">
        <HStack>
          <IconButton
            onClick={router.back}
            variant="unstyled"
            aria-label="button"
            icon={<ArrowLeftIcon color="gray.300" />}
          />
        </HStack>

        <VStack mt="10" alignItems="flex-start" spacing={2}>
          <Heading color="gray.300" size="xl">
            {community.stock_slug}
          </Heading>
          <Text color="gray.300" fontWeight="bold" fontSize="16px">
            {community.stock_slug}
          </Text>

          <Text fontWeight="bold" fontSize="22px" color="green.500">
            R$ 10,00
          </Text>
        </VStack>

        <Heading color="gray.300" mt="10" size="xl">
          Oque a comunidade diz sobre isso :
        </Heading>

        <Flex mt={10} flexDir="column">
          <FormControl>
            <FormLabel>Dê sua opinião</FormLabel>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Dê sua opinião também "
              rows={4}
            />
          </FormControl>

          <Button
            isLoading={loading}
            onClick={handleAddComment}
            isDisabled={!input.trim()}
            mt="3"
            colorScheme="green"
            variant="solid"
          >
            Comentar
          </Button>
        </Flex>

        <VStack spacing={4} mt="12" alignItems="flex-start">
          {commentsList.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
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
