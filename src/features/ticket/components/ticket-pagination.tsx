'use client';

import { useEffect, useRef } from 'react';

import { useQueryState, useQueryStates } from 'nuqs';

import { Pagination } from '@/components/pagination/pagination';
import { PaginatedData } from '@/components/pagination/types';

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from '../search-params';
import { TicketWithMetadata } from '../types';

type TicketPaginationProps = {
  paginatedTicketsMetadata: PaginatedData<TicketWithMetadata>['metadata'];
};
export const TicketPagination = ({
  paginatedTicketsMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState('search', searchParser);

  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;

    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketsMetadata}
    />
  );
};
