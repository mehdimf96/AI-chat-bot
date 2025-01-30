import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoginPage from "./login/page";
// import ThemeToggler from "@/components/themeToggler";

// import Signup from "./components/signup";

export default function Home() {
  return (
    <div>
      {/* <ThemeToggler /> */}
      {/* <Signup /> */}
      <LoginPage />
    </div>
  );
}
