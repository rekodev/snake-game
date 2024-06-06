import { Navbar, NavbarContent } from "@nextui-org/navbar";
import GitHubIcon from "./icons/GitHubIcon";

const Footer = () => {
  return (
    <Navbar className="border">
      <NavbarContent>
        <p className="mx-auto flex">
          Made by rekodev&nbsp;
          <span>
            <a href="http://github.com/rekodev">
              <GitHubIcon />
            </a>
          </span>
        </p>
      </NavbarContent>
    </Navbar>
  );
};

export default Footer;
