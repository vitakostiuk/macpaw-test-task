import PropTypes from 'prop-types';
import cssGrid from 'styles/cssGrid.module.css';

const BreedGallery = ({ name, breed }) => {
  return (
    <>
      <ul className={cssGrid.GalleryWrap}>
        {breed.map(({ id, url }) => (
          <li key={id} className={cssGrid.GalleryItem}>
            <img src={url} alt={name} className={cssGrid.Img} />
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
