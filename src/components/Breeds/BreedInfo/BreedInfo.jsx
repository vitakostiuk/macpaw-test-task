import axios from 'axios';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import Header from '../../Header';
import BackBtn from 'components/common/BackBtn';
import MainButton from 'components/common/MainButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from '../Breeds.module.css';
import './BreedInfo.css';
import { useState, useEffect } from 'react';

const BreedInfo = () => {
  const [allBreedsOptions, setAllBreedsOptions] = useState([]);
  const [findedBreed, setfindedBreed] = useState([]);
  const [imagesBreed, setImagesBreed] = useState([]);
  const [query, setQuery] = useState('');
  const [resultByquery, setResultByquery] = useState({});

  let { id } = useParams();

  useEffect(() => {
    const getAllBreedOptions = async () => {
      // Get all breeds options
      let resultAll = await axios.get('https://api.thecatapi.com/v1/breeds');
      setAllBreedsOptions(resultAll.data);
    };
    getAllBreedOptions();
  }, []);

  useEffect(() => {
    const getImagesBreed = async () => {
      // Get one breed images
      let { data } = await axios.get(
        'https://api.thecatapi.com/v1/images/search',
        {
          params: { limit: 20, breed_id: id },
        },
      );
      setImagesBreed(data);
      console.log('getImgBreed', data);

      // Search by name
      if (query) {
        setImagesBreed([]);
        setfindedBreed([]);
        let queryResult = await axios.get(
          'https://api.thecatapi.com/v1/images/search',
          {
            params: { q: query },
          },
        );
        console.log('queryResult', queryResult.data);
        setResultByquery(queryResult.data[0]);
      }
    };
    getImagesBreed();

    const findBreed = allBreedsOptions.filter(oneBreed => id === oneBreed.id);
    setfindedBreed(findBreed);
  }, [allBreedsOptions, id, query]);

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

  const handleSearchbarSubmit = name => {
    setQuery(name);
  };

  return (
    <>
      <Header handleSearchbarSubmit={handleSearchbarSubmit} />
      <div className={s.Paper}>
        <div className={s.BtnWrapper}>
          <BackBtn />
          <MainButton className={s.BigLightButton}>
            <span className={s.BigLightBtnText}>BREEDS</span>
          </MainButton>
        </div>

        {query && (
          <div className={s.ImgWrapper}>
            <img src={resultByquery.url} alt="cat" className={s.Img} />
          </div>
        )}

        <Slider {...settings}>
          {imagesBreed.map(({ id, url }) => (
            <div key={id} className={s.ImgWrapper}>
              <img src={url} alt="cat" className={s.Img} />
            </div>
          ))}
        </Slider>
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
      </div>
    </>
  );
};

export default BreedInfo;
