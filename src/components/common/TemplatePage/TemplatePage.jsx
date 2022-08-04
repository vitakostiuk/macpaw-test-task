import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import Header from 'components/Header';
import s from './TemplatePage.module.css';

const TemplatePage = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Header />
      <div className={theme === themes.light ? s.Paper : s.PaperDark}>
        {children}
      </div>
    </>
  );
};

export default TemplatePage;
