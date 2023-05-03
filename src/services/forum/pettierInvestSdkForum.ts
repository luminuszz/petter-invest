import { HttpGateway, petterInvestHttpGateway } from "./api";

interface CreateUserInput {
  username: string;
  email: string;
}

class PettierInvestSdkForum {
  constructor(private readonly apiGateway: HttpGateway) {}

  async getPost() {
    const data = await this.apiGateway.get("/unread");

    return data;
  }

  async createUser({ email, username }: CreateUserInput) {
    await this.apiGateway.post("/users", {
      username,
      email,
    });
  }

  async getUserByEmail(email: string) {
    const data = await this.apiGateway.get(`/users/email/${email}`);

    return data;
  }
}

export const pettierInvestSdkForum = new PettierInvestSdkForum(
  petterInvestHttpGateway
);
