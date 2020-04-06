import React from 'react';
import styles from './Body.scss';

interface BodyProps {
  jsonSheet: any[];
}

const Body = ({ jsonSheet }: BodyProps) => {
  return (
    <div className={styles['body-container']}>
      {jsonSheet ? (
        <table className={styles['excel-table']}>
          <thead className={styles.header}>
            <tr>
              {Object.keys(jsonSheet[0]).map(key => {
                return (
                  <td key={`${key}`} className={styles.cell}>
                    {key}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {jsonSheet.map(item => {
              return (
                <tr key={`${item}`}>
                  {Object.values(item).map(value => {
                    return (
                      <td className={styles.cell} key={`${value}`}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Body;
