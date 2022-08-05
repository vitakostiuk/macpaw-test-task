import { useState, useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { ReactComponent as UpdateBtn } from 'images/update-20.svg';
import { limitImg } from 'data/options';
import { orderList } from 'data/options';
import { typeList } from 'data/options';
import s from './GalleryForm.module.css';

const GalleryForm = ({ onSubmit, breedsOptions }) => {
  const [breed, setBreed] = useState('');
  const [order, setOrder] = useState('');
  const [type, setType] = useState('');
  const [limit, setLimit] = useState(20);

  const { theme } = useContext(ThemeContext);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'breed':
        setBreed(value);
        break;
      case 'order':
        setOrder(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'limit':
        setLimit(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(breed, order, type, limit);
  };

  return (
    <>
      <form
        className={theme === themes.light ? s.Form : s.FormDark}
        onSubmit={handleSubmit}
      >
        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>ORDER</label>
          <select
            name="order"
            onChange={handleChange}
            className={
              theme === themes.light ? s.SelectOrder : s.SelectOrderDark
            }
          >
            {orderList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>TYPE</label>
          <select
            name="type"
            onChange={handleChange}
            className={theme === themes.light ? s.SelectType : s.SelectTypeDark}
          >
            {typeList.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>BREED</label>
          <select
            name="breed"
            onChange={handleChange}
            className={
              theme === themes.light ? s.SelectBreed : s.SelectBreedDark
            }
          >
            {breedsOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <label className={s.SelectLabel}>LIMIT</label>
          <select
            name="limit"
            onChange={handleChange}
            className={
              theme === themes.light ? s.SelectLimit : s.SelectLimitDark
            }
          >
            {limitImg.map(({ value, label }) => (
              <option key={value} value={value}>
                {`${label} items per page`}
              </option>
            ))}
          </select>
        </div>

        <div className={s.SelectWrapper}>
          <button
            type="submit"
            className={theme === themes.light ? s.FormBtn : s.FormBtnDark}
          >
            <UpdateBtn className={s.ImgBtn} />
          </button>
        </div>
      </form>
    </>
  );
};

export default GalleryForm;
