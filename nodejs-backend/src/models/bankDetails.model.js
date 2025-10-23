
    module.exports = function (app) {
        const modelName = "bank_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            bankName: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Bank Name, p, false, true, true, true, true, true, true, , , , ," },
accountNumber: { type: Number, comment: "Account Number, p_number, false, true, true, true, true, true, true, , , , ," },
registeredAccountName: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Registered Account Name, p, false, true, true, true, true, true, true, , , , ," },

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