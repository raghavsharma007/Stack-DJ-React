import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const FormComponent = () => {

    const [search, setSearch] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(4);



    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost:8000`, {search})
        .then(res => {
            setLoading(false);
            setError(false);
            setData(res.data.data);
            // console.log(data);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            setError(true);
        })
    }

    //getting current data
    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = data.slice(indexOfFirstData, indexOfLastData)

    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mt-2">
            <div className="flex w-2/3 border-2 m-auto">
                <form onSubmit={handleSubmit} className="w-2/3 m-auto mb-2 w-2/5">
                    <input type="text" value={search} onChange={handleChange} placeholder="search keywords..|answers:4|score:3|isaccepted:yes" className="p-2 border border-blue-500 my-2 w-11/12" required />
                    { !loading &&  <button type="submit" className="flex p-2 uppercase rounded-lg bg-blue-400">Get Questions</button>}
                    { loading &&  <p>Loading...</p>}
                </form>
                <p className="w-3/5">
                    <li>Search by key words: 'key word..'(example: Javascript, Typescript)</li>
                    <li>Search by answers: 'answers:4'(for answers >= 4)</li>
                    <li>Search by accepted: 'isaccepted:yes'</li>
                    <li>Search by score: 'score:3'(for answers >= 3)</li>
                </p>
            </div>
            <div className="w-4/5 m-auto">
                { error ? (
                    <div className="uppercase text-lg font-semibold">Too Many requests(429)!!</div>
                ) : (
                    currentData.map((x) => (
                        <ul className="border-2 border-blue-300 rounded-md p-2 bg-blue-100 text-sm">
                            <li className="font-semibold">{x.question}</li> 
                            <li>Vote Count: {x.vote_count}</li> 
                            <li>{x.views}</li> 
                            <li>Tags: {x.tags}</li>
                        </ul>
                    ))
                )
                }
                <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
            </div>
        </div>
    );
}

export default FormComponent;