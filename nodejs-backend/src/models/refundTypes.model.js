
    module.exports = function (app) {
        const modelName = "refund_types";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            refundName: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Refund Name, p, false, true, true, true, true, true, true, , , , ," },
productImage: { type:  [Schema.Types.ObjectId], ref: "document_storages" , minLength: 2, index: true, trim: true, default: "", comment: "Product Image, file_upload, false, true, true, true, true, true, true, , , , ," },

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