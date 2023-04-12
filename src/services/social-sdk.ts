import {
  CommunityPostSettings,
  connectClient,
  createCommunity,
  createQuery,
  joinCommunity,
  leaveCommunity,
  runQuery,
} from "@amityco/ts-sdk";

type CreateCommunityMutationVariables = {
  name: string;
  id: string;
};

export const createCommunityMutation = async (
  args: CreateCommunityMutationVariables
) => {
  const query = createQuery(createCommunity, {
    displayName: args.name,
    postSetting: CommunityPostSettings.ANYONE_CAN_POST,
  });

  runQuery(query, ({ data: community, ...options }) =>
    console.log(community, options)
  );
};

export const joinCommunityMutation = async (community_id: string) => {
  const query = createQuery(joinCommunity, community_id);

  return runQuery(query);
};

export const leaveCommunityMutation = async (community_id: string) => {
  const query = createQuery(leaveCommunity, community_id);

  return runQuery(query);
};

export const createUserMutation = async ({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) => {
  const sessionHandler: Amity.SessionHandler = {
    sessionWillRenewAccessToken(renewal) {
      renewal.renew();
    },
  };

  await connectClient({ userId, displayName: name }, sessionHandler);
}; 