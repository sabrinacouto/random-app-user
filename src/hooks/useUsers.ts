import { useState, useCallback } from 'react';
import { fetchUsers } from '../services/api';
import { User } from '../types';

interface UseUsersParams {
  gender?: string;
  nat?: string;
}

export function useUsers({ gender = '', nat = '' }: UseUsersParams) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(async (pageNum: number, isRefresh = false) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUsers({ page: pageNum, results: 20, gender, nat });
      const newUsers: User[] = data.results;

      if (isRefresh || pageNum === 1) {
        setUsers(newUsers);
      } else {
        setUsers(prev => [...prev, ...newUsers]);
      }

      setHasMore(newUsers.length === 20);
      setPage(pageNum);
    } catch {
      setError('Erro ao carregar usuários. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [gender, nat, loading]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    load(1, true);
  }, [load]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) load(page + 1);
  }, [loading, hasMore, page, load]);

 const reset = useCallback(() => {
  setUsers([]);
  setPage(1);
  setHasMore(true);
  setError(null);
  load(1, true);
}, [load]);

  return {
    users,
    loading,
    refreshing,
    error,
    hasMore,
    refresh,
    loadMore,
    reset,
  };
}