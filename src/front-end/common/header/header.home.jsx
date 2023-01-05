import { Link } from "react-router-dom";
import { BaseHeader } from "./header.base";

export const HomeHeader = () => {
  return (
    <BaseHeader>
      {
        <div>
          <Link
            to={"#popular-services"}
            className="text-base text-dark mx-4 font-medium"
          >
            Services
          </Link>
          <Link
            to={"/provider/registration"}
            className="text-base text-dark mx-4 font-medium"
          >
            Become a provider
          </Link>
        </div>
      }
    </BaseHeader>
  );
};
