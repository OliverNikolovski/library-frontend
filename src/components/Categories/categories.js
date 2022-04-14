const Categories = ({ categories }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover caption-top mt-3">
                <caption>List of categories</caption>
                <thead>
                    <tr>
                        <th scope="col">Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td>{category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Categories;