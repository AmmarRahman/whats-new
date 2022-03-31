import { Link } from 'react-router-dom';
import logo from '../../assets/images/icons/logo-white.svg';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export const Header = (): JSX.Element => (
  <LayoutContainer role="banner" Tag="header">
    <nav className="flex items-center bg-gray-600 p-3 flex-wrap">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <Link to="/" className="p-2 mr-4 inline-flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <span className="pl-5 text-l text-white font-bold uppercase tracking-wide">
            What&apos;s New
          </span>
        </Link>
      </div>
    </nav>
  </LayoutContainer>
);
