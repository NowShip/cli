import { useGetSessionQuery } from "@/lib/endpoints";
import { Button } from "../ui/button";
import { NavUser } from "./nav-user";
import Logo from "../logo";
import { DrawerClose } from "../ui/drawer";

export default function Links({ isClose }: { isClose?: boolean }) {
  const { data: session } = useGetSessionQuery();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="flex justify-center md:hidden">
        <Logo />
      </div>
      <Button
        href="/about"
        variant="ghost"
        size="sm"
        className="justify-start md:justify-center"
      >
        About
      </Button>
      <Button
        href="#pricing"
        variant="ghost"
        size="sm"
        className="justify-start md:justify-center"
      >
        Pricing
      </Button>
      <Button
        href="/contact"
        variant="ghost"
        size="sm"
        className="justify-start md:justify-center"
      >
        Contact
      </Button>

      {session?.user ? (
        <NavUser />
      ) : (
        <>
          <Button href="/sign-in" variant="outline" size="sm">
            Sign In
          </Button>
          <Button href="/sign-up" variant="primary" size="sm">
            Sign Up
          </Button>
        </>
      )}
      {isClose && (
        <DrawerClose className="text-dark/70 mt-4">Close</DrawerClose>
      )}
    </div>
  );
}
