import React, { useMemo, useCallback } from 'react';
import MuiPagination, { PaginationProps } from '@material-ui/lab/Pagination';
import styled from 'styled-components';

interface Props extends Omit<PaginationProps, 'onChange'> {
  className?: string;
  total?: number;
  pitem?: number;
  page?: number;
  defaultPage?: number;
  onChange: (page: number) => void;
}

const Pagination = styled(MuiPagination)`
  display: flex;
  justify-content: center;
  .MuiPaginationItem-root {
    font-size: 16rem;
    height: 32rem;
    margin: 0 3rem;
    padding: 0 6rem;
    border-radius: 16rem;
    min-width: 32rem;
    color: #666;
  }
  .MuiPaginationItem-page:hover {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.2);
  }
  .Mui-selected {
    color: white;
  }
  .MuiPaginationItem-icon {
    color: red;
    font-size: 16rem;
  }
`;

const Component: React.FC<Props> = ({
  className,
  total = 0,
  pitem = 10,
  page = 1,
  defaultPage = 1,
  onChange,
  ...rest
}) => {
  const count = useMemo(() => Math.ceil(total / pitem), [total, pitem]);
  const handleChange = useCallback((e, newPage) => onChange(newPage), [onChange]);

  return count <= 1 ? null : (
    <Pagination
      {...rest}
      className={className}
      count={count}
      page={page}
      onChange={handleChange}
      defaultPage={defaultPage}
    />
  );
};

export default Component;
