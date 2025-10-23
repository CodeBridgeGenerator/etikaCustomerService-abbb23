const assert = require("assert");
const app = require("../../src/app");

describe("relocations service", () => {
  let thisService;
  let relocationCreated;

  beforeEach(async () => {
    thisService = await app.service("relocations");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (relocations)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","relocationReason":"new value","newOutlet":"new value"};

    beforeEach(async () => {
      relocationCreated = await thisService.create(options);
    });

    it("should create a new relocation", () => {
      assert.strictEqual(relocationCreated.customerName, options.customerName);
assert.strictEqual(relocationCreated.machineAddress, options.machineAddress);
assert.strictEqual(relocationCreated.relocationReason, options.relocationReason);
assert.strictEqual(relocationCreated.newOutlet, options.newOutlet);
    });
  });

  describe("#get", () => {
    it("should retrieve a relocation by ID", async () => {
      const retrieved = await thisService.get(relocationCreated._id);
      assert.strictEqual(retrieved._id, relocationCreated._id);
    });
  });

  describe("#update", () => {
    let relocationUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","relocationReason":"updated value","newOutlet":"updated value"};

    beforeEach(async () => {
      relocationUpdated = await thisService.update(relocationCreated._id, options);
    });

    it("should update an existing relocation ", async () => {
      assert.strictEqual(relocationUpdated.customerName, options.customerName);
assert.strictEqual(relocationUpdated.machineAddress, options.machineAddress);
assert.strictEqual(relocationUpdated.relocationReason, options.relocationReason);
assert.strictEqual(relocationUpdated.newOutlet, options.newOutlet);
    });
  });

  describe("#delete", () => {
  let relocationDeleted;
    beforeEach(async () => {
      relocationDeleted = await thisService.remove(relocationCreated._id);
    });

    it("should delete a relocation", async () => {
      assert.strictEqual(relocationDeleted._id, relocationCreated._id);
    });
  });
});