// 取得する値を格納するための型エイリアス
export type Book = {
  id: string;
  name: string;
  author: string;
  published_date: string;
  description: string;
}

export function toOnlyDate(dateString: string): string {
  // 2016-02-03T15:00:00.000Z
  return dateString.substring(0, 10)
}