const assert = require("assert");
const app = require("../../src/app");

describe("vmCollections service", () => {
  let thisService;
  let vmCollectionCreated;

  beforeEach(async () => {
    thisService = await app.service("vmCollections");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (vmCollections)");
  });

  describe("#create", () => {
    const options = {"customerName":"aasdfasdfasdfadsfadfa","machineAddress":"new value","collectionReason":"new value"};

    beforeEach(async () => {
      vmCollectionCreated = await thisService.create(options);
    });

    it("should create a new vmCollection", () => {
      assert.strictEqual(vmCollectionCreated.customerName, options.customerName);
assert.strictEqual(vmCollectionCreated.machineAddress, options.machineAddress);
assert.strictEqual(vmCollectionCreated.collectionReason, options.collectionReason);
    });
  });

  describe("#get", () => {
    it("should retrieve a vmCollection by ID", async () => {
      const retrieved = await thisService.get(vmCollectionCreated._id);
      assert.strictEqual(retrieved._id, vmCollectionCreated._id);
    });
  });

  describe("#update", () => {
    let vmCollectionUpdated;
    const options = {"customerName":"345345345345345345345","machineAddress":"updated value","collectionReason":"updated value"};

    beforeEach(async () => {
      vmCollectionUpdated = await thisService.update(vmCollectionCreated._id, options);
    });

    it("should update an existing vmCollection ", async () => {
      assert.strictEqual(vmCollectionUpdated.customerName, options.customerName);
assert.strictEqual(vmCollectionUpdated.machineAddress, options.machineAddress);
assert.strictEqual(vmCollectionUpdated.collectionReason, options.collectionReason);
    });
  });

  describe("#delete", () => {
  let vmCollectionDeleted;
    beforeEach(async () => {
      vmCollectionDeleted = await thisService.remove(vmCollectionCreated._id);
    });

    it("should delete a vmCollection", async () => {
      assert.strictEqual(vmCollectionDeleted._id, vmCollectionCreated._id);
    });
  });
});