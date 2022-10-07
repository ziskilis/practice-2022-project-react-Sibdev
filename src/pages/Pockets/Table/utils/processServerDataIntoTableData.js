import { Text } from 'src/components';
import { formatSum } from 'src/utils/common';

import OperationsButton from '../OperationsButton/OperationsButton';

const processServerDataIntoTableData = (serverData) => {
  return serverData.map((item) => {
    return {
      date: (
        <Text weight={400} color={'white'}>
          {item.transaction_date.split('-').reverse().join('.')}
        </Text>
      ),
      category: (
        <Text weight={400} color={'white'}>
          {item.category?.name || 'Доход'}
        </Text>
      ),
      amount: (
        <>
          <Text weight={400} color={'white'}>
            {formatSum(item.amount)}
          </Text>
          <OperationsButton key={item.id} item={item} />
        </>
      ),
    };
  });
};

export default processServerDataIntoTableData;
