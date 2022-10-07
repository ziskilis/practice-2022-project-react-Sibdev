import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Arrow } from 'src/assets/icons';
import { Button, Popover, Text } from 'src/components';
import Select from 'src/components/Select';
import { getAims } from 'src/store/slices/aimsSlice';

const AimsSortButton = () => {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState({});
  const sortOptions = [
    { id: 0, sortOption: 'days_to_end', sortType: '', name: 'Ближе к завершению' },
    { id: 1, sortOption: 'days_to_end', sortType: '-', name: 'Дальше от завершения' },
    { id: 2, sortOption: 'created_at', sortType: '-', name: 'Новее' },
    { id: 3, sortOption: 'created_at', sortType: '', name: 'Старее' },
    { id: 4, sortOption: 'percent', sortType: '-', name: 'Больший %' },
    { id: 5, sortOption: 'percent', sortType: '', name: 'Меньший %' },
    { id: 6, sortOption: 'amount', sortType: '-', name: 'Самая дорогая цель' },
    { id: 7, sortOption: 'amount', sortType: '', name: 'Самая дешевая цель' },
  ];

  const [isSortOpened, setIsSortOpened] = useState(false);
  const toggleSortOpen = () => setIsSortOpened(!isSortOpened);
  const handleSortClose = () => setIsSortOpened(false);
  const handleSortChange = (id) => {
    setSortValue(sortOptions.find((el) => el.id === id));
    setIsSortOpened(false);
  };
  useEffect(() => {
    dispatch(getAims(sortValue));
  }, [dispatch, sortValue]);
  return (
    <Popover
      isOpened={isSortOpened}
      handleClose={handleSortClose}
      content={
        <Select selectType={'sort'} value={sortValue.id} selectOptions={sortOptions} onChange={handleSortChange} />
      }
    >
      <Button onClick={toggleSortOpen} width={'content-fit'} height={'32px'} bgColor={'back'}>
        <Text lineHeight="150%" weight={400} size={'s'} color={'brand'}>
          {sortValue?.name || 'Сортировать по'}
        </Text>
        <div style={{ marginLeft: '5px', transform: isSortOpened ? 'rotate(180deg)' : 'rotate(0)' }}>
          <Arrow />
        </div>
      </Button>
    </Popover>
  );
};

export default AimsSortButton;
