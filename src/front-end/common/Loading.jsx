import clsx from "clsx";

const Loading = ({ loading = false, backdrop = true }) => {
  const loadingComponent = loading && (
    <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
  );
  return (
    <div
      className={clsx([
        "d-flex items-center justify-center",
        {
          "w-100 h-100 fixed z-[9999] top-0 left-0 bg-[#000000a0]":
            loading && backdrop,
        },
      ])}
    >
      {loadingComponent}
    </div>
  );
};

export default Loading;
