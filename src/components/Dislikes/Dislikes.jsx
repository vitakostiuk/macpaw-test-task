import * as api from 'services/api-cat';
import { useState, useEffect } from 'react';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import cssGrid from 'styles/cssGrid.module.css';
import css from 'styles/itemNotFound.module.css';

const Dislikes = () => {
  const [dislikes, setDislikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClickImg, setIsClickImg] = useState(false);
  const [imgId, setImgId] = useState('');

  useEffect(() => {
    const getAllVoting = async () => {
      try {
        setIsLoading(true);

        // Get all votes
        const allVotes = await api.getData('/votes', {
          params: { sub_id: 'User-123' },
        });
        // console.log('allVotes', allVotes);
        const dislikesVotes = allVotes.filter(vote => vote.value === 0);
        setDislikes(dislikesVotes);
        // console.log('dislikesVote', dislikesVotes);

        // Delete vote
        if (isClickImg) {
          const dataForDelete = dislikesVotes.find(vote => vote.id === imgId);
          console.log('dataForDelete', dataForDelete);

          const deleteVote = await api.deleteVote('/votes', dataForDelete.id);
          console.log('deleteVote', deleteVote);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setIsClickImg(false);
      }
    };
    getAllVoting();
  }, [imgId, isClickImg]);

  const handleClickImg = id => {
    setIsClickImg(true);
    setImgId(id);
  };
  return (
    <>
      <TemplatePage>
        <PageHeader text="DISLIKES" />

        {isLoading && <Loader />}

        {dislikes && !isLoading && (
          <ul className={cssGrid.GalleryWrap}>
            {dislikes.map(item => (
              <li
                key={item.id}
                className={cssGrid.GalleryItem}
                onClick={() => handleClickImg(item.id)}
              >
                {item ? (
                  <img
                    src={item.image.url}
                    alt="dislikes"
                    className={cssGrid.Img}
                  />
                ) : (
                  <div className={cssGrid.ImgNotFound}>Image not found</div>
                )}
              </li>
            ))}
          </ul>
        )}

        {dislikes.length === 0 && !isLoading && (
          <div className={css.TextWrap}>
            <p className={css.ItemNotFound}>No item found</p>
          </div>
        )}
      </TemplatePage>
    </>
  );
};

export default Dislikes;
