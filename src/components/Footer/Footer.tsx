import { app } from '../../common/constants';
import { LayoutContainer } from '../LayoutContainer/LayoutContainer';

export const Footer = (): JSX.Element => (
  <LayoutContainer role="contentinfo" Tag="footer">
    <div className="text-center p-6 bg-gray-200">
      <span>Copyright {new Date().getFullYear()}:</span>
      <span className="text-gray-600 font-semibold pl-2">{`${app.name}`}</span>
    </div>
  </LayoutContainer>
);
