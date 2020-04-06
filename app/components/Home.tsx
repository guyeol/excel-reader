import React, { useState } from 'react';
import XLSX from 'xlsx';
import './Home.scss';
import LeftPanel from './LeftPanel';
import Body from './Body';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState();
  const [jsonFiles, setJsonFiles] = useState();

  const mergeArrays = (arrays: any[]) => {
    const mergedArray = arrays.flat(1);
    return mergedArray;
  };

  const fileToJSON = (files: FileList) => {
    const jsons: {}[] = [];
    let finished = false;

    for (let i = 0; i < files.length; i += 1) {
      const f = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        workbook.SheetNames.forEach(sheetName => {
          jsons.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));
        });

        finished = true;
      };
      reader.readAsBinaryString(f);
    }

    const timer = setInterval(() => {
      if (finished) {
        setJsonFiles(jsons);
        setResult(mergeArrays(jsons));
        clearInterval(timer);
      }
    }, 100);
  };

  const onSearch = (searchValue: string) => {
    setQuery(searchValue);

    if ((jsonFiles || []).length === 0) return;

    const newJsons: any[] = [];

    jsonFiles.forEach((file: any) => {
      const newJsonSheet = file.filter((item: any) => {
        for (const value of Object.values(item)) {
          if (`${value}`.includes(searchValue)) {
            return true;
          }
        }
        return false;
      });

      newJsons.push(newJsonSheet);
    });

    setResult(mergeArrays(newJsons));
  };

  return (
    <div className="home-container" data-tid="container">
      <LeftPanel onSelectFile={fileToJSON} onSearch={onSearch} />
      <Body jsonSheet={result} />
    </div>
  );
}
