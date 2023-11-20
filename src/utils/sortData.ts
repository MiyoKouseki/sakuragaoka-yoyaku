// sortData.ts
function sortData<T extends { [key: string]: any }>(
    data: T[],
    { key, direction }: { key: keyof T; direction: 'asc' | 'desc' }
  ): T[] {
    return [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  
  export default sortData;
  