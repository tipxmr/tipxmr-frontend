import PropTypes from "prop-types";
import { isNil } from "ramda";
import { Redirect, Route } from "react-router-dom";
import { useWalletState } from "../context/wallet";

function PrivateRoute({ children, ...props }) {
  const wallet = useWalletState();
  //const [isAuthenticated, setIsAuthenticated] = useState();
  //const isAuthenticated = !isNil(wallet.wallet) && isNil(wallet.error);
  console.log("privateRoute wallet", wallet);
  const { isPending, isResolved } = wallet.status;

  /* useEffect(() => {
    if (isResolved) {
      setIsAuthenticated(!isNil(wallet.wallet) && isNil(wallet.error));
    }
    console.log("wallet status", wallet.status);
  }, [wallet, isResolved]); */

  function isAuthenticated() {
    return !isNil(wallet.wallet) && isNil(wallet.error);
  }

  if (isPending) {
    return null;
  }
  console.log("wallet", wallet);
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
