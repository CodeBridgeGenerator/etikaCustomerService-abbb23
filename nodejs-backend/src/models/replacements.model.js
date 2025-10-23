
    module.exports = function (app) {
        const modelName = "replacements";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type: Schema.Types.ObjectId, ref: "customer_details", comment: "Customer Name, dropdown, false, true, true, true, true, true, true, customerDetails, customer_details, one-to-one, customerName," },
machineAddress: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Machine Address, p, false, true, true, true, true, true, true, , , , ," },
replacementReason: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Replacement Reason, p, false, true, true, true, true, true, true, , , , ," },

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