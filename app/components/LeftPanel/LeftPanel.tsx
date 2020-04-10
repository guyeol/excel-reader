import React, { useState } from 'react';
import styles from './LeftPanel.scss';

interface LeftPanelProps {
  onSelectFile: (f: File[]) => void;
  onSearch: (value: string) => void;
}

function LeftPanel({ onSearch, onSelectFile }: LeftPanelProps) {
  const [searchValue, setSearchValue] = useState('');
  const [fileNames, setFileNames] = useState<string[]>(['']);

  const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClickSubmit = () => {
    if (searchValue.length > 0) {
      onSearch(searchValue);
    }
  };

  const getFiles = e => {
    const files = Array.from<File>(e.target.files)
      .filter(f => {
        return ['xls', 'xlsx'].indexOf(getFileExtension(f.name)) > -1;
      });

    const fileNames = files.map(f => f.name);
    setFileNames(fileNames);
    onSelectFile(files);
  };

  const getFileExtension = (filename: string) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  return (
    <div className={styles['left-panel']}>
      <div className={styles['add-file']}>
        <input
          type="file"
          onChange={getFiles}
          multiple
          webkitdirectory=""
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
