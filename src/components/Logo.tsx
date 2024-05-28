import LogoIcon from "../icons/LogoIcon";
import BgLogo from "./BgLogo";

export default function Logo() {
  return (
    <div className="relative w-fit">
      <div>
        <BgLogo />
      </div>

      <div className="absolute top-0 left-0 z-10 translate-x-[75%] translate-y-[80%]">
        <LogoIcon />
      </div>
    </div>
  );
}
