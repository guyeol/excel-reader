import React, { useState } from 'react';
import XLSX from 'xlsx';
import './Home.scss';
import LeftPanel from './LeftPanel';
import Body from './Body';

export default function Home() {
  const [query, setQuery] = useState('');
  const [jsonSheet, setJsonSheet] = useState();

  const fileToJSON = (files: FileList) => {
    for (let i = 0; i < files.length; i += 1) {
      const f = files[i];
      const reader = new FileReader();
      let json: any[];
      let html: string;

      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        workbook.SheetNames.forEach(item => {
          json = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
        });
        setJsonSheet(json);
      };
      reader.readAsBinaryString(f);
    }
  };

  const onSearch = (searchValue: string) => {
    setQuery(searchValue);
    if ((jsonSheet || []).length > 0) {
      const newJsonSheet = jsonSheet.filter(item => {
        for (const value of Object.values(item)) {
          if (value === searchValue) {
            return true;
          }
        }
        return false;
      });
      setJsonSheet(newJsonSheet);
    }
  };

  return (
    <div className="home-container" data-tid="container">
      <LeftPanel onSelectFile={fileToJSON} onSearch={onSearch} />
      <Body jsonSheet={jsonSheet} />
    </div>
  );
}
