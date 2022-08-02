import Header from 'components/Header';
import s from './TemplatePage.module.css';

const TemplatePage = ({ children }) => {
  return (
    <>
      {' '}
      <Header />
      <div className={s.Paper}>{children}</div>
    </>
  );
};

export default TemplatePage;
