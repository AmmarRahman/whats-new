/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/react-in-jsx-scope */
import { NewsList } from '../../components/NewsList/NewsList';
import { Page } from '../../components/Page/Page';

export const Home = (): JSX.Element => {
  // const { counter, handleDecrementClick, handleIncrementClick } = useCounter();
  // const { counter: c, handleDecrementClick: hDC, handleIncrementClick: hIC } = useCounterRedux();
  const homeText = 'New Announcements';

  return (
    <Page description={homeText} keywords={homeText} title={homeText}>
      <div> hello </div>
      <NewsList />
    </Page>
  );
};
