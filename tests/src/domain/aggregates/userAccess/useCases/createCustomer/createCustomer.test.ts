import ICustomerRepository from "../../../../../../../src/domain/aggregates/userAccess/core/ports/ICustomerRepository";
import CreateCustomer from "../../../../../../../src/domain/aggregates/userAccess/usecases/createCustomer/CreateCustomer";
import { CreateCustomerInputDTO } from "../../../../../../../src/domain/aggregates/userAccess/usecases/createCustomer/CreateCustomerDTO";

// Create a type for the mocked repository
// type MockedCustomerRepository = {
//   [P in keyof ICustomerRepository]: jest.Mock;
// };

const mockCustomerInput: CreateCustomerInputDTO = {
    cpf: '40129666009',
    name: 'user1',
    email: 'user1@email.com.br',
    isActive: true
  };

const mockCreatedCustomer = [{
    id: 1,
    cpf: '40129666009',
    name: 'user1',
    email: 'user1@email.com.br',
    isActive: true
  }];

const customerRepositoryMock: ICustomerRepository = {
    getCustomers: jest.fn(),
    createCustomer: jest.fn().mockResolvedValue(mockCreatedCustomer),
    getCustomerById: jest.fn(),
    getCustomerByCPF: jest.fn(),
    updateCustomer: jest.fn(),
    deleteCustomer: jest.fn(),
};


describe('NewCustomer Use Case', () => {
it('should add a new customer', async () => {
    const createCustomer = new CreateCustomer(customerRepositoryMock);
    const result = await createCustomer.execute(mockCustomerInput);
    expect(result.hasError).toBe(false);
    // Check if result is as expected
    expect(result.result).toBeDefined();
    // Assuming the use case returns an array with the created customer
    expect(result.result?.length).toBe(1);
    //expect(result.result?.[0]).toMatchObject(mockCreatedCustomer);
});

// it('should return a specific customer by ID', async () => {
//   const mockCustomer = mockCustomers[0];
//   const customerRepositoryOneMock: ICustomerRepository = {
//     ...customerRepositoryMock,
//     getCustomerById: jest.fn().mockResolvedValue([mockCustomer]),
//   };
    
//   //customerRepositoryMock.getCustomerById.mockResolvedValue([{}]);
//   const listCustomer = new ListCustomer(customerRepositoryOneMock);
//   const result = await listCustomer.execute({ params: { id: 1 } });
    
//   expect(result.result?.length).toBe(1);
//   expect(result.hasError).toBe(false);
// });

});