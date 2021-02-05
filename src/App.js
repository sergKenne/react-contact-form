import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import FormInput from './component/FormInput';
import FormItem from './component/FormItem';
import Storage from './Storage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: [],
            newFormValues: {},
            arrayToObject: [],
            showArray: false,
            showObject: false,
        };
    }

    addForm = (item) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                formValues: [...prevState.formValues, item],
            }),
            () => Storage.setFormStorage(this.state.formValues),
        );
    };

    deleteForm = (id) => {
        this.setState(
            (prevState) => {
                return {
                    ...prevState,
                    formValues: prevState.formValues.filter((item) => item.id !== id),
                };
            },
            () => Storage.setFormStorage(this.state.formValues),
        );
    };

    getFormValues = (obj) => {
        let arrType = [];
        let arrValue = [];
        const cloneObj = JSON.parse(JSON.stringify(obj));

        if (cloneObj.length) {
            cloneObj
                .map((el) => {
                    return {
                        type: el.type,
                        value: el.value,
                    };
                })
                .forEach((item) => {
                    arrType.push(item.type);
                    arrValue.push(item.value);
                });

            const newFormValues = {
                type: arrType,
                value: arrValue,
            };
            Storage.setNewForm(newFormValues);
            console.log('newFormValues:', newFormValues);
            this.setState({ newFormValues: Storage.getNewForm() });
            return newFormValues;
        } else {
            Storage.setNewForm({});
            this.setState({ newFormValues: Storage.getNewForm() });
            return;
        }
    };

    convertArrayToObject = (newFormValues) => {
        const itemTypes = Object.keys(newFormValues);
        const itemValues = Object.values(newFormValues);

        if (itemTypes.length) {
            const arrayToObject = itemValues[0].map((el, ind) => {
                return {
                    [`${itemTypes[0]}`]: el,
                    [`${itemTypes[1]}`]: itemValues[1][ind],
                };
            });

            console.log('arrayToObject:', arrayToObject);
            this.setState({ arrayToObject });
            return arrayToObject;
        } else {
            this.setState({ arrayToObject: [] });
        }
    };

    componentDidMount() {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});

        !Storage.getFormStorage()
            ? Storage.setFormStorage([])
            : this.setState({ formValues: Storage.getFormStorage() });
    }

    render() {
        const { newFormValues, arrayToObject, formValues, showArray, showObject, loading } = this.state;
        return (
            <div className="app" >
                <h3 className="title">форма для заполнения контактов</h3>
                <div className="wrapper">
                    <div className="formList">
                        {this.state.formValues.map((item) => {
                            return (
                                <FormItem
                                    id={item.id}
                                    key={item.id}
                                    item={item}
                                    deleteForm={this.deleteForm}
                                />
                            );
                        })}
                    </div>
                    <FormInput addForm={this.addForm} />
                    <br />
                    <br />
                    <div className="code">
                        <button
                            className="waves-effect waves-light btn-large"
                            onClick={() => {
                                this.getFormValues(formValues);
                                this.setState((state) => ({
                                    ...state,
                                    showArray: !state.showArray,
                                }));
                            }}>
                            get Form Values
                        </button>
                        <div className={showArray ? 'code-blog' : 'code-blog hide'}>
                            {'{'}
                            <br />
                            {!Object.keys(newFormValues).length
                                ? ''
                                : Object.keys(newFormValues).map((el, ind) => {
                                      return (
                                          <div key={`${el}-${ind}`}>
                                              &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                                              {` ${el}: [${newFormValues[el].map(
                                                  (item) => `"${item}" `,
                                              )}],`}
                                          </div>
                                      );
                                  })}
                            <br />
                            {'}'}
                        </div>
                    </div>
                    <div className="code">
                        <br />
                        <button
                            className="waves-effect waves-light btn-large purple"
                            onClick={() => {
                                this.convertArrayToObject(newFormValues);
                                this.setState((state) => ({
                                    ...state,
                                    showObject: !state.showObject,
                                }));
                            }}>
                            convert Array To Object
                        </button>
                        <div className={showObject ? 'code-blog' : 'code-blog hide'}>
                            [<br />
                            <br />
                            {!arrayToObject.length
                                ? ''
                                : arrayToObject.map((el, ind) => {
                                      return (
                                          <div key={`${el}-${ind}`}>
                                              &nbsp;&nbsp;&nbsp;&nbsp;{'{'}
                                              <br />
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type":{' '}
                                              {`'${el.type}'`},<br />
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"value":{' '}
                                              {`'${el.value}'`}
                                              <br />
                                              &nbsp;&nbsp;&nbsp;&nbsp;{'},'}
                                          </div>
                                      );
                                  })}
                            <br />]
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
