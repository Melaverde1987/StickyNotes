import { Header } from 'components/Header';
import { CardsList } from 'components/CardsList';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <CardsList />

        {/*
      <ul>
        <li className="big">
          Groceries
          <ul>
            <li className="done">3 Tomatoes</li>
            <li>1 bunch of cherries</li>
            <li>6 onions</li>
            <li className="done">3 heads of garlic</li>
            <li>1 bag spring mix</li>
          </ul>
        </li>
        <li className="done">Cancel gym membership</li>
        <li>Clean gutters</li>
        <li className="done">Take package to the post office</li>
        <li className="done">Call Avery about Ali's party (afternoon)</li>
        <li>Sort recycling & put out trash</li>
      </ul>
      */}
      </main>
    </>
  );
};
