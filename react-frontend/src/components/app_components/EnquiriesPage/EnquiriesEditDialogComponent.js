/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
const rentOrPurchaseArray = ["Rent","Purchase"];
const rentOrPurchaseOptions = rentOrPurchaseArray.map((x) => ({ name: x, value: x }));
const sellTypeArray = ["Own Products","Engage Atlas Services"];
const sellTypeOptions = sellTypeArray.map((x) => ({ name: x, value: x }));

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const EnquiriesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerName, setCustomerName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount customerDetails
                    client
                        .service("customerDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCustomerDetailsId } })
                        .then((res) => {
                            setCustomerName(res.data.map((e) => { return { name: e['customerName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "CustomerDetails", type: "error", message: error.message || "Failed get customerDetails" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            customerName: _entity?.customerName?._id,
machineAddress: _entity?.machineAddress,
additionalDetail: _entity?.additionalDetail,
rentOrPurchase: _entity?.rentOrPurchase,
machineQuantity: _entity?.machineQuantity,
sellType: _entity?.sellType,
        };

        setLoading(true);
        try {
            
        await client.service("enquiries").patch(_entity._id, _data);
        const eagerResult = await client
            .service("enquiries")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "customerName",
                    service : "customerDetails",
                    select:["customerName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info enquiries updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const customerNameOptions = customerName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Enquiries" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="enquiries-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="customerName">Customer Name:</label>
                <Dropdown id="customerName" value={_entity?.customerName?._id} optionLabel="name" optionValue="value" options={customerNameOptions} onChange={(e) => setValByKey("customerName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerName"]) && (
              <p className="m-0" key="error-customerName">
                {error["customerName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineAddress">Machine Address:</label>
                <InputText id="machineAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.machineAddress} onChange={(e) => setValByKey("machineAddress", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineAddress"]) && (
              <p className="m-0" key="error-machineAddress">
                {error["machineAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="additionalDetail">Additional Detail:</label>
                <InputText id="additionalDetail" className="w-full mb-3 p-inputtext-sm" value={_entity?.additionalDetail} onChange={(e) => setValByKey("additionalDetail", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["additionalDetail"]) && (
              <p className="m-0" key="error-additionalDetail">
                {error["additionalDetail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="rentOrPurchase">Rent Or Purchase:</label>
                <Dropdown id="rentOrPurchase" value={_entity?.rentOrPurchase} options={rentOrPurchaseOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("rentOrPurchase", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["rentOrPurchase"]) && (
              <p className="m-0" key="error-rentOrPurchase">
                {error["rentOrPurchase"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="machineQuantity">Machine Quantity:</label>
                <InputNumber id="machineQuantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.machineQuantity} onChange={(e) => setValByKey("machineQuantity", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["machineQuantity"]) && (
              <p className="m-0" key="error-machineQuantity">
                {error["machineQuantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sellType">Sell Type:</label>
                <Dropdown id="sellType" value={_entity?.sellType} options={sellTypeOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("sellType", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sellType"]) && (
              <p className="m-0" key="error-sellType">
                {error["sellType"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(EnquiriesEditDialogComponent);
