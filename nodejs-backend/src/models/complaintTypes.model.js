
    module.exports = function (app) {
        const modelName = "complaint_types";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            complaintCategory: { type:  String , minLength: 2, index: true, trim: true, default: "", comment: "Complaint Category, p, false, true, true, true, true, true, true, , , , ," },
machineImage: { type: Boolean, required: false, default: , comment: "Machine Image, p_boolean, false, true, true, true, true, true, true, , , , ," },

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