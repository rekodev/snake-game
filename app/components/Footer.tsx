import GitHubIcon from "./icons/GitHubIcon";

const Footer = () => {
  return (
    <footer className="h-[65px] border-t-1 border-t-neutral-300 dark:border-t-neutral-700">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-center">
        <p className="mx-auto flex">
          Made by rekodev&nbsp;
          <span>
            <a target="_blank" href="http://github.com/rekodev">
              <GitHubIcon />
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
