import {
  CommunityPostSettings,
  createCommunity,
  createQuery,
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
