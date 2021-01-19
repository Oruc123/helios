import React from 'react';
import AntdPagination, {PaginationProps as AntdPaginationProps} from 'antd/es/pagination';

export type PaginationPropss = AntdPaginationProps

export const Pagination = (props: PaginationPropss) => (
  <AntdPagination {...props} />
);
