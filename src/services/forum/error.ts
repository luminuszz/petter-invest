import { AxiosError } from "axios";

export class PeterInvestSdkException extends Error {
  private readonly originalError: Error;

  constructor(message: string) {
    super(message);

    this.originalError = this;
  }
}

export class PetterInvestHttpError extends PeterInvestSdkException {
  public readonly axiosError: AxiosError;

  constructor(error: AxiosError) {
    super(error.message);

    this.axiosError = error;
  }
}
