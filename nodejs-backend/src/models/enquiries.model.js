
    module.exports = function (app) {
        const modelName = "enquiries";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type: Schema.Types.ObjectId, ref: "customer_details", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customerDetails, customer_details, one-to-one, customerName," },
machineAddress: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Machine Address, p, false, true, true, true, true, true, true, , , , ," },
additionalDetail: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Additional Detail, p, false, true, true, true, true, true, true, , , , ," },
rentOrPurchase: { type: String , enum: ["Rent","Purchase"], comment: "Rent Or Purchase, dropdownArray, false, true, true, true, true, true, true, , , , ," },
machineQuantity: { type: Number, comment: "Machine Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
sellType: { type: String , enum: ["Own Products","Engage Atlas Services"], comment: "Sell Type, dropdownArray, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };