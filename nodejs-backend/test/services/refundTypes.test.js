const assert = require("assert");
const app = require("../../src/app");

describe("refundTypes service", () => {
  let thisService;
  let refundTypeCreated;

  beforeEach(async () => {
    thisService = await app.service("refundTypes");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (refundTypes)");
  });

  describe("#create", () => {
    const options = {"refundName":"new value","productImage":"new value"};

    beforeEach(async () => {
      refundTypeCreated = await thisService.create(options);
    });

    it("should create a new refundType", () => {
      assert.strictEqual(refundTypeCreated.refundName, options.refundName);
assert.strictEqual(refundTypeCreated.productImage, options.productImage);
    });
  });

  describe("#get", () => {
    it("should retrieve a refundType by ID", async () => {
      const retrieved = await thisService.get(refundTypeCreated._id);
      assert.strictEqual(retrieved._id, refundTypeCreated._id);
    });
  });

  describe("#update", () => {
    let refundTypeUpdated;
    const options = {"refundName":"updated value","productImage":"updated value"};

    beforeEach(async () => {
      refundTypeUpdated = await thisService.update(refundTypeCreated._id, options);
    });

    it("should update an existing refundType ", async () => {
      assert.strictEqual(refundTypeUpdated.refundName, options.refundName);
assert.strictEqual(refundTypeUpdated.productImage, options.productImage);
    });
  });

  describe("#delete", () => {
  let refundTypeDeleted;
    beforeEach(async () => {
      refundTypeDeleted = await thisService.remove(refundTypeCreated._id);
    });

    it("should delete a refundType", async () => {
      assert.strictEqual(refundTypeDeleted._id, refundTypeCreated._id);
    });
  });
});