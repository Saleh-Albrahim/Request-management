import { Redirect, Route } from 'react-router-dom';

interface Props {
  user: Object;
  path: string;
  Component: React.FC;
  updateUser: (user: Object) => void;
}
const SecuredRoute: React.FC<Props> = ({ Component, user, path, updateUser }) => {
  return <Route path={path} render={(props) => (user ? <Component /> : <Redirect to="/" />)} />;
};

export default SecuredRoute;
