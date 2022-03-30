import { Link } from 'react-router-dom';
import logo from '../../assets/images/icons/logo.svg';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export const Header = (): JSX.Element => (
  <LayoutContainer role="banner" Tag="header">
    <Link to="/" className="home-button">
      <img src={logo} alt="Logo" className="w-1/6" />
    </Link>
  </LayoutContainer>
);
