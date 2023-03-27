import React from 'react'
import {Select} from "antd"

const UpdateProductForm = ({ 
    handleSubmit,
    handleChange,
    values, 
    categories,
    handleClickChange,
    arrayOfSub,
    setArrayOfSubs,
    subOptions,
    selectedCategory

}) => {

    const { title, description, price, category, shipping, quantity, colors, brands, color, brand } = values;

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
                    <select value={shipping==="Yes"?"Yes":"No"}  name="shipping" className="form-control" onChange={handleChange}>
                        
                        <option value="Yes">Yes </option>
                        <option value="No">No </option>
                    </select>
                </div>

                <label className="mt-3">Quantity </label>
                <input type="number" name="quantity" className='form-control' value={quantity} onChange={handleChange} />

                <div className="form-group">
                    <label className="mt-3">Color</label>
                    <select value={color} name="color" className="form-control" onChange={handleChange}>
                        {colors.map((c) => {
                            return <option key={c} value={c}> {c} </option>
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label className="mt-3">Brand</label>
                    <select value={brand} name="brand" className="form-control" onChange={handleChange}>
                        {brands.map((b) => {
                            return <option key={b} value={b}>{b} </option>
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label className="mt-3">Category</label>
                    <select name="category" value={selectedCategory?selectedCategory:category._id} className="form-control" onChange={handleClickChange}>
                        
                        {categories.length > 0 && categories.map((c) => {
                            return <option key={c._id} value={c._id}>{c.name} </option>
                        })}
                    </select>
                </div>

                <div className="mb-5">
                    <Select  mode="multiple" value={arrayOfSub} placeholder="Please Select SubCategory" onChange={(value)=>setArrayOfSubs(value)}>
                       { 
                        subOptions.length > 0 && subOptions.map((s)=>{
                            return <option key={s._id} value={s._id}>{s.name}</option>
                        })
                       }
                    </Select>
                </div>

                <button className='btn btn-outline-primary mt-5' onClick={handleSubmit}>Save</button>
            </div>
        </React.Fragment>
    )
}

export default UpdateProductForm