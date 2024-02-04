// eslint-disable-next-line react/prop-types
const FeedbackMessage = ({ isSuccess }) => {
  return <div className={`p-2 mt-2 rounded text-center ${isSuccess ? "bg-success text-white" : "bg-danger text-white"}`}>{isSuccess ? <h2>Message sent successfully!</h2> : <h2>Failed to send message. Please check your internet connection and try again.</h2>}</div>;
};

export default FeedbackMessage;
