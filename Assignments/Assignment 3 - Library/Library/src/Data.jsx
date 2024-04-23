import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contract, contractWithSigner } from "./ethersConfig";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Card, CardContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

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
      {connectedAccount ? (
        <p>Connected account: {connectedAccount}</p>
      ) : (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}

      {books &&
        books.map((book, index) => (
          <Card key={index} sx={{ margin: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Book ID: {ethers.utils.formatUnits(book.id, 0)}
              </Typography>
              <Typography variant="body2">Book name: {book.title}</Typography>
            </CardContent>
          </Card>
        ))}
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="10vh"
        >
          <CircularProgress />
        </Box>
      )}
      <hr />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Book Name"
          variant="outlined"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Number of copies"
          variant="outlined"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
        />
      </Box>
      <br />
      <Button variant="contained" onClick={handleAddBook}>
        Add Book
      </Button>
      <hr />
      <br />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Book ID to Borrow"
          variant="outlined"
          value={borrowBookId}
          onChange={(e) => setBorrowBookId(e.target.value)}
        />
      </Box>
      <br />
      <Button variant="contained" onClick={handleBorrowBook}>
        Borrow Book
      </Button>

      <hr />
      <br />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="outlined-basic"
          label="Book ID to return"
          variant="outlined"
          value={returnBookId}
          onChange={(e) => setReturnBookId(e.target.value)}
        />
      </Box>
      <br />
      <Button variant="contained" onClick={handleReturnBook}>
        Return Book
      </Button>
    </>
  );
}

export default Data;
