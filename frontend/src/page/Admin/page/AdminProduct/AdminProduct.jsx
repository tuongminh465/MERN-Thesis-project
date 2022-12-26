import React, { useEffect } from 'react'
// import { productRows } from "../../mockData"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProducts } from '../../../../redux/apiCalls';

import './AdminProduct.css'
import AddIcon from '@mui/icons-material/Add';

function AdminProduct() {
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProduct.products)

  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.8 },
    { field: 'img', headerName: 'Image', flex: 0.8, renderCell: (params) => {
      return (
        <img src={params.row.img} alt=""/>
      )
    }},
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 0.4 },
    { field: 'type', headerName: 'Type', flex: 0.4 },
    { field: 'info', headerName: 'Information', flex: 1, renderCell: (params) => {
      return (
        <div className="info-ctn">
          <ul>
            {params.row.info.map(item => {
              return (
                <li>{item}</li>
              )
            })}
          </ul>
        </div>
      )
    }},
    { field: 'price', headerName: 'Price', flex: 0.3, renderCell: (params) => {
      return (
        <p>${params.row.price}</p>
      )
    }},
    { field: 'releaseYear', headerName: 'Release Year', flex: 0.25 },
    { field: 'action', headerName: 'Actions', flex: 0.5, renderCell: (params) => {
      return (
        <div className='action'>
          <Link to={`/admin/products/${params.row.id}`}>
            <button className='edit'>Edit</button>
          </Link>
          <button onClick={() => deleteProducts(params.row._id, dispatch)} className='delete'>Delete</button>
        </div>
      )
    }},
  ];

  return (
    <div className="admin-products">
        <div className="title-ctn">
          <h2>Products list</h2>
          <Link style={{textDecoration: 'none'}} to={`/admin/products/newProduct`}>
            <button>
              <AddIcon />
              Add new product
            </button>
          </Link>
        </div>
        <div style={{ height: '85vh', width: '100%' }}>
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={10}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[10]}
              checkboxSelection
              getRowHeight={() => 'auto'}
            />
        </div>
    </div>
  )
}

export default AdminProduct