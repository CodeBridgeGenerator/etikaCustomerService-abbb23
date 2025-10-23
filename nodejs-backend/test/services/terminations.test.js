const assert = require("assert");
const app = require("../../src/app");

describe("terminations service", () => {
  let thisService;
  let terminationCreated;

  beforeEach(async () => {
    thisService = await app.service("terminations");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (terminations)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","additionalDetail":"new value"};

    beforeEach(async () => {
      terminationCreated = await thisService.create(options);
    });

    it("should create a new termination", () => {
      assert.strictEqual(terminationCreated.customerName, options.customerName);
assert.strictEqual(terminationCreated.machineAddress, options.machineAddress);
assert.strictEqual(terminationCreated.additionalDetail, options.additionalDetail);
    });
  });

  describe("#get", () => {
    it("should retrieve a termination by ID", async () => {
      const retrieved = await thisService.get(terminationCreated._id);
      assert.strictEqual(retrieved._id, terminationCreated._id);
    });
  });

  describe("#update", () => {
    let terminationUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","additionalDetail":"updated value"};

    beforeEach(async () => {
      terminationUpdated = await thisService.update(terminationCreated._id, options);
    });

    it("should update an existing termination ", async () => {
      assert.strictEqual(terminationUpdated.customerName, options.customerName);
assert.strictEqual(terminationUpdated.machineAddress, options.machineAddress);
assert.strictEqual(terminationUpdated.additionalDetail, options.additionalDetail);
    });
  });

  describe("#delete", () => {
  let terminationDeleted;
    beforeEach(async () => {
      terminationDeleted = await thisService.remove(terminationCreated._id);
    });

    it("should delete a termination", async () => {
      assert.strictEqual(terminationDeleted._id, terminationCreated._id);
    });
  });
});