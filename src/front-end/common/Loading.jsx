const Loading = ({ loading = false }) => {
    return (
        <div
            style={{
                height: "100%",
                width: loading ? "100%" : "0%",
                position: "fixed",
                zIndex: "9999",
                top: 0,
                left: 0,
                backgroundColor: "rgb(0, 0, 0)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
        >
            {loading && (
                <i
                    className="fa fa-spinner fa-pulse fa-5x fa-fw"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                    }}
                ></i>
            )}
        </div>
    );
};

export default Loading;
