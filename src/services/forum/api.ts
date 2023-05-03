import axios, { AxiosError, AxiosInstance } from "axios";
import { PetterInvestHttpError } from "./error";

export const pettierInvestForumServiceApi = axios.create({
  baseURL: "http://45.79.221.151:4567/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_FORUM_KEY}`,
  },
});

export class HttpGateway {
  constructor(private readonly apiGateway: AxiosInstance) {}

  async get<Data = any>(url: string) {
    try {
      const response = await this.apiGateway.get<Data>(url);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new PetterInvestHttpError(error);
      }
    }
  }

  async post(url: string, data: any) {
    try {
      const response = await this.apiGateway.post(url, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new PetterInvestHttpError(error);
      }
    }
  }
}

export const petterInvestHttpGateway = new HttpGateway(
  pettierInvestForumServiceApi
);
