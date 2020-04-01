import React from 'react';
import styles from './Body.scss';

interface BodyProps {
  jsonSheet: any[];
}

const Body = ({ jsonSheet }: BodyProps) => {
  return (
    <div className={styles['body-container']}>
      {jsonSheet
        ? jsonSheet.map(item => {
            const row = Object.values(item).map(value => {
              return <span key={`${value}`}>{value}</span>;
            });
            row.push(<br />);
            return row;
          })
        : null}
    </div>
  );
};

export default Body;
