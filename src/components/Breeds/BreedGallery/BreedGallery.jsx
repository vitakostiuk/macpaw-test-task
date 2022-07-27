import PropTypes from 'prop-types';
import s from '../Breeds.module.css';

const BreedGallery = ({ name, breed }) => {
  return (
    <>
      <ul className={s.GalleryWrap}>
        {breed.map(({ id, url }) => (
          <li key={id} className={s.GalleryItem}>
            <img src={url} alt={name} className={s.Img} />
          </li>
        ))}
      </ul>
    </>
  );
};

BreedGallery.propTypes = {
  name: PropTypes.string.isRequired,
  breed: PropTypes.array.isRequired,
};

export default BreedGallery;
