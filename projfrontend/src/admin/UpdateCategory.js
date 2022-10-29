import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategory } from './helper/adminapicall';

const UpdateCategory = () => {
  const { categoryId } = useParams();
  let navigate = useNavigate();

  // call useEffect for fetch the product first
  useEffect(() => {
      preload(categoryId);
      // eslint-disable-next-line
  }, [])
  
  const [values, setValues] = useState([]);

  // preload the get category
  const preload = async ( categoryId ) => {
      const response = await getCategory(categoryId);
      if(response.status === 200){ 
          setValues({ 
            categories: response.response,
          });
      } else {
          setValues({ 
              ...values, 
              error: response.message
          });
      }
  }

  return (
    <div>UpdateCategory</div>
  )
}


export default UpdateCategory;