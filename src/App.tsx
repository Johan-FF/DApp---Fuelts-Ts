import { BN, Provider, Wallet, Contract } from "fuels";
import { useEffect, useState } from "react";
import ABI_COUNTER from "./abi/counter";

const MNEMONIC_PHRASE = import.meta.env.VITE_MNEMONIC_PHRASE;
const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID;

const provider = await Provider.create("https://beta-5.fuel.network/graphql");
const wallet = Wallet.fromMnemonic(MNEMONIC_PHRASE);

function App() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState<number[]>([]);
  const [contract, setContract] = useState<Contract | undefined>();

  useEffect(() => {
    async function config() {
      const fetchContract = new Contract(CONTRACT_ID, ABI_COUNTER, provider);
      setContract(fetchContract);

      wallet.provider = provider;
    }
    config();
  }, []);

  useEffect(() => {
    (async () => {
      await wallet.getBalances().then((data: any) => {
        const balances: number[] = [];
        data.forEach((account: any) => {
          balances.push(new BN(account.amount).toNumber());
        });
        setBalance(balances);
      });
    })();
  }, [count]);

  useEffect(() => {
    if (contract) {
      contract.account = wallet;
      (async () => {
        const { value } = await contract.functions
          .count()
          .txParams({ gasPrice: 1 })
          .get();
        setCount(Number(value));
      })();
    }
  }, [contract]);

  async function increment() {
    setLoading(true);
    try {
      await contract!.functions
        .increment()
        .txParams({ gasPrice: new BN(1) })
        .call();
      const { value } = await contract!.functions.count().get();
      setCount(Number(value));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div>
        Balance
        <br />
        {balance.map((value, index) => (
          <span key={index}>
            {index}:{value}
          </span>
        ))}
      </div>
      <p>Counter: {count}</p>
      <button disabled={loading} onClick={increment}>
        {loading ? "Incrementing..." : "Increment"}
      </button>
    </main>
  );
}

export default App;
