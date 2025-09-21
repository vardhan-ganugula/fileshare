
import { MdOutlineHorizontalRule } from "react-icons/md";
import { UploadForm } from "./index";
import { Link } from "react-router-dom";
function HomepageMain() {
  return (
    <main className="h-full w-full px-15 flex py-3 md:items-center justify-center">
      <div className="md:ml-16 md:h-1/2 w-4/5 flex gap-10 md:flex-row flex-col">
        <div className="w-2/3 hidden md:block">
          <div className="flex items-center text-zinc-400">
            <MdOutlineHorizontalRule size={50} /> <span>SHARE</span>
          </div>
          <h1 className="text-black text-4xl font-bold">Upload / Share</h1>
          <div className="mt-5 font-light text-xl mb-5">
            <h4>The Best Solution and</h4>
            <h4>Easy.Fast.Secure</h4>
          </div>
          <div className="mt-14">
            <Link to="https://vardhan-dev.in" className="black_fluid-btn">
              More Projects
            </Link>
          </div>
          <div className="mt-5 text-zinc-400">
            <p>multimedia / documents supported</p>
          </div>
        </div>
        <div>
        <UploadForm />
        </div>
      </div>

    </main>
  );
}

export default HomepageMain;
