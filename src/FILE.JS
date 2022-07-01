import React from 'react';

const USERS_URL = 'https://example.com/api/users';

export default function Table () {

  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [limit, setLimit] = React.useState(0)

  const fetchData = async() => {
    setLoading(true)
    const response = await fetch(`${USERS_URL}?page=${page}`)
    const result = await response.json()
    setCount(result.count)
    setData(result.results)
    setLoading(false)

     let pageNo = parseInt(count / 10);
    let pgNext  = count % 10; 
    console.log({ pgNext, pageNo})
    if(count <= 10) {
      setLimit(1)
    } else {
    if(pgNext > 0) {  
      console.log({pageNo})
      setLimit(pageNo+1)
    } else {
      setLimit(pageNo)
    }
    

    console.log({limit, page, })
  
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
  }

  const handlePrev = () => {
    setPage(prev => prev - 1)
  }

  const handleFirst = () => {
    setPage(0)
  }

  const handleLast = () => {
    setPage(count%10)
  }

  const isDisabled = () => {
    let pageNo = count / 10;
    let pgNext  = count % 10; 

    if(pgNext > 0) {
      setLimit(pageNo+1)
    } else {
      setLimit(pageNo)
    }

  }

  

  React.useEffect(() => {
    fetchData()
    // isDisabled()
  }, [page])



  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(val => (<tr>
          <td>{val.id}</td>
          <td>{val.firstName}</td>
          <td>{val.lastName}</td>
          </tr>))}
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn" onClick={handleFirst} disabled={page === 0 || limit === 1 }>first</button>
        <button className="previous-page-btn" onClick={handlePrev} disabled={page === 0 || limit === 1  }>previous</button>
        <button className="next-page-btn" onClick={handleNext} disabled={page === limit} >next</button>
        <button className="last-page-btn" onClick={handleLast}  disabled={page === limit}>last</button>
      </section>
    </div>
  );
};
