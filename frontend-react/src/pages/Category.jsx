import { useParams } from "react-router-dom";

function Category() {
  const { name } = useParams();

  return <h1>{name.toUpperCase()} Collection</h1>;
}

export default Category;