
    module.exports = function (app) {
        const modelName = "customer_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerName: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Customer Name, p, false, true, true, true, true, true, true, , , , ," },
contactNumber: { type: Number, comment: "Contact Number, p_number, false, true, true, true, true, true, true, , , , ," },
emailAddress: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Email Address, p, false, true, true, true, true, true, true, , , , ," },

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