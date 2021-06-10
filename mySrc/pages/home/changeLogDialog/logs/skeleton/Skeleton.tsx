import React from 'react';
import { Skeleton as MuiSkeleton } from '@material-ui/lab';
import Log from '../log/Log';

const Skeleton: React.FC = () => {
  return (
    <Log title={<MuiSkeleton variant="text" height="20rem" />}>
      <MuiSkeleton variant="rect" component="div" height="80rem" />
    </Log>
  );
};

export default Skeleton;
