import { MdHome, MdWork, MdPerson } from "react-icons/md";

export default function Navbar() {
  return (
    <div>
      <nav className="sticky flex flex-row justify-center gap-5 items-center w-full h-14 bg-slate-400 drop-shadow-md">
        <div className="flex flex-col items-center">
          <MdHome className="h-8 w-8" />
          HOME
        </div>
        <div className="flex flex-col items-center">
          <MdWork className="h-8 w-8" />
          WORK
        </div>
        <div className="flex flex-col items-center">
          <MdPerson className="h-8 w-8" />
          PERSONAL
        </div>
      </nav>
    </div>
  );
}
