import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contract, contractWithSigner } from "./ethersConfig";

function Data() {
  const [books, setBooks] = useState(null);
  const [bookName, setBookName] = useState("");
  const [copies, setCopies] = useState("");
  const [borrowBookId, setBorrowBookId] = useState("");
  const [returnBookId, setReturnBookId] = useState("");
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBook = async () => {
    const books = await contract.getAvailableBooks();
    console.log(books);
    setBooks(books);
  };
  useEffect(() => {
    fetchBook();
  }, []);

  const connectWallet = async () => {
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log("Connected account:", account);
      setConnectedAccount(account);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const addBook = async (title, copies) => {
    setIsLoading(true);
    try {
      console.log(`Adding book: ${title} copies ${copies}`);
      const tx = await contractWithSigner.addBook(title, copies);
      await tx.wait();
      console.log("Book added successfully");
      // Refresh the list of books after adding a new one
      fetchBook();
    } catch (error) {
      console.error("Failed to add book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const borrowBook = async (borrowBookId) => {
    setIsLoading(true);
    try {
      console.log(`Borrowing Book: ${borrowBookId}`);
      const tx = await contractWithSigner.borrowBook(borrowBookId);
      await tx.wait();
      console.log("Book borrowed successfully");
      fetchBook();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const returnBook = async (returnBookId) => {
    setIsLoading(true);
    try {
      console.log("Returning Book");
      const tx = await contractWithSigner.returnBook(returnBookId);
      await tx.wait();
      console.log("Book returned successfully");
      fetchBook();
    } catch (error) {
      console.error("Failed to return book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = () => {
    addBook(bookName, parseInt(copies));
  };

  const handleBorrowBook = () => {
    borrowBook(borrowBookId);
  };

  const handleReturnBook = () => {
    returnBook(returnBookId);
  };

  return (
    <>
      <h1>Data</h1>

      {connectedAccount ? (
        <p>Connected account: {connectedAccount}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      {books &&
        books.map((book, index) => (
          <div key={index}>
            Book ID: {ethers.utils.formatUnits(book.id, 0)}
            Book name: {book.title}
          </div>
        ))}
        {isLoading && <div className="spinner"></div>}
      <hr />

      <input
        type="text"
        placeholder="Book Name"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of copies"
        value={copies}
        onChange={(e) => setCopies(e.target.value)}
      />

      <button onClick={handleAddBook}>Add Book</button>

      <input
        type="text"
        placeholder="Book ID to Borrow"
        value={borrowBookId}
        onChange={(e) => setBorrowBookId(e.target.value)}
      />

      <button onClick={handleBorrowBook}>Borrow Book</button>

      <input
        type="text"
        placeholder="Book ID to return"
        value={returnBookId}
        onChange={(e) => setReturnBookId(e.target.value)}
      />

      <button onClick={handleReturnBook}>Return Book</button>
    </>
  );
}

export default Data;
