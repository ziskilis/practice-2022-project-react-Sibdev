import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, Text } from 'src/components';
import { classnames } from 'src/utils';
import { formatSum } from 'src/utils/common';

import { AddNewCategoryModal } from '../../TableModals';
import AddCategoryButton from '../CategoriesTableHeader/AddCategoryButton';

import styles from './CategoriesTableBody.module.scss';

const CategoriesTableBody = () => {
  const categories = useSelector((state) => state.categories.list);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  return (
    <div className={styles.wrapper}>
      {!!categories.length ? (
        <>
          <div className={styles.headerWrapper}>
            <Text weight={400}>Категория</Text>
            <div className={styles.rightColumnItemText}>
              <Text weight={400}>Сумма</Text>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            {categories.map((item) => {
              return (
                <div key={item.id} className={styles.categoryItem}>
                  <div className={styles.categoryItemColumn}>
                    <Text color="white">{item.name}</Text>
                  </div>
                  <div className={classnames([styles.rightColumnItem, styles.categoryItemColumn])}>
                    <div className={styles.rightColumnItemText}>
                      <Text color="white" align="right">
                        {formatSum(item.transactions_sum)}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.addCategoryButtonWrapper}>
            <AddCategoryButton />
          </div>
        </>
      ) : (
        <Box mt={62} ml={26}>
          <div className={styles.emptyCategoryText}>
            <Text align="center" weight={400} size={'l'} opacity={0.5} color={'white'}>
              У вас нет ни одной категории
            </Text>
          </div>

          <Button width={256} height={56} variant={'brand'} onClick={handleOpen}>
            <Text color={'white'} size={'l'}>
              Добавить категорию
            </Text>
          </Button>
          <AddNewCategoryModal isOpened={isOpened} handleClose={handleClose} />
        </Box>
      )}
    </div>
  );
};

export default CategoriesTableBody;
