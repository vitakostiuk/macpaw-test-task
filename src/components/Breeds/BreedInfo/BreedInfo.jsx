import * as api from 'services/api-cat';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { ThemeContext, themes } from 'context/themeContect';
import { useState, useEffect, useContext } from 'react';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from '../../Search/Search.module.css';
import './BreedInfo.css';

const BreedInfo = () => {
  const [allBreedsOptions, setAllBreedsOptions] = useState([]);
  const [findedBreed, setfindedBreed] = useState([]);
  const [imagesBreed, setImagesBreed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useContext(ThemeContext);
  let { id } = useParams();

  useEffect(() => {
    const getAllBreedOptions = async () => {
      try {
        setIsLoading(true);

        // Get all breeds options
        let resultAll = await api.getData('/breeds');
        setAllBreedsOptions(resultAll);
        // console.log('resultAll', resultAll);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllBreedOptions();
  }, []);

  useEffect(() => {
    const getImagesBreed = async () => {
      try {
        setIsLoading(true);

        // Get one breed's images
        let oneBreedImgs = await api.getData('/images/search', {
          params: { limit: 20, breed_id: id },
        });
        setImagesBreed(oneBreedImgs);
        // console.log('oneBreedImgs', oneBreedImgs);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getImagesBreed();

    const findBreed = allBreedsOptions.filter(oneBreed => id === oneBreed.id);
    setfindedBreed(findBreed);
  }, [allBreedsOptions, id]);

  // Settings for slider
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    dotsClass: 'dots',
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div
        style={{
          height: '30px',
          backgroundColor: '#fff',
        }}
      >
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </div>
    ),
  };

  return (
    <>
      <TemplatePage>
        <PageHeader
          text="BREEDS"
          classNameBigBtn={s.BigLightButton}
          classNameText={s.BigLightBtnText}
        />

        {isLoading && <Loader />}

        {!isLoading && (
          <Slider {...settings}>
            {imagesBreed.map(({ id, url }) => (
              <div key={id} className={s.ImgWrapper}>
                <img src={url} alt="cat" className={s.Img} />
              </div>
            ))}
          </Slider>
        )}

        {findedBreed.map(
          ({
            bred_for = 'Family companion cat',
            name,
            temperament,
            origin,
            weight,
            life_span,
          }) => (
            <div
              className={
                theme === themes.light ? 'textWrapper' : 'textWrapperDark'
              }
            >
              <h1 className={theme === themes.light ? 'name' : 'nameDark'}>
                {name}
              </h1>
              <h2 className="bredFor">{bred_for}</h2>
              <div className="optionsWrapper">
                <div className="option">
                  <h3
                    className={theme === themes.light ? 'title' : 'titleDark'}
                  >
                    Temperament:&nbsp;
                  </h3>
                  <span className="description">{temperament}</span>
                </div>
                <div>
                  <h3
                    className={theme === themes.light ? 'title' : 'titleDark'}
                  >
                    Origin:&nbsp;
                  </h3>
                  <span className="description">{origin}</span>
                </div>
                <div>
                  <h3
                    className={theme === themes.light ? 'title' : 'titleDark'}
                  >
                    Weight:&nbsp;
                  </h3>
                  <span className="description">{`${weight.metric} kgs`}</span>
                </div>
                <div>
                  <h3
                    className={theme === themes.light ? 'title' : 'titleDark'}
                  >
                    Life span:&nbsp;
                  </h3>
                  <span className="description">{`${life_span} years`}</span>
                </div>
              </div>
            </div>
          ),
        )}
      </TemplatePage>
    </>
  );
};

export default BreedInfo;
