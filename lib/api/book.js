// lib/api/Book.ts
import apiClient from "../axios"

export const getBooks = () => apiClient.get("/books")
export const getBook = (id) => apiClient.get(`/books/${id}`)
export const createBook = (book) => apiClient.post("/books", book)
export const updateBook = (id, book) => apiClient.put(`/books/${id}`, book)
export const deleteBook = (id) => apiClient.delete(`/books/${id}`)
