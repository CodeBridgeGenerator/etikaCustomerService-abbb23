
import { faker } from "@faker-js/faker";
export default (user,count,customerNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerName: customerNameIds[i % customerNameIds.length],
machineAddress: faker.datatype.number(""),
additionalDetail: faker.datatype.number(""),
rentOrPurchase: faker.datatype.number(""),
machineQuantity: faker.datatype.number(""),
sellType: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
