import React from 'react'
import { Link } from 'react-router-dom'

const Students = () => {
    return (
        <>
            <div className="container text-center my-5">

                <h3>Please select the Class for which you want to view Students detail.</h3>

            </div>
            <div>
                <Link to={`/nursary`}>
                    <button type="button" class="btn btn-outline-primary">Nursary</button>
                </Link>

                <Link to={`/lkg`}>
                    <button type="button" class="btn btn-outline-primary">L.K.G.</button>
                </Link>

                <Link to={`/ukg`}>
                    <button type="button" class="btn btn-outline-primary">U.K.G.</button>
                </Link>

                <Link to={`/class-1`}>
                    <button type="button" class="btn btn-outline-primary">Class 1 </button>
                </Link>

                <Link to={`/class-2`}>
                    <button type="button" class="btn btn-outline-primary">Class 2</button>
                </Link>

                <Link to={`/class-3`}>
                    <button type="button" class="btn btn-outline-primary">Class 3</button>
                </Link>

                <Link to={`/class-4`}>
                    <button type="button" class="btn btn-outline-primary">Class 4</button>
                </Link>

                <Link to={`/class-5`}>
                    <button type="button" class="btn btn-outline-primary">Class 5</button>
                </Link>
            </div>

            <div className='my-5'>

                <Link to={`/class-6`}>
                    <button type="button" class="btn btn-outline-primary">Class 6 </button>
                </Link>

                <Link to={`/class-7`}>
                    <button type="button" class="btn btn-outline-primary">Class 7</button>
                </Link>

                <Link to={`/class-8`}>
                    <button type="button" class="btn btn-outline-primary">Class 8</button>
                </Link>

                <Link to={`/class-9`}>
                    <button type="button" class="btn btn-outline-primary">Class 9</button>
                </Link>

                <Link to={`/class-10`}>
                    <button type="button" class="btn btn-outline-primary">Class 10</button>
                </Link>
            </div>

            <div className='my-5'>

                <Link to={`/class-11`}>
                    <button type="button" class="btn btn-outline-primary">Class 11 </button>
                </Link>

                <Link to={`/class-12`}>
                    <button type="button" class="btn btn-outline-primary">Class 12</button>
                </Link>

            </div>

        </>
    )
}

export default Students