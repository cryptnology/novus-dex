import { ethers } from "ethers";

import TOKEN from "backend/artifacts/src/backend/contracts/Token.sol/Token.json";
import EXCHANGE from "backend/artifacts/src/backend/contracts/Exchange.sol/Exchange.json";

export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });

  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });

  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = ethers.utils.getAddress(accounts[0]);
  dispatch({ type: "ACCOUNT_LOADED", account });

  let balance = await provider.getBalance(account);
  balance = ethers.utils.formatEther(balance);

  dispatch({ type: "BALANCE_LOADED", balance });

  return { account, balance };
};

export const loadTokens = async (provider, addresses, dispatch) => {
  let tokens = [];

  if (addresses.length) {
    for (let i = 0; i < addresses.length; i++) {
      const token = new ethers.Contract(addresses[i], TOKEN.abi, provider);
      const symbol = await token.symbol();
      dispatch({ type: `TOKEN_${i + 1}_LOADED`, token, symbol });

      tokens.push({ token, symbol });
    }
  }

  return tokens;
};

export const loadExchange = async (provider, address, dispatch) => {
  const exchange = new ethers.Contract(address, EXCHANGE.abi, provider);
  dispatch({ type: "EXCHANGE_LOADED", exchange });

  return exchange;
};
