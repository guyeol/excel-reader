import React, { useState } from 'react';
import styles from './LeftPanel.scss';

interface LeftPanelProps {
  onSelectFile: (f: FileList) => void;
  onSearch: (value: string) => void;
}

function LeftPanel({ onSearch, onSelectFile }: LeftPanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [fileNames, setFileNames] = useState<string[]>(['']);

  const onChangeInput = e => {
    setSearchValue(e.target.value);
  };

  const onClickSubmit = () => {
    if (searchValue.length > 0) {
      onSearch(searchValue);
    }
  };

  const getFiles = e => {
    const newFiles = Array.from<File>(e.target.files).map(f => f.name);
    setFileNames(newFiles);
    onSelectFile(e.target.files);
  };

  return (
    <div className={styles['left-panel']}>
      <div className={styles['add-file']}>
        <input
          type="file"
          onChange={getFiles}
          multiple
          className={styles['input-file']}
          accept=".xls, .xlsx"
        />
        {fileNames.length > 0
          ? fileNames.map(f => {
              return (
                <span className={styles['file-name']} key={f}>
                  {f}
                </span>
              );
            })
          : null}
      </div>
      <div className={styles.search}>
        <div className={styles['input-wrapper']}>
          <input
            className={styles.input}
            type="text"
            placeholder="검색해보세요"
            value={searchValue}
            onChange={onChangeInput}
          />
        </div>
        <button
          type="button"
          className={styles['search-btn']}
          onClick={onClickSubmit}
        >
          검색
        </button>
      </div>
    </div>
  );
}

export default LeftPanel;
