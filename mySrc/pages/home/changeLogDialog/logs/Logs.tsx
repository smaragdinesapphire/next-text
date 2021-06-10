import React from 'react';
import Log from './log/Log';
import styled from 'styled-components';
import Skeleton from './skeleton/Skeleton';
import MyPagination from '../../../../components/common/pagination/Pagination';

const Logs = styled.div``;

const Pagination = styled(MyPagination)`
  margin-top: 8rem;
`;

const Content = styled.div`
  width: 440rem;
  height: 140rem;
  overflow: auto;
`;

export interface ChangeLogData {
  id: string;
  title: string;
  contentHtml: string;
}

interface Props {
  loading: boolean;
  changeLogDatas: Array<ChangeLogData>;
  totalLogs: number;
  page: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

const Component: React.FC<Props> = ({ disabled = false, loading, totalLogs, page, changeLogDatas, onPageChange }) => {
  return (
    <Logs>
      <Content>
        {loading ? (
          <Skeleton />
        ) : (
          changeLogDatas.map(({ id, title, contentHtml }) => (
            <Log key={id} title={title}>
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </Log>
          ))
        )}
      </Content>
      <Pagination disabled={disabled} page={page} total={totalLogs} onChange={onPageChange} />
    </Logs>
  );
};

export default Component;
