import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { LogOut } from "lucide-react";

import SignIn from "./auth/components/SignIn";
import Button from "../../components/Button/Button";
import Timezone from "./components/Timezone/Timezone";

const Main = () => {
  const { currentUser, handleSignOut } = useUserContext();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="text-2xl font-bold uppercase">welcome to</div>
        <div className="text-5xl font-extrabold uppercase text-secondary-default">
          hiroshima
        </div>
        {currentUser ? (
          <Button onClick={handleSignOut} size="icon">
            <LogOut />
          </Button>
        ) : (
          <SignIn />
        )}
      </div>

      <div className="absolute bottom-24 right-2 lg:bottom-2">
        <Timezone />
      </div>
    </>
  );
};

export default Main;
