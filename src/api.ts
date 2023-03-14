import axios, {Axios, AxiosResponse, isAxiosError} from "axios";
import { Book } from "./models/Book";

// 全書籍情報取得
export async function getBooks(): Promise<Book[]> {
  try {
    const response: AxiosResponse = await axios.get("http://localhost:4000/books");
    return response.data;
  } catch (e: unknown) {
    if(isAxiosError(e)){
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error("データを取得できませんでした/詳細不明")
  }
}

export async function getBook(id: string): Promise<Book> {
  try {
    const response = await axios.get(`http://localhost:4000/books/${id}`);
    return response.data[0];
  } catch (e: unknown) {
    if(isAxiosError(e)){
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error("データを取得できませんでした/詳細不明")
  }
}

function toParams(book: Book): URLSearchParams {
  const params = new URLSearchParams();
  if(book.name.length > 0) {
    params.append('name', book.name);
  }
  if(book.author.length > 0){
    params.append('author', book.author)
  }
  if(book.published_date.length > 0){
    params.append('published_date', book.published_date)
  }
  if(book.description.length > 0){
    params.append('description', book.description)
  }
  return params;
}

export async function addBook(book: Book): Promise<number> {
  try {
    const params = toParams(book);
    const response = await axios.post("http://localhost:4000/books/add", params);
    return response.status;
  } catch (e: unknown) {
    if(isAxiosError(e)){
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error("データを登録できませんでした/詳細不明")
  }
}

export async function deleteBook(bookId: string): Promise<number> {
  try {
    const response = await axios.delete(`http://localhost:4000/books/del/${bookId}`);
    return response.status;
  } catch (e: unknown) {
    if(isAxiosError(e)){
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error("データを削除できませんでした/詳細不明")
  }
}

export async function updateBook(newBook: Book, oldBook: Book, bookId: string): Promise<number> {
  try {
    const params: URLSearchParams = createUpdateParams(newBook, oldBook);
    console.log(params.toString())
    const response = await axios.put(`http://localhost:4000/books/update/${bookId}`, params);
    return response.status;
  } catch (e: unknown) {
    if(isAxiosError(e)){
      throw new Error(`${e.code}: ${e.message}`);
    }
    throw new Error("データを更新できませんでした/詳細不明")
  }
}

function createUpdateParams(newBook: Book, oldBook: Book): URLSearchParams {
  const params = new URLSearchParams();
  if(newBook.name !== oldBook.name) {
    params.append('name', newBook.name);
  }
  if(newBook.author !== oldBook.author){
    params.append('author', newBook.author)
  }
  if(newBook.published_date !== oldBook.published_date && newBook.published_date !== "0000-00-00"){
    params.append('published_date', newBook.published_date)
  }
  if(newBook.description !== oldBook.description){
    params.append('description', newBook.description)
  }
  return params;
}
