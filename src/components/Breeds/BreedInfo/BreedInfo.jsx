import axios from 'axios';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from '../Breeds.module.css';
import './BreedInfo.css';
import { useState, useEffect } from 'react';

const BreedInfo = () => {
  const [allBreedsOptions, setAllBreedsOptions] = useState([]);
  const [findedBreed, setfindedBreed] = useState([]);
  const [imagesBreed, setImagesBreed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const getAllBreedOptions = async () => {
      try {
        setIsLoading(true);

        // Get all breeds options
        let resultAll = await axios.get('https://api.thecatapi.com/v1/breeds');
        setAllBreedsOptions(resultAll.data);
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

        // Get one breed images
        let { data } = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          {
            params: { limit: 20, breed_id: id },
          },
        );
        setImagesBreed(data);
        // console.log('getImgBreed', data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getImagesBreed();

    const findBreed = allBreedsOptions.filter(oneBreed => id === oneBreed.id);
    setfindedBreed(findBreed);
  }, [allBreedsOptions, id]);

  console.log('BreedInfo', allBreedsOptions);

  // Settings for slider
  const settings = {
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
            <div className="textWrapper">
              <h1 className="name">{name}</h1>
              <h2 className="bredFor">{bred_for}</h2>
              <div className="optionsWrapper">
                <div className="optionWrapper one">
                  <h3 className="title">Temperament:&nbsp;</h3>
                  <span className="description">{temperament}</span>
                </div>
                <div className="optionWrapper two">
                  <h3 className="title">Origin:&nbsp;</h3>
                  <span className="description">{origin}</span>
                </div>
                <div className="optionWrapper three">
                  <h3 className="title">Weight:&nbsp;</h3>
                  <span className="description">{`${weight.metric} kgs`}</span>
                </div>
                <div className="optionWrapper four">
                  <h3 className="title">Life span:&nbsp;</h3>
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
