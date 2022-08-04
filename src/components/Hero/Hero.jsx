import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import girlImg from 'images/girl-and-pet.png';
import s from './Hero.module.css';

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme === themes.light ? s.Wrapper : s.WrapperDark}>
      <img src={girlImg} alt="hero" className={s.HeroImg} />
    </div>
  );
};

export default Hero;
