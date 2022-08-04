import Sidebar from '../Sidebar';
import Main from '../Main';
import { useState } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import s from './App.module.css';

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () =>
    setTheme(prevTheme =>
      prevTheme === themes.light ? themes.dark : themes.light,
    );

  console.log(theme);

  return (
    <div className={theme === themes.light ? s.Wrapper : s.WrapperDark}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Sidebar />
        <Main />
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
