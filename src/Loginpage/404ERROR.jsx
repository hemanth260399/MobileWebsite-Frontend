import { Link } from "react-router-dom"

export let NotFound = () => {
    return (
        <>
            <div className="notfound-container" >
                <div className="notfound-content text-center" >
                    <h1 className="display-1 notfound-title" style={{ fontWeight: "bolder" }}>404</h1>
                    <p className="lead notfound-message" style={{ fontWeight: "bolder" }}>Sorry, the page youre looking for cannot be found.</p>
                    <Link to="/" className="btn btn-primary notfound-btn">
                        Go Back to Home
                    </Link>
                </div>
            </div>
        </>
    )
}