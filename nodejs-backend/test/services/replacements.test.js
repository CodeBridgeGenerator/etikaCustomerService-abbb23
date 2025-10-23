const assert = require("assert");
const app = require("../../src/app");

describe("replacements service", () => {
  let thisService;
  let replacementCreated;

  beforeEach(async () => {
    thisService = await app.service("replacements");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (replacements)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","replacementReason":"new value"};

    beforeEach(async () => {
      replacementCreated = await thisService.create(options);
    });

    it("should create a new replacement", () => {
      assert.strictEqual(replacementCreated.customerName, options.customerName);
assert.strictEqual(replacementCreated.machineAddress, options.machineAddress);
assert.strictEqual(replacementCreated.replacementReason, options.replacementReason);
    });
  });

  describe("#get", () => {
    it("should retrieve a replacement by ID", async () => {
      const retrieved = await thisService.get(replacementCreated._id);
      assert.strictEqual(retrieved._id, replacementCreated._id);
    });
  });

  describe("#update", () => {
    let replacementUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","replacementReason":"updated value"};

    beforeEach(async () => {
      replacementUpdated = await thisService.update(replacementCreated._id, options);
    });

    it("should update an existing replacement ", async () => {
      assert.strictEqual(replacementUpdated.customerName, options.customerName);
assert.strictEqual(replacementUpdated.machineAddress, options.machineAddress);
assert.strictEqual(replacementUpdated.replacementReason, options.replacementReason);
    });
  });

  describe("#delete", () => {
  let replacementDeleted;
    beforeEach(async () => {
      replacementDeleted = await thisService.remove(replacementCreated._id);
    });

    it("should delete a replacement", async () => {
      assert.strictEqual(replacementDeleted._id, replacementCreated._id);
    });
  });
});