import React from 'react'

const FormItem = ({item, id, deleteForm}) => {

    return (
        <div className="form">
            <div className="form-wrap">
                <div className="input-field filed-value">
                    <input className="validate" value={item.type} name=""type="text" disabled/>
                </div>
                <div className="input-field filed-value">
                    <input className="validate" value={item.value} name=""type="text" disabled/>
                </div>
                <div className="btn-wrap">
                    <button  className="btn waves-effect waves-light green">
                        <i className="fas fa-plus"></i>
                    </button>
                    <button className="btn waves-effect waves-light red " onClick={() => deleteForm(id)}>
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormItem
