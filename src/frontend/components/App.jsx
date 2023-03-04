import { useEffect } from "react";
import { useDispatch } from "react-redux";

import config from "frontend/config.json";
import {
  loadNetwork,
  loadProvider,
  loadAccount,
  loadTokens,
  loadExchange,
} from "store/interactions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBlockchainData = async () => {
      const provider = loadProvider(dispatch);
      const chainId = await loadNetwork(provider, dispatch);

      await loadAccount(provider, dispatch);

      const novus = config[chainId].novus;
      const mETH = config[chainId].mETH;
      await loadTokens(provider, [novus.address, mETH.address], dispatch);

      const exchange = config[chainId].exchange;
      await loadExchange(provider, exchange.address, dispatch);
    };
    loadBlockchainData();
  }, [dispatch]);

  return (
    <div>
      {/* Navbar */}

      <main className="exchange grid">
        <section className="exchange__section--left grid">
          {/* Markets */}

          {/* Balance */}

          {/* Order */}
        </section>
        <section className="exchange__section--right grid">
          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}
        </section>
      </main>

      {/* Alert */}
    </div>
  );
};

export default App;
