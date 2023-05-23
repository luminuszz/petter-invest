import { createSessionWithGoogle, getUser } from "@/services/firebase/auth";
import { PetterInvestHttpError } from "@/services/forum/error";
import { pettierInvestSdkForum } from "@/services/forum/pettierInvestSdkForum";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Flex, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface UserProps {
  url: string | null;
  name: string | null;
  email?: string;
}

export function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser({ name: user.username, url: user.imageAvatar });
      }
    });
  }, []);

  async function handleLogin() {
    setLoading(true);
    try {
      const user = await createSessionWithGoogle();

      setUser({ name: user.email, url: user.imageAvatar });

      if (!user.email) return;

      await pettierInvestSdkForum.getUserByEmail(user.email);
    } catch (e) {
      if (e instanceof PetterInvestHttpError) {
        if (user) {
          await pettierInvestSdkForum.createUser({
            email: user.email as string,
            username: user.name as string,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  }

  /*   useEffect(() => {
    deleteSession().then(() => console.log("logout"));
  }, []); */
  return (
    <Flex justify="space-between" alignItems="center" py="2" px="2" mt="2">
      <IconButton aria-label="meny" variant="ghost">
        <HamburgerIcon w="30px" height="30px" />
      </IconButton>
      <Avatar
        onClick={!user ? handleLogin : () => {}}
        size="sm"
        src={user?.url || ""}
      />
    </Flex>
  );
}
