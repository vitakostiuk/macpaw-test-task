import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import s from '../Breeds/Breeds.module.css';

const Search = () => {
  // const [query, setQuery] = useState('');
  const [resultByquery, setResultByquery] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.headers.common['x-api-key'] =
    'b1dfeea4-d632-4776-b494-723bac3c8eb2';

  const { state } = useLocation();

  useEffect(() => {
    // setQuery(state.query);
    const getByQuery = async () => {
      try {
        setIsLoading(true);
        if (state.query) {
          let queryResult = await axios.get(
            'https://api.thecatapi.com/v1/images/search',
            {
              params: { q: state.query },
            },
          );
          // console.log('Search by name', queryResult.data);
          setResultByquery(queryResult.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getByQuery();
  }, [state.query]);

  return (
    <>
      <TemplatePage isLoading={isLoading}>
        <PageHeader text="SEARCH" />
        {isLoading && <Loader />}
        {state.query && !isLoading && (
          <div className={s.ImgWrapper}>
            <img src={resultByquery.url} alt="cat" className={s.Img} />
          </div>
        )}
      </TemplatePage>
    </>
  );
};

export default Search;
