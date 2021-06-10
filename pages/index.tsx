import { NextPage } from 'next';
import HomePage from '../mySrc/pages/home/Home';

interface Props {
  DBLoading: boolean;
}

const Home: NextPage<Props> = props => {
  return <HomePage {...props} />;
};

export default Home;
