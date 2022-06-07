import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';



function PaginatedItems({ itemsPerPage }) {

  
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemNumber, setItemNumber] = useState(0);

    useEffect(() => {
        const fetchBooks= async () => {
            const response = await fetch('https://gnikdroy.pythonanywhere.com/api/book/');
            const data = await response.json();
            setItemNumber(data.count);
          
        }
        fetchBooks();
    },[itemNumber]);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  
  const items = [...Array(itemNumber).keys()];

  function Items({ currentItems }) {
    return (
      <div className="items">
      {currentItems && currentItems.map((item) => (
        <div>
          <h3>Item #{item}</h3>
        </div>
      ))}
        </div>
    );
  }
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems}  />
      {console.log(itemNumber)}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

// Add a <div id="container"> to your HTML to see the componend rendered.
ReactDOM.render(
  <PaginatedItems itemsPerPage={2} />,
  document.getElementById("root")
);