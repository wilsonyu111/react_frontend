import Message from "./message";
import { useNavigate, useLocation } from "react-router-dom";

// this page requires 3 arguments
// props.message
// props.newPage
// props.newKey
function WaitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  let startCountDown = true;
  const startInterval = setInterval(function () {
    if (!startCountDown && location.state.newPage === undefined) {
      navigate("/", { state: {} });
      clearInterval(startInterval);
    } else if (!startCountDown) {
      navigate(location.state.newPage, { state: {} });
      clearInterval(startInterval);
    }
    startCountDown = false;
  }, 1000);
  return (
    <>
      <Message key={location.state.newKey} msg={location.state.message} />
    </>
  );
}

export default WaitPage;
