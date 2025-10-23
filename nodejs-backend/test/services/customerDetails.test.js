const assert = require("assert");
const app = require("../../src/app");

describe("customerDetails service", () => {
  let thisService;
  let customerDetailCreated;

  beforeEach(async () => {
    thisService = await app.service("customerDetails");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (customerDetails)");
  });

  describe("#create", () => {
    const options = {"customerName":"new value","contactNumber":23,"emailAddress":"new value"};

    beforeEach(async () => {
      customerDetailCreated = await thisService.create(options);
    });

    it("should create a new customerDetail", () => {
      assert.strictEqual(customerDetailCreated.customerName, options.customerName);
assert.strictEqual(customerDetailCreated.contactNumber, options.contactNumber);
assert.strictEqual(customerDetailCreated.emailAddress, options.emailAddress);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerDetail by ID", async () => {
      const retrieved = await thisService.get(customerDetailCreated._id);
      assert.strictEqual(retrieved._id, customerDetailCreated._id);
    });
  });

  describe("#update", () => {
    let customerDetailUpdated;
    const options = {"customerName":"updated value","contactNumber":100,"emailAddress":"updated value"};

    beforeEach(async () => {
      customerDetailUpdated = await thisService.update(customerDetailCreated._id, options);
    });

    it("should update an existing customerDetail ", async () => {
      assert.strictEqual(customerDetailUpdated.customerName, options.customerName);
assert.strictEqual(customerDetailUpdated.contactNumber, options.contactNumber);
assert.strictEqual(customerDetailUpdated.emailAddress, options.emailAddress);
    });
  });

  describe("#delete", () => {
  let customerDetailDeleted;
    beforeEach(async () => {
      customerDetailDeleted = await thisService.remove(customerDetailCreated._id);
    });

    it("should delete a customerDetail", async () => {
      assert.strictEqual(customerDetailDeleted._id, customerDetailCreated._id);
    });
  });
});