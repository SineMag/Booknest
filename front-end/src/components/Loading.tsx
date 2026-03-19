interface Props {
  message: string;
}
export default function LoadingOverlay(props: Props) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white bg-opacity-75"
      style={{ zIndex: 9999 }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 fw-bold text-primary animate-pulse">{props.message}</p>
    </div>
  );
}
