const assert = require("assert");
const app = require("../../src/app");

describe("enquiries service", () => {
  let thisService;
  let enquiryCreated;

  beforeEach(async () => {
    thisService = await app.service("enquiries");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (enquiries)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","additionalDetail":"new value","rentOrPurchase":["new value"],"machineQuantity":23,"sellType":["new value"]};

    beforeEach(async () => {
      enquiryCreated = await thisService.create(options);
    });

    it("should create a new enquiry", () => {
      assert.strictEqual(enquiryCreated.customerName, options.customerName);
assert.strictEqual(enquiryCreated.machineAddress, options.machineAddress);
assert.strictEqual(enquiryCreated.additionalDetail, options.additionalDetail);
assert.strictEqual(enquiryCreated.rentOrPurchase, options.rentOrPurchase);
assert.strictEqual(enquiryCreated.machineQuantity, options.machineQuantity);
assert.strictEqual(enquiryCreated.sellType, options.sellType);
    });
  });

  describe("#get", () => {
    it("should retrieve a enquiry by ID", async () => {
      const retrieved = await thisService.get(enquiryCreated._id);
      assert.strictEqual(retrieved._id, enquiryCreated._id);
    });
  });

  describe("#update", () => {
    let enquiryUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","additionalDetail":"updated value","rentOrPurchase":["updated value"],"machineQuantity":100,"sellType":["updated value"]};

    beforeEach(async () => {
      enquiryUpdated = await thisService.update(enquiryCreated._id, options);
    });

    it("should update an existing enquiry ", async () => {
      assert.strictEqual(enquiryUpdated.customerName, options.customerName);
assert.strictEqual(enquiryUpdated.machineAddress, options.machineAddress);
assert.strictEqual(enquiryUpdated.additionalDetail, options.additionalDetail);
assert.strictEqual(enquiryUpdated.rentOrPurchase, options.rentOrPurchase);
assert.strictEqual(enquiryUpdated.machineQuantity, options.machineQuantity);
assert.strictEqual(enquiryUpdated.sellType, options.sellType);
    });
  });

  describe("#delete", () => {
  let enquiryDeleted;
    beforeEach(async () => {
      enquiryDeleted = await thisService.remove(enquiryCreated._id);
    });

    it("should delete a enquiry", async () => {
      assert.strictEqual(enquiryDeleted._id, enquiryCreated._id);
    });
  });
});