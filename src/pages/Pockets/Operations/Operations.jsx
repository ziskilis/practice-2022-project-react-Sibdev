import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import downloadFile from 'src/api/requests/downloadFile';
import uploadFile from 'src/api/requests/uploadFile';
import { Arrow, ExportIcon, ImportIcon } from 'src/assets/icons';
import { Button, Text } from 'src/components';
import { PATHNAMES } from 'src/consts';
import { getTransactions } from 'src/store/slices/transactionsSlice';

import Table from '../Table';
import AddNewOrUpdateTransactionModal from '../TableModals/AddNewOrUpdateTransactionModal';

import styles from './Operations.module.scss';

const Operations = ({ dashboard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileInputRef = useRef('1');
  const [isEditOpened, setIsEditOpened] = useState(false);
  const handleEditClose = () => setIsEditOpened(false);
  const handleEdit = () => {
    setIsEditOpened(true);
  };

  const fileUploadHandler = (e) => {
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append('file_uploaded', file);
    uploadFile(formData);
  };

  const navigateHandler = () => {
    navigate(PATHNAMES.pockets);
  };

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.blockTitleWrapper}>
          <Text color={'white'} size={'l'} weight={700}>
            Операции
          </Text>
          {dashboard && (
            <Button
              onClick={navigateHandler}
              childrenRotation={270}
              width={32}
              height={32}
              radius={1000}
              bgColor={'back'}
            >
              <Arrow />
            </Button>
          )}
        </div>

        {!dashboard && (
          <div className={styles.buttonGroupWrapper}>
            <input type="file" onChange={fileUploadHandler} ref={fileInputRef} className={styles.fileInput} />
            <Button onClick={() => fileInputRef.current.click()} width={101} height={32} bgColor={'back'}>
              <ImportIcon style={{ marginRight: '5px' }} />
              <Text color={'brand'}>Импорт</Text>
            </Button>
            <Button onClick={downloadFile} width={101} height={32} bgColor={'back'}>
              <ExportIcon style={{ marginRight: '5px' }} />
              <Text color={'brand'}>Экспорт</Text>
            </Button>
          </div>
        )}
      </div>
      <Table />
      <AddNewOrUpdateTransactionModal isOpened={isEditOpened} handleClose={handleEditClose} />
      <div className={styles.buttonWrapper}>
        <Button bgColor={'brand'} width={56} height={56} onClick={handleEdit}>
          <Text color={'white'} size={'xxl'}>
            +
          </Text>
        </Button>
        <div className={styles.buttonShadow}></div>
      </div>
    </div>
  );
};

export default Operations;
