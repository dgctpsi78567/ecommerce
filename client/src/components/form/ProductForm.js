import React from 'react'
import {Select} from "antd"

const ProductForm = ({ 
    handleSubmit,
    handleChange,
    setValue,
    values, 
    handleClickChange,
    subsOption,
    showSubs,
}) => {

    const { title, description, price, categories,  sub,  quantity,  colors, brands } = values;

    return (
        <React.Fragment>
            <h2>Category Product Page</h2>

            <div className='form-group'>
                <label className="mt-3">Title </label>
                <input type="text" name="title" className='form-control' value={title} onChange={handleChange} />

                <label className="mt-3">Description </label>
                <input type="text" name="description" className='form-control' value={description} onChange={handleChange} />

                <label className="mt-3">Price </label>
                <input type="number" name="price" className='form-control' value={price} onChange={handleChange} />

                <div className="form-group">
                    <label className="mt-3">Shipping</label>
                    <select name="shipping" className="form-control" onChange={handleChange}>
                        <option>Please Select Color</option>
                        <option value="Yes">Yes </option>
                        <option value="No">No </option>
                    </select>
                </div>

                <label className="mt-3">Quantity </label>
                <input type="number" name="quantity" className='form-control' value={quantity} onChange={handleChange} />

                <div className="form-group">
                    <label className="mt-3">Color</label>
                    <select name="color" className="form-control" onChange={handleChange}>
                        <option>Please Select Color</option>
                        {colors.map((c) => {
                            return <option key={c} value={c}> {c} </option>
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label className="mt-3">Brand</label>
                    <select name="brand" className="form-control" onChange={handleChange}>
                        <option>Please Select Brand</option>
                        {brands.map((b) => {
                            return <option key={b} value={b}>{b} </option>
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label className="mt-3">Category</label>
                    <select name="category" className="form-control" onChange={handleClickChange}>
                        <option>Please Select Category</option>
                        {categories.length > 0 && categories.map((c) => {
                            return <option key={c._id} value={c._id}>{c.name} </option>
                        })}
                    </select>
                </div>
             {
                showSubs && (
                <div className="mb-5">
                    <Select  mode="multiple" placeholder="Please Select SubCategory" value={sub} onChange={(val)=>setValue({...values, sub:val})}>
                       {
                        subsOption.length > 0 && subsOption.map((s)=>{
                            return <option key={s._id} value={s._id}>{s.name}</option>
                        })
                       }
                    </Select>
                </div>
                )
             }
                <button className='btn btn-outline-primary mt-5' onClick={handleSubmit}>Save</button>
            </div>
        </React.Fragment>
    )
}

export default ProductForm