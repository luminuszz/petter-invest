import { GetServerSideProps } from "next";
import { dehydrate, useQuery } from "react-query";

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

export type GetServerSideWithCache<Props = any> = GetServerSideProps<
  { dehydratedState: ReturnType<typeof dehydrate> } & Props
>;

export const getAtivosKey = "ativos";

export async function getAtivos() {
  const response = await fetch("https://brapi.dev/api/quote/list?limit=20");

  const { stocks } = (await response.json()) as { stocks: Stock[] };

  return stocks;
}

export const useGetAtivos = () => useQuery(getAtivosKey, getAtivos, {});
