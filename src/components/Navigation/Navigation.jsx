import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import NavItem from './NavItem';
import { navButtons } from '../../data/navigation';
import s from './Navigation.module.css';

const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section className={s.Wrapper}>
      <h2 className={theme === themes.light ? s.Title : s.TitleDark}>
        Lets start using The Cat API
      </h2>
      <nav className={s.NavList}>
        {navButtons.map(({ name, image, backgroundColor, path }, index) => (
          <ul key={index}>
            <NavItem
              name={name}
              image={image}
              backgroundColor={backgroundColor}
              path={path}
            />
          </ul>
        ))}
      </nav>
    </section>
  );
};

export default Navigation;
