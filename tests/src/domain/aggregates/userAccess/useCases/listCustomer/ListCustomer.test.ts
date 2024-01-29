import ICustomerRepository from "../../../../../../../src/domain/aggregates/userAccess/core/ports/ICustomerRepository";
import ListCustomer from "../../../../../../../src/domain/aggregates/userAccess/usecases/listCustomer/ListCustomer";

// Create a type for the mocked repository
// type MockedCustomerRepository = {
//   [P in keyof ICustomerRepository]: jest.Mock;
// };

const mockCustomers = [
    {
      id: 1,
      cpf: '11144400097',
      name: 'user1',
      email: 'user1@email.com.br',
      isActive: true
    },
    {
      id: 2,
      cpf: '33311100097',
      name: 'user2',
      email: 'user2@email.com.br',
      isActive: true
    },
    {
      id: 3,
      cpf: '22233355597',
      name: 'user3',
      email: 'user3@email.com.br',
      isActive: true
    }];

  const customerRepositoryMock: ICustomerRepository = {
    getCustomers: jest.fn().mockResolvedValue(mockCustomers),
    createCustomer: jest.fn(),
    getCustomerById: jest.fn(),
    getCustomerByCPF: jest.fn(),
    updateCustomer: jest.fn(),
    deleteCustomer: jest.fn(),
  };


  describe('ListCustomer Use Case', () => {
    it('should return a list of all customers', async () => {
      const listCustomer = new ListCustomer(customerRepositoryMock);
      const result = await listCustomer.execute({ params: {} });
  
      expect(result.result?.length).toBe(mockCustomers.length);
      expect(result.hasError).toBe(false);
    });
  
    it('should return a specific customer by ID', async () => {
      const mockCustomer = mockCustomers[0];
      const customerRepositoryOneMock: ICustomerRepository = {
        ...customerRepositoryMock,
        getCustomerById: jest.fn().mockResolvedValue([mockCustomer]),
      };
      
      //customerRepositoryMock.getCustomerById.mockResolvedValue([{}]);
      const listCustomer = new ListCustomer(customerRepositoryOneMock);
      const result = await listCustomer.execute({ params: { id: 1 } });
      
      expect(result.result?.length).toBe(1);
      expect(result.hasError).toBe(false);
    });
  
    // Add more test scenarios as needed
  });